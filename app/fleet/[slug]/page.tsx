import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, WhatsApp } from "../../_components/icons";
import BrandLogo from "../../_components/brand-logo";
import VehicleGallery from "../../_components/vehicle-gallery";
import { fleet, formatEuro, getVehicle } from "../../_data/fleet";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return fleet.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return {};
  return {
    title: `${vehicle.brand} ${vehicle.model} — Luxury car rental Marbella`,
    description: `Rent the ${vehicle.brand} ${vehicle.model} in Marbella and Puerto Banús from ${formatEuro(vehicle.price)} per day, with 24/7 concierge and personal delivery.`,
    alternates: { canonical: `/fleet/${vehicle.slug}` },
    openGraph: {
      title: `${vehicle.brand} ${vehicle.model} | Five Star Rentals`,
      description: vehicle.description,
      images: [{ url: vehicle.image, width: 1200, height: 1600, alt: `${vehicle.brand} ${vehicle.model}` }],
    },
  };
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const related = fleet
    .filter((item) => item.slug !== vehicle.slug)
    .sort((a, b) => {
      const aMatch = a.category === vehicle.category ? 0 : 1;
      const bMatch = b.category === vehicle.category ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, 3);

  const message = encodeURIComponent(
    `Hello Five Star Rentals, I am interested in renting the ${vehicle.brand} ${vehicle.model}. Could you confirm availability and terms?`,
  );
  const whatsapp = `https://wa.me/34622897184?text=${message}`;
  const vehicleName = `${vehicle.brand} ${vehicle.shortModel}`;

  return (
    <main className="signature-vehicle-page archic-vehicle-2026">
      <header className="signature-vehicle-header">
        <Link className="fs-brand" href="/" aria-label="Five Star Rentals home">
          <BrandLogo priority />
        </Link>
        <div>
          <Link className="signature-vehicle-back" href="/#fleet">Fleet</Link>
          <a className="signature-vehicle-request" href={whatsapp} target="_blank" rel="noreferrer">Request this car<ArrowRight /></a>
        </div>
      </header>

      <section className="signature-vehicle-hero">
        <Image src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} fill priority sizes="100vw" />
        <div className="signature-vehicle-hero-shade" />
        <div className="signature-vehicle-hero-copy">
          <p>{vehicle.brand} · {vehicle.year} · {vehicle.category}</p>
          <h1>{vehicle.model}</h1>
          <span>{vehicle.statement}</span>
        </div>
        <div className="signature-vehicle-hero-rate">
          <span>From</span>
          <b>{formatEuro(vehicle.price)}</b>
          <small>per day</small>
          <a href={whatsapp} target="_blank" rel="noreferrer"><WhatsApp />Check availability<ArrowRight /></a>
        </div>
      </section>

      <VehicleGallery primaryImage={vehicle.image} vehicleName={vehicleName} />

      <section className="signature-vehicle-specs" aria-label={`${vehicle.model} specifications`}>
        <div><b>{vehicle.hp}</b><span>HP</span><small>Engine output</small></div>
        <div><b>{vehicle.acceleration}</b><span>0–100</span><small>Acceleration</small></div>
        <div><b>{vehicle.topSpeed}</b><span>km/h</span><small>Top speed</small></div>
        <div><b>{vehicle.seats}</b><span>seats</span><small>Capacity</small></div>
      </section>

      <section className="signature-vehicle-overview">
        <div className="signature-vehicle-story">
          <p>Five Star Rentals · Marbella</p>
          <h2>{vehicle.shortModel}, without the rental-desk experience.</h2>
          <p className="signature-vehicle-description">{vehicle.description}</p>
          <p className="signature-vehicle-delivery-copy">Tell Five Star which car you want, your delivery point and your dates, then continue with one concierge. Delivery is available to hotels, villas, yachts, Málaga Airport and private aviation arrivals.</p>
          <a href={whatsapp} target="_blank" rel="noreferrer">Ask about this {vehicle.shortModel}<ArrowRight /></a>
        </div>

        <div className="signature-vehicle-data">
          <div className="signature-data-heading"><h3>Vehicle specification</h3><span>{vehicle.year} model</span></div>
          <dl>
            <div><dt>Power</dt><dd>{vehicle.hp} HP</dd></div>
            <div><dt>0–100 km/h</dt><dd>{vehicle.acceleration}</dd></div>
            <div><dt>Top speed</dt><dd>{vehicle.topSpeed} km/h</dd></div>
            <div><dt>Transmission</dt><dd>{vehicle.transmission}</dd></div>
            <div><dt>Drivetrain</dt><dd>{vehicle.drivetrain}</dd></div>
            <div><dt>Fuel</dt><dd>{vehicle.fuel}</dd></div>
            <div><dt>Seats</dt><dd>{vehicle.seats}</dd></div>
            <div><dt>Category</dt><dd>{vehicle.category}</dd></div>
          </dl>
        </div>
      </section>

      <section className="signature-rates">
        <div className="signature-rates-heading">
          <h2>Rental rates</h2>
          <p>Three clear starting points. Final availability, deposit, mileage and rental terms are confirmed directly by the Five Star concierge.</p>
        </div>
        <div className="signature-rate-grid">
          <article><span>Daily</span><b>{formatEuro(vehicle.price)}</b><p>Per day · free personal delivery in Marbella and Puerto Banús.</p></article>
          <article><span>Weekly</span><b>{formatEuro(vehicle.weekPrice)}</b><p>Seven-day starting rate for longer stays on the Costa del Sol.</p></article>
          <article><span>Monthly</span><b>{formatEuro(vehicle.monthPrice)}</b><p>Long-stay starting rate with dedicated concierge support.</p></article>
        </div>
        <a className="signature-rate-cta" href={whatsapp} target="_blank" rel="noreferrer"><WhatsApp />Confirm dates and availability<ArrowRight /></a>
      </section>

      {related.length > 0 && (
        <section className="signature-related">
          <div className="signature-related-heading"><h2>Also in the fleet</h2><Link href="/#fleet">View all 21 cars<ArrowRight /></Link></div>
          <div className="signature-related-grid">
            {related.map((item) => (
              <Link href={`/fleet/${item.slug}`} key={item.slug}>
                <div className="signature-related-image"><Image src={item.image} alt={`${item.brand} ${item.model}`} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <div className="signature-related-copy"><span>{item.brand} · {item.year}</span><h3>{item.shortModel}</h3><p>From {formatEuro(item.price)}/day</p><ArrowUpRight /></div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="signature-vehicle-footer">
        <BrandLogo />
        <p>Five Star Rentals · Marbella & Puerto Banús · 24/7 concierge</p>
        <a href={whatsapp} target="_blank" rel="noreferrer">Request {vehicle.shortModel}<ArrowRight /></a>
      </footer>
    </main>
  );
}
