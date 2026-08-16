"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fleet, fleetCategories, formatEuro } from "../_data/fleet";
import { ArrowRight, ArrowUpRight, ChevronDown, Close, Menu, WhatsApp } from "./icons";
import BrandLogo from "./brand-logo";

type Language = "EN" | "ES";

const copy = {
  EN: {
    nav: ["Fleet", "Service", "Delivery", "Concierge"],
    reserve: "Request a car",
    owner: "Owner Control",
    heroTag: "Marbella & Puerto Banús · 24/7 concierge",
    heroTitle: <>Marbella.<br />Delivered.</>,
    heroCopy: "21 luxury and performance cars. Your exact vehicle delivered to your hotel, villa, yacht or terminal, with one concierge handling the handover from start to finish.",
    explore: "Explore the fleet",
    story: "How delivery works",
    heroFacts: [["21", "cars in the fleet"], ["24/7", "direct concierge"], ["5", "languages spoken"]],
    spotlightEyebrow: "Selected from the Five Star fleet",
    spotlightTitle: <>Urus. DBS. GT3. G63.<br />Start here.</>,
    spotlightCopy: "Four very different ways to drive Marbella. Pick the car first; Five Star coordinates the rest around your plans.",
    viewCar: "View vehicle",
    requestThis: "Request this car",
    fleetTitle: <>21 cars. Choose yours.</>,
    fleetCopy: "Filter the collection by the way you want to drive. The model shown is the model you book — no substitute vehicle at handover.",
    vehicles: "vehicles",
    from: "From",
    day: "/ day",
    seats: "seats",
    all: "Show all 21 vehicles",
    curated: "Back to selected fleet",
    serviceTitle: <>You choose the car.<br />Five Star handles the handover.</>,
    serviceCopy: "No rental desk and no chain of departments. Send the car, location and dates; one person stays with the booking until collection.",
    serviceFacts: [
      ["Exact car", "The vehicle you select is the vehicle delivered."],
      ["Delivery to you", "Hotel, villa, yacht, Málaga Airport or private aviation."],
      ["One direct contact", "A multilingual concierge available around the clock."],
      ["Ready on arrival", "Fuelled, detailed and checked before the handover."],
    ],
    deliveryTitle: <>Hotel. Villa. Yacht. Terminal.</>,
    deliveryCopy: "Free delivery in Marbella and Puerto Banús, plus tailored handovers across the Costa del Sol and Málaga Airport. Share the arrival point and time; the concierge coordinates the car around it.",
    planDelivery: "Plan a delivery",
    base: "Five Star base · Open 24/7",
    openMaps: "Open in Google Maps",
    reviewQuote: "The cars are immaculate, the team listens and the whole service feels genuinely VIP.",
    reviewMeta: "Recent Five Star guest · Marbella",
    bookingTitle: <>Car. Place. Dates.</>,
    bookingCopy: "Send the essentials and continue directly with the concierge on WhatsApp. No account, no long form and no call centre.",
    vehicle: "Vehicle",
    location: "Delivery location",
    dateFrom: "From",
    dateTo: "To",
    whatsapp: "Continue with concierge",
    response: "Direct WhatsApp · Available 24/7",
    footerTitle: "Five Star Rentals · Marbella & Puerto Banús",
    exploreFooter: "Explore",
    contact: "Contact",
    visit: "Base",
    cookieTitle: "Essential cookies only.",
    cookieCopy: "We use essential cookies to keep this demonstration working correctly.",
    accept: "Accept",
  },
  ES: {
    nav: ["Flota", "Servicio", "Entrega", "Concierge"],
    reserve: "Solicitar coche",
    owner: "Panel de gestión",
    heroTag: "Marbella y Puerto Banús · Concierge 24/7",
    heroTitle: <>Marbella.<br />A tu puerta.</>,
    heroCopy: "21 coches de lujo y altas prestaciones. El vehículo exacto que eliges, entregado en tu hotel, villa, yate o terminal, con un único concierge gestionando todo de principio a fin.",
    explore: "Explorar la flota",
    story: "Cómo funciona la entrega",
    heroFacts: [["21", "coches en la flota"], ["24/7", "concierge directo"], ["5", "idiomas disponibles"]],
    spotlightEyebrow: "Selección de la flota Five Star",
    spotlightTitle: <>Urus. DBS. GT3. G63.<br />Empieza aquí.</>,
    spotlightCopy: "Cuatro formas muy distintas de conducir por Marbella. Elige primero el coche; Five Star coordina el resto alrededor de tus planes.",
    viewCar: "Ver vehículo",
    requestThis: "Solicitar este coche",
    fleetTitle: <>21 coches. Elige el tuyo.</>,
    fleetCopy: "Filtra la colección según cómo quieras conducir. El modelo que ves es el que reservas: sin sustituciones en la entrega.",
    vehicles: "vehículos",
    from: "Desde",
    day: "/ día",
    seats: "plazas",
    all: "Mostrar los 21 vehículos",
    curated: "Volver a la selección",
    serviceTitle: <>Tú eliges el coche.<br />Five Star gestiona la entrega.</>,
    serviceCopy: "Sin mostrador de alquiler ni cadenas de departamentos. Envía coche, ubicación y fechas; una sola persona mantiene el control hasta la recogida.",
    serviceFacts: [
      ["Coche exacto", "El vehículo que seleccionas es el que se entrega."],
      ["Entrega donde estés", "Hotel, villa, yate, aeropuerto de Málaga o aviación privada."],
      ["Un contacto directo", "Concierge multilingüe disponible las 24 horas."],
      ["Listo al llegar", "Repostado, detallado y revisado antes de la entrega."],
    ],
    deliveryTitle: <>Hotel. Villa. Yate. Terminal.</>,
    deliveryCopy: "Entrega gratuita en Marbella y Puerto Banús, además de entregas a medida en la Costa del Sol y el aeropuerto de Málaga. Indica punto y hora de llegada; el concierge coordina el coche alrededor de ello.",
    planDelivery: "Planificar una entrega",
    base: "Base Five Star · Abierto 24/7",
    openMaps: "Abrir en Google Maps",
    reviewQuote: "Los coches están impecables, el equipo escucha y todo el servicio se siente realmente VIP.",
    reviewMeta: "Cliente reciente de Five Star · Marbella",
    bookingTitle: <>Coche. Lugar. Fechas.</>,
    bookingCopy: "Envía lo esencial y continúa directamente con el concierge por WhatsApp. Sin cuenta, sin formulario interminable y sin centralita.",
    vehicle: "Vehículo",
    location: "Lugar de entrega",
    dateFrom: "Desde",
    dateTo: "Hasta",
    whatsapp: "Continuar con concierge",
    response: "WhatsApp directo · Disponible 24/7",
    footerTitle: "Five Star Rentals · Marbella y Puerto Banús",
    exploreFooter: "Explorar",
    contact: "Contacto",
    visit: "Base",
    cookieTitle: "Solo cookies esenciales.",
    cookieCopy: "Usamos cookies esenciales para que esta demostración funcione correctamente.",
    accept: "Aceptar",
  },
};

