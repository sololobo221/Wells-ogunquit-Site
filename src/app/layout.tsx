import type { Metadata } from "next";
import { Young_Serif, Geist } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBookBar from "@/components/MobileBookBar";

// Display face. One weight by design, so hierarchy comes from size.
// adjustFontFallback matches the fallback metrics so the swap does not reflow.
const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: true,
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

const geist = Geist({
  variable: "--font-geist",
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
    <html lang="en" className={`${youngSerif.variable} ${geist.variable} h-full antialiased`}>
      <body className="grain flex min-h-full flex-col bg-canvas text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[var(--radius-control)] focus:bg-accent focus:px-6 focus:py-3 focus:text-small focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileBookBar />
      </body>
    </html>
  );
}
