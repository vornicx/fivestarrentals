import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./public.css";
import "./luxury.css";
import "./refinement.css";
import "./studio/studio.css";
import "./readability.css";
import "./signature.css";
import "./signature-detail.css";
import "./archic-2026.css";
import "./vehicle-gallery.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const editorial = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fivestarrentals.vercel.app"),
  applicationName: "Five Star Rentals",
  title: {
    default: "Five Star Rentals — Luxury & Sports Car Hire Marbella",
    template: "%s | Five Star Rentals",
  },
  description:
    "Luxury and sports car rental in Marbella and Puerto Banús. 21 premium vehicles, free Marbella delivery and 24/7 multilingual concierge.",
  keywords: [
    "luxury car rental Marbella",
    "sports car hire Puerto Banús",
    "supercar rental Costa del Sol",
    "luxury car Málaga Airport",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Five Star Rentals",
    title: "Five Star Rentals — Luxury car rental in Marbella",
    description:
      "21 premium cars, free delivery in Marbella and Puerto Banús, and a multilingual concierge available 24/7.",
    images: [
      {
        url: "https://fivestars-rental.com/assets/images/hero-bg.jpg",
        width: 1200,
        height: 1200,
        alt: "Lamborghini Urus by Five Star Rentals in Marbella",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Five Star Rentals — Marbella",
    description: "21 premium cars. Marbella delivery. 24/7 concierge.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${editorial.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
