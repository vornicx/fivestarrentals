import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "../../_components/icons";
import BrandLogo from "../../_components/brand-logo";
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
    .filter((item) => item.category === vehicle.category && item.slug !== vehicle.slug)
    .slice(0, 3);
  const message = encodeURIComponent(
    `Hello Five Star Rentals, I am interested in renting the ${vehicle.brand} ${vehicle.model}. Could you confirm availability?`,
  );

  return (
    <main className="vehicle-page">
      <header className="vehicle-header">
        <Link className="fs-brand" href="/" aria-label="Five Star Rentals home">
          <BrandLogo priority />
        </Link>
        <Link className="vehicle-back" href="/#fleet">Back to fleet<ArrowRight /></Link>
      </header>

      <section className="vehicle-hero">
        <div className="vehicle-hero-image">
          <Image src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} fill priority sizes="(max-width: 900px) 100vw, 58vw" />
          <div className="vehicle-image-overlay" />
          <span>{vehicle.category}</span>
        </div>
        <div className="vehicle-hero-copy">
          <p className="micro-label dark"><span />{vehicle.brand} · {vehicle.year}</p>
          <h1>{vehicle.model}</h1>
          <p className="vehicle-statement">{vehicle.statement}</p>
          <p className="vehicle-description">{vehicle.description}</p>
          <div className="vehicle-primary-specs">
            <div><b>{vehicle.hp}</b><span>Horsepower</span></div>
            <div><b>{vehicle.acceleration}</b><span>0–100 km/h</span></div>
            <div><b>{vehicle.seats}</b><span>Seats</span></div>
          </div>
          <div className="vehicle-price-row">
            <p><span>From</span><b>{formatEuro(vehicle.price)}</b><small>per day</small></p>
            <a className="solid-button dark" href={`https://wa.me/34622897184?text=${message}`} target="_blank" rel="noreferrer">Request this car<ArrowRight /></a>
          </div>
        </div>
      </section>

      <section className="vehicle-details">
        <div>
          <p className="micro-label dark"><span />The details</p>
          <h2>Performance,<br /><em>considered.</em></h2>
        </div>
        <dl>
          <div><dt>Engine output</dt><dd>{vehicle.hp} HP</dd></div>
          <div><dt>Acceleration</dt><dd>{vehicle.acceleration}</dd></div>
          <div><dt>Top speed</dt><dd>{vehicle.topSpeed} km/h</dd></div>
          <div><dt>Transmission</dt><dd>{vehicle.transmission}</dd></div>
          <div><dt>Drivetrain</dt><dd>{vehicle.drivetrain}</dd></div>
          <div><dt>Fuel</dt><dd>{vehicle.fuel}</dd></div>
          <div><dt>Seats</dt><dd>{vehicle.seats}</dd></div>
          <div><dt>Model year</dt><dd>{vehicle.year}</dd></div>
        </dl>
      </section>

      <section className="vehicle-rates">
        <p className="micro-label"><span />Flexible rental</p>
        <h2>Stay for the drive.<br /><em>Not the paperwork.</em></h2>
        <div className="rate-grid">
          <article><small>Daily</small><b>{formatEuro(vehicle.price)}</b><span>Personal delivery included in Marbella</span></article>
          <article><small>Weekly</small><b>{formatEuro(vehicle.weekPrice)}</b><span>Better value for longer stays</span></article>
          <article><small>Monthly</small><b>{formatEuro(vehicle.monthPrice)}</b><span>Tailored terms with dedicated concierge</span></article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-fleet">
          <div><p className="micro-label dark"><span />You may also like</p><h2>Continue exploring.</h2></div>
          <div className="related-grid">
            {related.map((item) => (
              <Link href={`/fleet/${item.slug}`} key={item.slug}>
                <div><Image src={item.image} alt={`${item.brand} ${item.model}`} fill sizes="(max-width: 700px) 100vw, 33vw" /></div>
                <p>{item.brand} · From {formatEuro(item.price)}/day</p>
                <h3>{item.shortModel}</h3>
                <ArrowUpRight />
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="vehicle-footer">
        <p>Five Star Rentals · Marbella & Puerto Banús</p>
        <a href={`https://wa.me/34622897184?text=${message}`} target="_blank" rel="noreferrer">Book {vehicle.shortModel}<ArrowRight /></a>
      </footer>
    </main>
  );
}