const curatedOrder = [
  "lamborghini-urus-s",
  "aston-martin-dbs-superleggera",
  "porsche-911-gt3-992",
  "mercedes-amg-g63-brabus",
  "bmw-m5-touring-g99",
  "bmw-m4-competition-cabriolet",
];

const spotlightFleet = curatedOrder.slice(0, 4).flatMap((slug) => {
  const car = fleet.find((vehicle) => vehicle.slug === slug);
  return car ? [car] : [];
});

export default function PublicSite() {
  const [language, setLanguage] = useState<Language>("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [category, setCategory] = useState<(typeof fleetCategories)[number]>("All");
  const [showAll, setShowAll] = useState(false);
  const [spotlightSlug, setSpotlightSlug] = useState(curatedOrder[0]);
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
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
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

  const spotlight = fleet.find((vehicle) => vehicle.slug === spotlightSlug) ?? fleet[0];

  const whatsappUrl = useMemo(() => {
    const message = language === "EN"
      ? `Hello Five Star Rentals, I am interested in the ${bookingVehicle}. I would like delivery to ${location} from ${startDate} to ${endDate}.`
      : `Hola Five Star Rentals, me interesa el ${bookingVehicle}. Me gustaría recibirlo en ${location} del ${startDate} al ${endDate}.`;
    return `https://wa.me/34622897184?text=${encodeURIComponent(message)}`;
  }, [bookingVehicle, location, startDate, endDate, language]);

  const switchLanguage = () => setLanguage((current) => (current === "EN" ? "ES" : "EN"));
  const resultCount = category === "All" ? fleet.length : fleet.filter((car) => car.category === category).length;

  return (
    <main className="public-site signature-site">
      <header className={`public-header signature-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="fs-brand" href="#top" aria-label="Five Star Rentals home"><BrandLogo priority /></Link>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
          <Link href="#fleet" onClick={() => setMenuOpen(false)}>{t.nav[0]}</Link>
          <Link href="#service" onClick={() => setMenuOpen(false)}>{t.nav[1]}</Link>
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

      <section className="signature-hero" id="top">
        <Image src="https://fivestars-rental.com/assets/images/hero-bg.jpg" alt="Lamborghini Urus by Five Star Rentals in Marbella" fill priority sizes="100vw" className="signature-hero-image" />
        <div className="signature-hero-shade" />
        <div className="signature-hero-copy">
          <p className="hero-tag">{t.heroTag}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-copy">{t.heroCopy}</p>
          <div className="hero-actions">
            <Link className="signature-primary" href="#fleet">{t.explore}<ArrowRight /></Link>
            <Link className="signature-secondary" href="#service">{t.story}<ArrowUpRight /></Link>
          </div>
        </div>
        <div className="signature-hero-bottom">
          <div className="hero-car-id"><b>Lamborghini Urus S</b><span>Blu Eleos · 666 HP</span></div>
          <div className="hero-fact-grid">
            {t.heroFacts.map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="spotlight-section" aria-label="Selected vehicles">
        <header className="spotlight-heading reveal">
          <p>{t.spotlightEyebrow}</p>
          <h2>{t.spotlightTitle}</h2>
          <span>{t.spotlightCopy}</span>
        </header>
        <div className="spotlight-stage reveal">
          <div className="spotlight-media" key={spotlight.slug}>
            <Image src={spotlight.image} alt={`${spotlight.brand} ${spotlight.model}`} fill sizes="(max-width: 900px) 100vw, 72vw" />
            <div className="spotlight-shade" />
            <div className="spotlight-car-copy">
              <p>{spotlight.brand} · {spotlight.year}</p>
              <h3>{spotlight.shortModel}</h3>
              <span>{spotlight.statement}</span>
              <div className="spotlight-specs">
                <span><b>{spotlight.hp}</b> HP</span>
                <span><b>{spotlight.acceleration}</b> 0–100</span>
                <span><b>{spotlight.topSpeed}</b> km/h</span>
              </div>
            </div>
            <div className="spotlight-actions">
              <Link href={`/fleet/${spotlight.slug}`}>{t.viewCar}<ArrowUpRight /></Link>
              <Link href="#booking" onClick={() => setBookingVehicle(`${spotlight.brand} ${spotlight.shortModel}`)}>{t.requestThis}<ArrowRight /></Link>
            </div>
          </div>
          <aside className="spotlight-picker">
            {spotlightFleet.map((car) => (
              <button className={car.slug === spotlight.slug ? "active" : ""} onClick={() => setSpotlightSlug(car.slug)} type="button" key={car.slug}>
                <span><b>{car.shortModel}</b><small>{car.brand}</small></span>
                <span><b>{formatEuro(car.price)}</b><small>{t.day}</small></span>
              </button>
            ))}
          </aside>
        </div>
      </section>

      <section className="signature-fleet" id="fleet">
        <div className="signature-section-head reveal">
          <h2>{t.fleetTitle}</h2>
          <p>{t.fleetCopy}</p>
        </div>
        <div className="fleet-toolbar signature-toolbar reveal">
          <div className="fleet-category-tabs" aria-label="Filter vehicles">
            {fleetCategories.map((item) => (
              <button className={category === item ? "active" : ""} type="button" onClick={() => { setCategory(item); setShowAll(false); }} key={item}>{item}</button>
            ))}
          </div>
          <span>{resultCount} {t.vehicles}</span>
        </div>
        <div className="signature-fleet-grid">
          {visibleFleet.map((car) => (
            <Link className="signature-car-card reveal" href={`/fleet/${car.slug}`} key={car.slug}>
              <div className="signature-card-image"><Image src={car.image} alt={`${car.brand} ${car.model}`} fill sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw" /></div>
              <div className="signature-card-body">
                <div><p>{car.brand} · {car.year}</p><h3>{car.shortModel}</h3></div>
                <div className="signature-card-rate"><small>{t.from}</small><b>{formatEuro(car.price)}</b><span>{t.day}</span></div>
              </div>
              <div className="signature-card-foot"><span>{car.hp} HP</span><span>{car.acceleration} 0–100</span><span>{car.seats} {t.seats}</span><ArrowRight /></div>
            </Link>
          ))}
        </div>
        {resultCount > 6 && <button className="signature-expand" type="button" onClick={() => setShowAll(!showAll)}>{showAll ? t.curated : t.all}<span>{showAll ? "−" : "+"}</span></button>}
      </section>

      <section className="signature-service" id="service">
        <div className="signature-service-copy reveal">
          <h2>{t.serviceTitle}</h2>
          <p>{t.serviceCopy}</p>
          <div className="signature-service-facts">
            {t.serviceFacts.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </div>
        <div className="signature-service-media reveal">
          <Image src="https://fivestars-rental.com/assets/images/fleet/aston-martin-dbs-superleggera/front-three-quarter.webp" alt="Aston Martin DBS Superleggera prepared for handover" fill sizes="(max-width: 900px) 100vw, 48vw" />
          <div><b>Aston Martin DBS Superleggera</b><span>Prepared for handover · Marbella</span></div>
        </div>
      </section>

      <section className="signature-delivery" id="delivery">
        <div className="signature-delivery-copy reveal">
          <h2>{t.deliveryTitle}</h2>
          <p>{t.deliveryCopy}</p>
          <Link href="#booking">{t.planDelivery}<ArrowRight /></Link>
        </div>
        <div className="signature-map reveal">
          <iframe title="Five Star Rentals at Parking Mathilda, Puerto Banús" src="https://www.google.com/maps?q=Parking%20Mathilda%2C%20Av.%20de%20Lola%20Flores%2C%20Puerto%20Ban%C3%BAs%2C%20Marbella&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="signature-map-card"><span>{t.base}</span><h3>Parking Mathilda</h3><p>Av. de Lola Flores, s/n<br />29660 Puerto Banús, Marbella</p><a href="https://www.google.com/maps/search/?api=1&query=Parking%20Mathilda%2C%20Av.%20de%20Lola%20Flores%2C%20Puerto%20Ban%C3%BAs%2C%20Marbella" target="_blank" rel="noreferrer">{t.openMaps}<ArrowUpRight /></a></div>
        </div>
      </section>

      <section className="signature-proof reveal">
        <div><b>4.9</b><span>38+ Google reviews</span></div>
        <blockquote>“{t.reviewQuote}”</blockquote>
        <p>{t.reviewMeta}</p>
      </section>

      <section className="signature-booking" id="booking">
        <div className="signature-booking-head reveal"><h2>{t.bookingTitle}</h2><p>{t.bookingCopy}</p></div>
        <div className="signature-booking-panel reveal">
          <label><span>{t.vehicle}</span><select value={bookingVehicle} onChange={(event) => setBookingVehicle(event.target.value)}>{fleet.map((car) => <option key={car.slug}>{car.brand} {car.shortModel}</option>)}<option>{language === "EN" ? "Let the concierge advise me" : "Prefiero que me asesore el concierge"}</option></select><ChevronDown /></label>
          <label><span>{t.location}</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option>Puerto Banús</option><option>Marbella</option><option>Málaga Airport</option><option>{language === "EN" ? "My hotel or villa" : "Mi hotel o villa"}</option></select><ChevronDown /></label>
          <label><span>{t.dateFrom}</span><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></label>
          <label><span>{t.dateTo}</span><input type="date" value={endDate} min={startDate} onChange={(event) => setEndDate(event.target.value)} /></label>
          <a className="signature-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsApp />{t.whatsapp}<ArrowRight /></a>
          <p>{t.response}</p>
        </div>
      </section>

      <footer className="signature-footer">
        <div className="signature-footer-main"><BrandLogo /><h2>{t.footerTitle}</h2></div>
        <div className="signature-footer-grid">
          <div><small>{t.exploreFooter}</small><Link href="#fleet">{t.nav[0]}</Link><Link href="#service">{t.nav[1]}</Link><Link href="#delivery">{t.nav[2]}</Link><Link href="/studio">{t.owner}</Link></div>
          <div><small>{t.contact}</small><a href="https://wa.me/34622897184">+34 622 897 184</a><a href="mailto:hello@fivestar-rentals.com">hello@fivestar-rentals.com</a><span>24/7 concierge</span></div>
          <div><small>{t.visit}</small><span>Parking Mathilda</span><span>Puerto Banús</span><span>29660 Marbella, Málaga</span></div>
        </div>
        <div className="signature-footer-legal"><span>© 2026 Five Star Rentals</span><span>Concept and technology by Archic</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/legal">Legal</Link></div></div>
      </footer>

      <a className="floating-concierge signature-floating" href="https://wa.me/34622897184" target="_blank" rel="noreferrer" aria-label="Contact Five Star Rentals concierge on WhatsApp"><WhatsApp /><span>Concierge</span></a>

      {cookiesVisible && (
        <aside className="cookie-notice signature-cookie" aria-label="Cookie notice">
          <div><b>{t.cookieTitle}</b><p>{t.cookieCopy}</p></div>
          <button type="button" onClick={() => setCookiesVisible(false)}>{t.accept}</button>
          <button className="cookie-close" type="button" onClick={() => setCookiesVisible(false)} aria-label="Close cookie notice"><Close /></button>
        </aside>
      )}
    </main>
  );
}
