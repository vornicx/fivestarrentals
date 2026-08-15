"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fleet, fleetCategories, formatEuro } from "../_data/fleet";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Close,
  Menu,
  WhatsApp,
} from "./icons";

type Language = "EN" | "ES";

const copy = {
  EN: {
    nav: ["Fleet", "Experience", "Delivery", "About"],
    reserve: "Request a car",
    owner: "Owner Control",
    heroEyebrow: "Marbella · Puerto Banús · Costa del Sol",
    heroTitle: <>Drive beyond<br /><em>expectation.</em></>,
    heroCopy: "Exceptional cars. Personal delivery. A concierge who answers before you need to ask.",
    explore: "Explore the fleet",
    story: "Discover the experience",
    collection: "The collection",
    collectionTitle: <>Choose the car.<br /><em>We handle the rest.</em></>,
    collectionCopy: "Twenty-one hand-picked cars, prepared in Marbella and delivered wherever your plans begin.",
    all: "View the complete fleet",
    experience: "The Five Star experience",
    experienceTitle: <>Luxury is when<br /><em>nothing feels difficult.</em></>,
    experienceCopy: "No queues. No counters. No uncertainty. From the first message to the final collection, every detail is handled by one dedicated concierge.",
    delivery: "Delivered around you",
    deliveryTitle: <>Your car, waiting<br /><em>where you arrive.</em></>,
    deliveryCopy: "Málaga Airport, private aviation, your hotel, villa or yacht. We prepare the handover around your itinerary.",
    booking: "Begin your journey",
    bookingTitle: <>Tell us the plan.<br /><em>We make it happen.</em></>,
    vehicle: "Choose a vehicle",
    location: "Delivery location",
    from: "From",
    to: "To",
    whatsapp: "Continue on WhatsApp",
  },
  ES: {
    nav: ["Flota", "Experiencia", "Entrega", "Nosotros"],
    reserve: "Solicitar vehículo",
    owner: "Panel de gestión",
    heroEyebrow: "Marbella · Puerto Banús · Costa del Sol",
    heroTitle: <>Conduce más allá<br /><em>de lo esperado.</em></>,
    heroCopy: "Coches excepcionales. Entrega personal. Un concierge que responde antes de que tengas que preguntar.",
    explore: "Explorar la flota",
    story: "Descubrir la experiencia",
    collection: "La colección",
    collectionTitle: <>Elige el coche.<br /><em>Nosotros hacemos el resto.</em></>,
    collectionCopy: "Veintiún vehículos seleccionados, preparados en Marbella y entregados donde comiencen tus planes.",
    all: "Ver la flota completa",
    experience: "La experiencia Five Star",
    experienceTitle: <>Lujo es cuando<br /><em>nada resulta difícil.</em></>,
    experienceCopy: "Sin colas, mostradores ni incertidumbre. Desde el primer mensaje hasta la recogida final, un concierge se ocupa de cada detalle.",
    delivery: "Entregado a tu medida",
    deliveryTitle: <>Tu coche esperando<br /><em>donde tú llegas.</em></>,
    deliveryCopy: "Aeropuerto de Málaga, aviación privada, hotel, villa o yate. Coordinamos la entrega alrededor de tu itinerario.",
    booking: "Empieza tu viaje",
    bookingTitle: <>Cuéntanos el plan.<br /><em>Nosotros lo hacemos realidad.</em></>,
    vehicle: "Elige un vehículo",
    location: "Lugar de entrega",
    from: "Desde",
    to: "Hasta",
    whatsapp: "Continuar por WhatsApp",
  },
};

