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
import BrandLogo from "./brand-logo";

type Language = "EN" | "ES";

const copy = {
  EN: {
    nav: ["Fleet", "Experience", "Delivery", "Concierge"],
    reserve: "Request a car",
    owner: "Owner Control",
    heroEyebrow: "Private fleet · Marbella & Puerto Banús",
    heroTitle: <>The car is<br /><em>part of the story.</em></>,
    heroCopy: "Twenty-one exceptional cars, delivered to your hotel, villa, yacht or terminal — with one concierge handling every detail.",
    explore: "Explore the collection",
    story: "See the Five Star service",
    stats: ["Exceptional vehicles", "Personal concierge", "Languages spoken"],
    scroll: "Discover Five Star",
    marques: "Selected marques",
    collectionTitle: <>The Five Star fleet.</>,
    collectionCopy: "21 cars selected for Marbella: supercars for the occasion, grand tourers for the coast and luxury SUVs for everyday use.",
    vehicles: "vehicles",
    from: "From",
    day: "/ day",
    seats: "seats",
    all: "View the complete fleet",
    curated: "Show curated selection",
    experienceTitle: <>One car. One contact.<br />No counter.</>,
    experienceCopy: "Choose the exact vehicle, tell us where you want it and keep one direct contact from confirmation to collection. Five Star handles the handover around your plans, not around an office desk.",
    experienceCaption: "Prepared and checked before every handover.",
    experiencePoints: [
      ["Personal concierge", "One direct contact, available 24/7 in English, French, German, Dutch and Spanish."],
      ["Doorstep delivery", "Hotel, villa, yacht, Málaga Airport or private aviation — the car comes to you."],
      ["The exact vehicle", "The model you choose is the model you drive. No substitutions."],
      ["Private, uncomplicated service", "A quiet handover and clear communication from start to finish."],
    ],
    deliveryTitle: <>Delivery, on your schedule.</>,
    deliveryCopy: "Free delivery in Marbella and Puerto Banús, with tailored handovers across the Costa del Sol and Málaga Airport. Share the arrival point and time; the concierge coordinates the rest.",
    planDelivery: "Plan your delivery",
    base: "Five Star base · Open 24/7",
    openMaps: "Open in Google Maps",
    reviewQuote: "The cars are immaculate, the team listens and the whole service feels genuinely VIP.",
    reviewMeta: "Recent Five Star guest · Marbella",
    bookingTitle: <>Send the essentials.<br />We take it from there.</>,
    bookingCopy: "Choose the car, delivery point and dates, then continue directly with the concierge on WhatsApp.",
    vehicle: "Choose a vehicle",
    location: "Delivery location",
    dateFrom: "From",
    dateTo: "To",
    whatsapp: "Continue on WhatsApp",
    response: "Direct concierge · Available 24/7",
    footerTitle: <>Luxury & performance car rental in Marbella and Puerto Banús.</>,
    exploreFooter: "Explore",
    contact: "Contact",
    visit: "Visit",
    cookieTitle: "A considered experience.",
    cookieCopy: "We use essential cookies to keep this demonstration working smoothly.",
    accept: "Accept",
  },
  ES: {
    nav: ["Flota", "Experiencia", "Entrega", "Concierge"],
    reserve: "Solicitar vehículo",
    owner: "Panel de gestión",
    heroEyebrow: "Flota privada · Marbella y Puerto Banús",
    heroTitle: <>El coche también<br /><em>forma parte de la historia.</em></>,
    heroCopy: "Veintiún coches excepcionales, entregados en tu hotel, villa, yate o terminal, con un concierge ocupándose de cada detalle.",
    explore: "Explorar la colección",
    story: "Ver el servicio Five Star",
    stats: ["Vehículos excepcionales", "Concierge personal", "Idiomas disponibles"],
    scroll: "Descubrir Five Star",
    marques: "Marcas seleccionadas",
    collectionTitle: <>La flota Five Star.</>,
    collectionCopy: "21 coches seleccionados para Marbella: superdeportivos para la ocasión, GT para recorrer la costa y SUV de lujo para el día a día.",
    vehicles: "vehículos",
    from: "Desde",
    day: "/ día",
    seats: "plazas",
    all: "Ver la flota completa",
    curated: "Mostrar selección curada",
    experienceTitle: <>Un coche. Un contacto.<br />Sin mostrador.</>,
    experienceCopy: "Elige el vehículo exacto, dinos dónde lo quieres y mantén un único contacto desde la confirmación hasta la recogida. Five Star organiza la entrega alrededor de tus planes, no de una oficina.",
    experienceCaption: "Preparado y revisado antes de cada entrega.",
    experiencePoints: [
      ["Concierge personal", "Un contacto directo disponible 24/7 en inglés, francés, alemán, neerlandés y español."],
      ["Entrega donde estés", "Hotel, villa, yate, aeropuerto de Málaga o aviación privada: el coche va hasta ti."],
      ["El vehículo exacto", "El modelo que eliges es el que conduces. Sin sustituciones."],
      ["Servicio privado y sencillo", "Una entrega discreta y comunicación clara de principio a fin."],
    ],
    deliveryTitle: <>Entrega, a tu horario.</>,
    deliveryCopy: "Entrega gratuita en Marbella y Puerto Banús, además de entregas personalizadas en la Costa del Sol y el aeropuerto de Málaga. Indica lugar y hora; el concierge coordina el resto.",
    planDelivery: "Planificar la entrega",
    base: "Base Five Star · Abierto 24/7",
    openMaps: "Abrir en Google Maps",
    reviewQuote: "Los coches están impecables, el equipo escucha y todo el servicio se siente realmente VIP.",
    reviewMeta: "Cliente reciente de Five Star · Marbella",
    bookingTitle: <>Envíanos lo esencial.<br />Nos ocupamos del resto.</>,
    bookingCopy: "Elige coche, lugar de entrega y fechas, y continúa directamente con el concierge por WhatsApp.",
    vehicle: "Elige un vehículo",
    location: "Lugar de entrega",
    dateFrom: "Desde",
    dateTo: "Hasta",
    whatsapp: "Continuar por WhatsApp",
    response: "Concierge directo · Disponible 24/7",
    footerTitle: <>Alquiler de coches de lujo y altas prestaciones en Marbella y Puerto Banús.</>,
    exploreFooter: "Explorar",
    contact: "Contacto",
    visit: "Visítanos",
    cookieTitle: "Una experiencia cuidada.",
    cookieCopy: "Usamos cookies esenciales para que esta demostración funcione correctamente.",
    accept: "Aceptar",
  },
};

