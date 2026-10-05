import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBookBar from "@/components/MobileBookBar";
import RevealObserver from "@/components/RevealObserver";

// Display face. Newsreader, self-hosted and cut down by scripts/subset-fonts.py
// to the weights (300-400) and optical sizes (24-72) the site actually sets:
// a fraction of the Google subsets, with identical rendering. Headings are set
// upright, so only the roman ships. The optical size axis lets the same family
// draw fine letters at hero sizes and sturdier ones at card-title sizes.
// adjustFontFallback matches the fallback metrics so the swap does not reflow.
const newsreader = localFont({
  variable: "--font-newsreader",
  src: [{ path: "../fonts/newsreader-roman.woff2", style: "normal", weight: "300 400" }],
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

// Text face. A Futura revival: geometric capitals for the nav, labels and
// buttons, and an easy read at body sizes.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wells-ogunquit.com"),
  title: {
    default: `${site.name}, Wells and Ogunquit, Maine`,
    template: `%s, ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name}, Wells and Ogunquit, Maine`,
    description: site.description,
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/og.png", width: 1200, height: 630 }],
  },
};

// viewport-fit=cover lets the fixed bars read env(safe-area-inset-*) so they
// clear the iPhone home indicator. themeColor tints the mobile browser chrome
// to match the canvas.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f4ee",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Motel",
  name: site.name,
  description: site.description,
  url: "https://www.wells-ogunquit.com",
  telephone: site.phones.tollFree,
  email: site.email,
  logo: "https://www.wells-ogunquit.com/images/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  image: ["/images/hero-pool-umbrella.jpg", "/images/band-sign-front.jpg"],
  amenityFeature: [
    "Heated saltwater pool",
    "Free breakfast",
    "Free Wi-Fi",
    "Barbecue and picnic area",
    "Children's play area",
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${jost.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-accent focus:px-6 focus:py-3 focus:text-small focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileBookBar />
        <RevealObserver />
      </body>
    </html>
  );
}
