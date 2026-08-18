import type { Metadata } from "next";
import Link from "next/link";
import BrandLogo from "../_components/brand-logo";

export const metadata: Metadata = {
  title: "Owner Access",
  description: "Private management area for Five Star Rentals.",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px 20px",
        background: "#f4f3ef",
        color: "#171815",
        fontFamily: "var(--font-sans), Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "min(100%, 560px)",
          overflow: "hidden",
          border: "1px solid #dedbd2",
          borderRadius: 8,
          background: "#fff",
          boxShadow: "0 28px 70px rgba(20, 21, 18, 0.08)",
        }}
      >
        <div
          style={{
            padding: "30px 34px 26px",
            borderBottom: "1px solid #ece9e1",
            background: "#151714",
            color: "#f5f2e9",
          }}
        >
          <div style={{ width: 178, marginBottom: 22 }}>
            <BrandLogo priority />
          </div>
          <p
            style={{
              margin: 0,
              color: "#b99957",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".18em",
              textTransform: "uppercase",
            }}
          >
            Owner Control
          </p>
        </div>

        <div style={{ padding: "38px 34px 34px" }}>
          <p
            style={{
              margin: "0 0 10px",
              color: "#9a7c45",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".16em",
              textTransform: "uppercase",
            }}
          >
            Private management area
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-editorial), Georgia, serif",
              fontSize: "clamp(38px, 8vw, 54px)",
              fontWeight: 500,
              lineHeight: .95,
            }}
          >
            Access restricted.
          </h1>
          <p
            style={{
              maxWidth: 440,
              margin: "20px 0 0",
              color: "#74766f",
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            This workspace contains operational tools for fleet, enquiries, bookings and client management. Public access is disabled.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginTop: 24,
              padding: "13px 14px",
              border: "1px solid #e8e4d9",
              borderRadius: 5,
              background: "#faf8f2",
              color: "#62645e",
              fontSize: 11,
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: 7, height: 7, borderRadius: "50%", background: "#6f9866" }}
            />
            Management environment protected
          </div>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              minHeight: 44,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 28,
              padding: "0 18px",
              borderRadius: 4,
              background: "#20231e",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Return to Five Star Rentals
          </Link>
        </div>
      </section>
    </main>
  );
}