const curatedOrder = [
  "lamborghini-urus-s",
  "aston-martin-dbs-superleggera",
  "mercedes-amg-g63-brabus",
  "porsche-911-gt3-992",
  "bmw-m5-touring-g99",
  "bmw-m4-competition-cabriolet",
];

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
    const ordered = category === "All"
      ? [...filtered].sort((a, b) => {
          const aIndex = curatedOrder.indexOf(a.slug);
          const bIndex = curatedOrder.indexOf(b.slug);
          return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
        })
      : filtered;
    return showAll ? ordered : ordered.slice(0, 6);
  }, [category, showAll]);

  const whatsappUrl = useMemo(() => {
    const message = language === "EN"
      ? `Hello Five Star Rentals, I am interested in the ${bookingVehicle}. I would like delivery to ${location} from ${startDate} to ${endDate}.`
      : `Hola Five Star Rentals, me interesa el ${bookingVehicle}. Me gustaría recibirlo en ${location} del ${startDate} al ${endDate}.`;
    return `https://wa.me/34622897184?text=${encodeURIComponent(message)}`;
  }, [bookingVehicle, location, startDate, endDate, language]);

  const switchLanguage = () => setLanguage((current) => (current === "EN" ? "ES" : "EN"));
  const resultCount = category === "All" ? fleet.length : fleet.filter((car) => car.category === category).length;

  return (
    <main className="public-site">
      <header className={`public-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="fs-brand" href="#top" aria-label="Five Star Rentals home"><BrandLogo priority /></Link>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
          <Link href="#fleet" onClick={() => setMenuOpen(false)}>{t.nav[0]}</Link>
          <Link href="#experience" onClick={() => setMenuOpen(false)}>{t.nav[1]}</Link>
          <Link href="#delivery" onClick={() => setMenuOpen(false)}>{t.nav[2]}</Link>
          <Link href="#booking" onClick={() => setMenuOpen(false)}>{t.nav[3]}</Link>
        </nav>
        <div className="public-header-actions">
          <button className="language-switch" onClick={switchLanguage} type="button" aria-label="Switch language">{language}<ChevronDown /></button>
          <Link className="owner-link" href="/studio">{t.owner}</Link>
          <Link className="outline-button" href="#booking">{t.reserve}<ArrowRight /></Link>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} type="button" aria-label="Toggle menu">{menuOpen ? <Close /> : <Menu />}</button>
        </div>
      </header>

      <section className="luxury-hero" id="top">
        <Image src="https://fivestars-rental.com/assets/images/hero-bg.jpg" alt="Lamborghini Urus by Five Star Rentals in Marbella" fill priority sizes="100vw" className="luxury-hero-image" />
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
        <div className="hero-caption"><div><b>Lamborghini Urus S</b><small>Blu Eleos · Marbella</small></div></div>
        <div className="hero-stats">
          <div><b>21</b><span>{t.stats[0]}</span></div>
          <div><b>24/7</b><span>{t.stats[1]}</span></div>
          <div><b>5</b><span>{t.stats[2]}</span></div>
        </div>
        <div className="hero-scroll"><i /><span>{t.scroll}</span></div>
      </section>

      <section className="brand-proof">
        <p>{t.marques}</p>
        <div><span>Aston Martin</span><span>Lamborghini</span><span>Porsche</span><span>Mercedes-AMG</span><span>BMW M</span><span>Audi RS</span></div>
      </section>

      <section className="fleet-section" id="fleet">
        <div className="section-intro section-intro-clean reveal">
          <h2>{t.collectionTitle}</h2>
          <p>{t.collectionCopy}</p>
        </div>
        <div className="fleet-toolbar reveal">
          <div className="fleet-category-tabs" aria-label="Filter vehicles">
            {fleetCategories.map((item) => (
              <button className={category === item ? "active" : ""} type="button" onClick={() => { setCategory(item); setShowAll(false); }} key={item}>{item}</button>
            ))}
          </div>
          <span>{resultCount} {t.vehicles}</span>
        </div>
        <div className="premium-fleet-grid">
          {visibleFleet.map((car, index) => (
            <Link className={`premium-car-card reveal card-${index + 1}`} href={`/fleet/${car.slug}`} key={car.slug}>
              <Image src={car.image} alt={`${car.brand} ${car.model}`} fill sizes="(max-width: 760px) 100vw, 50vw" />
              <div className="premium-card-overlay" />
              <div className="premium-card-top"><em>{car.category}</em></div>
              <div className="premium-card-copy"><p>{car.brand} · {car.year}</p><h3>{car.shortModel}</h3><div className="premium-card-specs"><span>{car.hp} HP</span><span>{car.acceleration} 0–100</span><span>{car.seats} {t.seats}</span></div></div>
              <div className="premium-card-price"><small>{t.from}</small><b>{formatEuro(car.price)}</b><span>{t.day}</span></div>
              <span className="circular-arrow"><ArrowRight /></span>
            </Link>
          ))}
        </div>
        {resultCount > 6 && <button className="fleet-expand" type="button" onClick={() => setShowAll(!showAll)}>{showAll ? t.curated : t.all}<span>{showAll ? "−" : "+"}</span></button>}
      </section>

      <section className="service-section" id="experience">
        <div className="service-media reveal">
          <Image src="https://fivestars-rental.com/assets/images/fleet/aston-martin-dbs-superleggera/front-three-quarter.webp" alt="Aston Martin DBS Superleggera prepared by Five Star Rentals" fill sizes="(max-width: 900px) 100vw, 54vw" />
          <div className="service-media-note"><b>Five Star Rentals</b><span>{t.experienceCaption}</span></div>
        </div>
        <div className="service-copy reveal">
          <h2>{t.experienceTitle}</h2>
          <p className="service-lead">{t.experienceCopy}</p>
          <div className="service-facts">
            {t.experiencePoints.map(([title, description]) => (
              <article key={title}><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="delivery-section delivery-clean" id="delivery">
        <div className="delivery-copy reveal">
          <h2>{t.deliveryTitle}</h2>
          <p>{t.deliveryCopy}</p>
          <Link className="underlined-action" href="#booking">{t.planDelivery}<ArrowRight /></Link>
        </div>
        <div className="delivery-map reveal">
          <iframe title="Five Star Rentals at Parking Mathilda, Puerto Banús" src="https://www.google.com/maps?q=Parking%20Mathilda%2C%20Av.%20de%20Lola%20Flores%2C%20Puerto%20Ban%C3%BAs%2C%20Marbella&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="map-location-card"><span>{t.base}</span><h3>Parking Mathilda</h3><p>Av. de Lola Flores, s/n<br />29660 Puerto Banús, Marbella</p><a href="https://www.google.com/maps/search/?api=1&query=Parking%20Mathilda%2C%20Av.%20de%20Lola%20Flores%2C%20Puerto%20Ban%C3%BAs%2C%20Marbella" target="_blank" rel="noreferrer">{t.openMaps}<ArrowUpRight /></a></div>
        </div>
      </section>

      <section className="testimonial-section proof-section">
        <div className="testimonial-score"><b>4.9</b><span>38+ Google reviews</span></div>
        <div className="testimonial-copy reveal"><blockquote>“{t.reviewQuote}”</blockquote><div className="testimonial-meta"><span>{t.reviewMeta}</span></div></div>
      </section>

      <section className="booking-section booking-clean" id="booking">
        <div className="booking-title reveal"><h2>{t.bookingTitle}</h2><p>{t.bookingCopy}</p></div>
        <div className="booking-panel reveal">
          <label><span>{t.vehicle}</span><select value={bookingVehicle} onChange={(event) => setBookingVehicle(event.target.value)}>{fleet.map((car) => <option key={car.slug}>{car.brand} {car.shortModel}</option>)}<option>{language === "EN" ? "Let the concierge advise me" : "Prefiero que me asesore el concierge"}</option></select><ChevronDown /></label>
          <label><span>{t.location}</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option>Puerto Banús</option><option>Marbella</option><option>Málaga Airport</option><option>{language === "EN" ? "My hotel or villa" : "Mi hotel o villa"}</option></select><ChevronDown /></label>
          <label><span>{t.dateFrom}</span><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></label>
          <label><span>{t.dateTo}</span><input type="date" value={endDate} min={startDate} onChange={(event) => setEndDate(event.target.value)} /></label>
          <a className="whatsapp-cta" href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsApp />{t.whatsapp}<ArrowRight /></a>
          <p>{t.response}</p>
        </div>
      </section>

      <footer className="public-footer">
        <div className="footer-statement"><BrandLogo /><h2>{t.footerTitle}</h2></div>
        <div className="footer-details">
          <div><small>{t.exploreFooter}</small><Link href="#fleet">{t.nav[0]}</Link><Link href="#experience">{t.nav[1]}</Link><Link href="#delivery">{t.nav[2]}</Link><Link href="/studio">{t.owner}</Link></div>
          <div><small>{t.contact}</small><a href="https://wa.me/34622897184">+34 622 897 184</a><a href="mailto:hello@fivestar-rentals.com">hello@fivestar-rentals.com</a><span>24/7 concierge</span></div>
          <div><small>{t.visit}</small><span>Parking Mathilda</span><span>Puerto Banús</span><span>29660 Marbella, Málaga</span></div>
        </div>
        <div className="footer-legal"><span>© 2026 Five Star Rentals</span><span>Concept and technology by Archic</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/legal">Legal</Link></div></div>
      </footer>

      <a className="floating-concierge" href="https://wa.me/34622897184" target="_blank" rel="noreferrer" aria-label="Contact Five Star Rentals concierge on WhatsApp"><WhatsApp /><span>Concierge</span></a>

      {cookiesVisible && (
        <aside className="cookie-notice" aria-label="Cookie notice">
          <div><b>{t.cookieTitle}</b><p>{t.cookieCopy}</p></div>
          <button type="button" onClick={() => setCookiesVisible(false)}>{t.accept}</button>
          <button className="cookie-close" type="button" onClick={() => setCookiesVisible(false)} aria-label="Close cookie notice"><Close /></button>
        </aside>
      )}
    </main>
  );
}
