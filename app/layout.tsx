import type { Metadata, Viewport } from "next";
import "./globals.css";

// Live domain — served from Vercel, DNS at GoDaddy.
const SITE_URL = "https://citycommercefinance.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "City Commerce Finance | Trade & Shariah-Compliant Finance, Dubai",
    template: "%s | City Commerce Finance",
  },
  description:
    "City Commerce Finance LLC structures trade facilities (LC, SBLC, bank guarantees), Sukuk and verified Shariah-compliant funding, and financial instrument monetization — backed by a global banking network in Dubai, UAE.",
  keywords: [
    "trade finance Dubai",
    "Shariah-compliant finance",
    "Sukuk advisory",
    "Letters of Credit",
    "SBLC",
    "bank guarantees",
    "instrument monetization",
    "Islamic finance UAE",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE_URL,
    siteName: "City Commerce Finance",
    title: "City Commerce Finance | Trade & Shariah-Compliant Finance, Dubai",
    description:
      "Trade facilities, Sukuk & verified Shariah-compliant funding, and instrument monetization — backed by a global banking network in Dubai.",
  },
  twitter: {
    card: "summary_large_image",
    title: "City Commerce Finance",
    description:
      "Trade facilities, Sukuk & Shariah-compliant funding, and instrument monetization in Dubai.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16294F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Always open at the top of the hero on load/reload — disable the browser
            restoring a previous (deep) scroll position on this tall scroll-driven page.
            Runs before paint so there's no jump; does not affect #fragment links. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('scrollRestoration' in history){history.scrollRestoration='manual';}if(!location.hash){window.scrollTo(0,0);}",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
