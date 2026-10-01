"""
Cuts the self-hosted Newsreader files down to what the site actually uses.

    python scripts/subset-fonts.py <Newsreader-roman.woff2|ttf> <Newsreader-italic.woff2|ttf>

Sources are the Newsreader variable fonts (SIL Open Font License 1.1) from
Google Fonts. The Google "latin" subsets carry the full weight (200-800) and
optical size (6-72) ranges, about 280KB for the pair. The site only sets
Newsreader between weights 300 and 400 and at 24px and above, so both axes are
narrowed to that range and the glyph set is trimmed:

    roman   Basic Latin, Latin-1 and typographic punctuation    ~62KB
    italic  Basic Latin and curly quotes (emphasis words only)  ~42KB

Weights and optical sizes inside those ranges render exactly as before.
Requires fontTools. WOFF2 needs brotli; if the Python package is missing, Node's
built-in zlib brotli is used instead.
"""

import io
import subprocess
import sys
import types
from pathlib import Path

try:
    import brotli  # noqa: F401
except ImportError:
    js = (
        "const z=require('zlib');const c=[];process.stdin.on('data',d=>c.push(d));"
        "process.stdin.on('end',()=>{const b=Buffer.concat(c);const[op,m,q]=process.argv.slice(1);"
        "const o=op==='c'?z.brotliCompressSync(b,{params:{[z.constants.BROTLI_PARAM_MODE]:+m,"
        "[z.constants.BROTLI_PARAM_QUALITY]:+q,[z.constants.BROTLI_PARAM_SIZE_HINT]:b.length}}):"
        "z.brotliDecompressSync(b);process.stdout.write(o)})"
    )

    def _run(op, data, mode=0, quality=11):
        cmd = ["node", "-e", js, op, str(mode), str(quality)]
        return subprocess.run(cmd, input=bytes(data), capture_output=True, check=True).stdout

    shim = types.ModuleType("brotli")
    shim.MODE_GENERIC, shim.MODE_TEXT, shim.MODE_FONT = 0, 1, 2
    shim.error = Exception
    shim.compress = lambda data, mode=0, quality=11, lgwin=22, lgblock=0: _run("c", data, mode, quality)
    shim.decompress = lambda data: _run("d", data)
    sys.modules["brotli"] = shim

from fontTools import subset  # noqa: E402
from fontTools.ttLib import TTFont  # noqa: E402
from fontTools.varLib.instancer import instantiateVariableFont  # noqa: E402

OUT = Path(__file__).resolve().parent.parent / "src" / "fonts"
AXES = {"wght": (300, 400), "opsz": (24, 72)}
PUNCT = [0x2010, 0x2011, 0x2012, 0x2013, 0x2014, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D,
         0x201E, 0x2022, 0x2026, 0x2032, 0x2033, 0x2039, 0x203A, 0x2122, 0x2212]
ROMAN = list(range(0x20, 0x7F)) + list(range(0xA0, 0x100)) + PUNCT
ITALIC = list(range(0x20, 0x7F)) + [0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2026]
FEATURES = ["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk", "onum", "lnum", "pnum", "tnum", "case"]


def cut(src: str, unicodes: list[int], out: str) -> None:
    font = TTFont(src, lazy=False)
    opts = subset.Options()
    opts.layout_features = FEATURES
    opts.name_IDs = ["*"]  # keep copyright and licence records
    opts.notdef_outline = True
    opts.hinting = False
    opts.desubroutinize = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    font = instantiateVariableFont(font, AXES, updateFontNames=False)
    font.flavor = "woff2"
    buf = io.BytesIO()
    font.save(buf)
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / out).write_bytes(buf.getvalue())
    print(f"  {out}  {len(buf.getvalue()) / 1024:.1f}KB")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    cut(sys.argv[1], ROMAN, "newsreader-roman.woff2")
    cut(sys.argv[2], ITALIC, "newsreader-italic.woff2")
