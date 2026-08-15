import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import "./public.css";
import "./studio/studio.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
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
  title: {
    default: "Five Star Rentals — Luxury & Sports Car Hire Marbella",
    template: "%s | Five Star Rentals",
  },
  description:
    "Luxury and sports car rental in Marbella and Puerto Banús. 21 exceptional vehicles, personal delivery and 24/7 multilingual concierge.",
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
    title: "Five Star Rentals — Drive beyond expectation",
    description:
      "Twenty-one exceptional vehicles, personal delivery and a 24/7 concierge in Marbella and Puerto Banús.",
    images: [
      {
        url: "https://fivestars-rental.com/assets/images/fleet/lamborghini-urus-s/main.webp",
        width: 1200,
        height: 1600,
        alt: "Lamborghini Urus S by Five Star Rentals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Five Star Rentals — Marbella",
    description: "Exceptional vehicles. Personal delivery. 24/7 concierge.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11110f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