export default function PublicSite() {
  const [language, setLanguage] = useState<Language>("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [category, setCategory] = useState<(typeof fleetCategories)[number]>("All");
  const [showAll, setShowAll] = useState(false);
  const [bookingVehicle, setBookingVehicle] = useState("Lamborghini Urus S");
  const [location, setLocation] = useState("Puerto Banús");
  const [startDate, setStartDate] = useState("2026-08-18");
  const [endDate, setEndDate] = useState("2026-08-21");
  const [cookiesVisible, setCookiesVisible] = useState(true);
  const t = copy[language];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const visibleFleet = useMemo(() => {
    const filtered = category === "All" ? fleet : fleet.filter((car) => car.category === category);
    return showAll ? filtered : filtered.slice(0, 6);
  }, [category, showAll]);

  const whatsappUrl = useMemo(() => {
    const message =
      language === "EN"
        ? `Hello Five Star Rentals, I am interested in the ${bookingVehicle}. I would like delivery to ${location} from ${startDate} to ${endDate}.`
        : `Hola Five Star Rentals, me interesa el ${bookingVehicle}. Me gustaría recibirlo en ${location} del ${startDate} al ${endDate}.`;
    return `https://wa.me/34622897184?text=${encodeURIComponent(message)}`;
  }, [bookingVehicle, location, startDate, endDate, language]);

  const switchLanguage = () => setLanguage((current) => (current === "EN" ? "ES" : "EN"));

  return (
    <main className="public-site">
      <header className={`public-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="fs-brand" href="#top" aria-label="Five Star Rentals home">
          <span className="fs-brand-mark"><b>5</b><i /></span>
          <span className="fs-brand-copy"><b>Five Star</b><small>Rentals</small></span>
        </Link>

        <nav className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
          <Link href="#fleet" onClick={() => setMenuOpen(false)}>{t.nav[0]}</Link>
          <Link href="#experience" onClick={() => setMenuOpen(false)}>{t.nav[1]}</Link>
          <Link href="#delivery" onClick={() => setMenuOpen(false)}>{t.nav[2]}</Link>
          <Link href="#about" onClick={() => setMenuOpen(false)}>{t.nav[3]}</Link>
        </nav>

        <div className="public-header-actions">
          <button className="language-switch" onClick={switchLanguage} type="button" aria-label="Switch language">
            {language}<ChevronDown />
          </button>
          <Link className="owner-link" href="/studio">{t.owner}</Link>
          <Link className="outline-button" href="#booking">{t.reserve}<ArrowRight /></Link>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} type="button" aria-label="Toggle menu">
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="luxury-hero" id="top">
        <Image
          src={fleet[1].image}
          alt="Lamborghini Urus S from Five Star Rentals in Marbella"
          fill
          priority
          sizes="100vw"
          className="luxury-hero-image"
        />
        <div className="hero-overlay" />
        <div className="film-grain" />
        <div className="luxury-hero-content">
          <p className="micro-label hero-enter-1"><span />{t.heroEyebrow}</p>
          <h1 className="hero-enter-2">{t.heroTitle}</h1>
          <p className="hero-lead hero-enter-3">{t.heroCopy}</p>
          <div className="hero-ctas hero-enter-4">
            <Link className="solid-button light" href="#fleet">{t.explore}<ArrowRight /></Link>
            <Link className="quiet-link" href="#experience">{t.story}<ArrowUpRight /></Link>
          </div>
        </div>
        <div className="hero-stats">
          <div><b>21</b><span>Exceptional vehicles</span></div>
          <div><b>24/7</b><span>Personal concierge</span></div>
          <div><b>4.9</b><span>38+ guest reviews</span></div>
        </div>
        <div className="hero-scroll"><i /><span>Scroll to discover</span></div>
      </section>

      <section className="brand-proof">
        <p>Selected marques</p>
        <div><span>Aston Martin</span><span>Lamborghini</span><span>Porsche</span><span>Mercedes-AMG</span><span>BMW M</span><span>Audi RS</span></div>
      </section>

      <section className="editorial-intro reveal" id="about">
        <div className="editorial-number">01</div>
        <div>
          <p className="micro-label dark"><span />Born in Marbella</p>
          <h2>Not simply a rental.<br /><em>A better way to arrive.</em></h2>
        </div>
        <div className="editorial-aside">
          <p>Every car in the Five Star collection is chosen for how it makes a moment feel—not simply for the badge it wears.</p>
          <p>From landing at Málaga to an evening in Puerto Banús, the experience is built around your schedule, your destination and your idea of freedom.</p>
        </div>
      </section>

      <section className="fleet-section" id="fleet">
        <div className="section-intro reveal">
          <div>
            <p className="micro-label dark"><span />{t.collection}</p>
            <h2>{t.collectionTitle}</h2>
          </div>
          <p>{t.collectionCopy}</p>
        </div>

        <div className="fleet-toolbar reveal">
          <div className="fleet-category-tabs" aria-label="Filter vehicles">
            {fleetCategories.map((item) => (
              <button
                className={category === item ? "active" : ""}
                type="button"
                onClick={() => {
                  setCategory(item);
                  setShowAll(false);
                }}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
          <span>{category === "All" ? fleet.length : fleet.filter((car) => car.category === category).length} vehicles</span>
        </div>

        <div className="premium-fleet-grid">
          {visibleFleet.map((car, index) => (
            <Link
              className={`premium-car-card reveal card-${index + 1}`}
              href={`/fleet/${car.slug}`}
              key={car.slug}
            >
              <Image src={car.image} alt={`${car.brand} ${car.model}`} fill sizes="(max-width: 760px) 100vw, 50vw" />
              <div className="premium-card-overlay" />
              <div className="premium-card-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <em>{car.category}</em>
              </div>
              <div className="premium-card-copy">
                <p>{car.brand} · {car.year}</p>
                <h3>{car.shortModel}</h3>
                <div className="premium-card-specs"><span>{car.hp} HP</span><span>{car.acceleration} 0–100</span><span>{car.seats} seats</span></div>
              </div>
              <div className="premium-card-price"><small>From</small><b>{formatEuro(car.price)}</b><span>/ day</span></div>
              <span className="circular-arrow"><ArrowRight /></span>
            </Link>
          ))}
        </div>

        {(category === "All" ? fleet.length : fleet.filter((car) => car.category === category).length) > 6 && (
          <button className="fleet-expand" type="button" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show curated selection" : t.all}<span>{showAll ? "−" : "+"}</span>
          </button>
        )}
      </section>

      <section className="experience-section" id="experience">
        <div className="experience-image reveal">
          <Image
            src="https://fivestars-rental.com/assets/images/fleet/aston-martin-dbs-superleggera/front-three-quarter.webp"
            alt="Aston Martin DBS Superleggera prepared by Five Star Rentals"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
          />
          <div className="experience-image-caption"><span>01</span><p>Prepared to the final detail before every handover.</p></div>
        </div>
        <div className="experience-content reveal">
          <p className="micro-label"><span />{t.experience}</p>
          <h2>{t.experienceTitle}</h2>
          <p className="experience-lead">{t.experienceCopy}</p>
          <div className="experience-points">
            <article><span>01</span><div><h3>Personal concierge</h3><p>A single point of contact, available around the clock in five languages.</p></div></article>
            <article><span>02</span><div><h3>Doorstep delivery</h3><p>Your car arrives fuelled, detailed and ready at your hotel, villa, yacht or terminal.</p></div></article>
            <article><span>03</span><div><h3>The exact vehicle</h3><p>The model you choose is the model you drive. No substitutions and no surprises.</p></div></article>
            <article><span>04</span><div><h3>Complete discretion</h3><p>Quiet, considered service for clients who value privacy as much as performance.</p></div></article>
          </div>
        </div>
      </section>

      <section className="delivery-section" id="delivery">
        <div className="delivery-copy reveal">
          <p className="micro-label dark"><span />{t.delivery}</p>
          <h2>{t.deliveryTitle}</h2>
          <p>{t.deliveryCopy}</p>
          <Link className="underlined-action" href="#booking">Plan your delivery<ArrowRight /></Link>
        </div>
        <div className="delivery-map reveal">
          <span className="map-coordinate top">36.7213° N</span>
          <span className="map-coordinate bottom">4.4214° W</span>
          <div className="coast-stroke" />
          <div className="map-location malaga"><i /><b>Málaga Airport</b><span>Terminal & private aviation</span></div>
          <div className="map-location marbella"><i /><b>Marbella</b><span>Hotels & private villas</span></div>
          <div className="map-location banus"><i /><b>Puerto Banús</b><span>Marina & Five Star base</span></div>
          <p>Costa del Sol</p>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-score"><b>4.9</b><span>38+ verified guest reviews</span></div>
        <blockquote className="reveal">
          “The car was immaculate, the team anticipated every detail, and the handover felt completely effortless.”
        </blockquote>
        <div className="testimonial-meta"><span>Recent Five Star guest</span><i /><span>Marbella</span></div>
      </section>

      <section className="booking-section" id="booking">
        <div className="booking-title reveal">
          <p className="micro-label"><span />{t.booking}</p>
          <h2>{t.bookingTitle}</h2>
          <p>Reply within minutes. Available 24 hours a day in English, Spanish, French, German and Dutch.</p>
        </div>
        <div className="booking-panel reveal">
          <label>
            <span>{t.vehicle}</span>
            <select value={bookingVehicle} onChange={(event) => setBookingVehicle(event.target.value)}>
              {fleet.map((car) => <option key={car.slug}>{car.brand} {car.shortModel}</option>)}
              <option>Let the concierge advise me</option>
            </select>
            <ChevronDown />
          </label>
          <label>
            <span>{t.location}</span>
            <select value={location} onChange={(event) => setLocation(event.target.value)}>
              <option>Puerto Banús</option><option>Marbella</option><option>Málaga Airport</option><option>My hotel or villa</option>
            </select>
            <ChevronDown />
          </label>
          <label>
            <span>{t.from}</span>
            <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </label>
          <label>
            <span>{t.to}</span>
            <input type="date" value={endDate} min={startDate} onChange={(event) => setEndDate(event.target.value)} />
          </label>
          <a className="whatsapp-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            <WhatsApp />{t.whatsapp}<ArrowRight />
          </a>
          <p>Average response under 5 minutes · 24/7 concierge</p>
        </div>
      </section>

      <footer className="public-footer">
        <div className="footer-statement">
          <span className="fs-brand-mark large"><b>5</b><i /></span>
          <h2>Born in Marbella.<br />Built for <em>legends.</em></h2>
        </div>
        <div className="footer-details">
          <div><small>Explore</small><Link href="#fleet">The fleet</Link><Link href="#experience">Experience</Link><Link href="#delivery">Delivery</Link><Link href="/studio">Owner Control</Link></div>
          <div><small>Contact</small><a href="https://wa.me/34622897184">+34 622 897 184</a><a href="mailto:hello@fivestar-rentals.com">hello@fivestar-rentals.com</a><span>24/7 concierge</span></div>
          <div><small>Visit</small><span>Parking Mathilda</span><span>Puerto Banús</span><span>29660 Marbella, Málaga</span></div>
        </div>
        <div className="footer-legal"><span>© 2026 Five Star Rentals</span><span>Concept and technology by Archic</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/legal">Legal</Link></div></div>
      </footer>

      {cookiesVisible && (
        <aside className="cookie-notice" aria-label="Cookie notice">
          <div><b>Your experience, considered.</b><p>We use essential cookies to keep this demonstration working smoothly.</p></div>
          <button type="button" onClick={() => setCookiesVisible(false)}>Accept</button>
          <button className="cookie-close" type="button" onClick={() => setCookiesVisible(false)} aria-label="Close cookie notice"><Close /></button>
        </aside>
      )}
    </main>
  );
}
