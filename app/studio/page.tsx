import type { Metadata } from "next";
import StudioClient from "./studio-client";

export const metadata: Metadata = {
  title: "Owner Control",
  description: "Five Star Rentals fleet, enquiry and client management workspace.",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <StudioClient />;
}
