import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure" | "p" | "span";
  /** Distance to rise, in px. Media can travel further than text. */
  y?: number;
};

/**
 * A heavy fade-and-rise as content scrolls into view, once. It sequences
 * content as it arrives, which is the only job it has.
 *
 * A server component: it only marks the element. RevealObserver (one small
 * client script for the whole site) does the watching, and CSS does the
 * motion. Content that is already on screen when the page loads is never
 * hidden, so nothing above the fold waits on JavaScript, and the page reads
 * normally with scripts off or under reduced motion.
 */
export default function Reveal({ children, delay = 0, className, as = "div", y = 28 }: Props) {
  const Tag = as as ElementType;
  const style = { "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as CSSProperties;

  return (
    <Tag data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
