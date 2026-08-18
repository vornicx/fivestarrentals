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
    nav: ["Fleet", "Experience", "Delivery", "Concierge"],
    reserve: "Request a car",
    owner: "Owner access",
    heroTag: "Luxury car rental · Marbella & Puerto Banús",
    heroTitle: <>Choose the car.<br /><em>We handle Marbella.</em></>,
    heroCopy: "A 21-car premium fleet, free delivery in Marbella and Puerto Banús, and one multilingual concierge available 24/7. From airport arrival to final collection, the rental is built around your stay.",
    explore: "Explore the fleet",
    concierge: "Speak to concierge",
    heroFacts: [["21", "premium vehicles"], ["24/7", "personal concierge"], ["5", "languages"], ["Free", "Marbella delivery"]],
    heroSelection: "Five Star selection",
    from: "From",
    day: "/ day",
    spotlightEyebrow: "The Five Star edit",
    spotlightTitle: <>Four cars.<br /><em>Four versions of Marbella.</em></>,
    spotlightCopy: "A super-SUV for arrivals, a V12 grand tourer, a road-going GT3 and the unmistakable G-Class. Start with the drive you want; the concierge takes care of the logistics.",
    viewCar: "View vehicle",
    requestThis: "Request this car",
    fleetEyebrow: "The collection",
    fleetTitle: <>21 cars.<br /><em>No anonymous catalogue.</em></>,
    fleetCopy: "Every vehicle has its own specification, rate and character. Filter by the kind of drive you want, then ask Five Star to confirm dates and terms directly on WhatsApp.",
    vehicles: "vehicles",
    seats: "seats",
    all: "Show all 21 vehicles",
    curated: "Back to selected fleet",
    categories: { All: "All", Supercar: "Supercars", "Luxury SUV": "Luxury SUVs", "Grand Tourer": "Grand tourers", Convertible: "Convertibles", Performance: "Performance" },
    experienceEyebrow: "More than the keys",
    experienceTitle: <>Your arrival is part<br /><em>of the service.</em></>,
    experienceCopy: "Five Star is strongest when the car disappears into the plan: waiting outside the hotel, coordinated with a flight, paired with a driver or supported by a concierge for the rest of the stay.",
    experiences: [
      ["01", "Hotel & villa delivery", "Your car delivered to the entrance and collected at the end of the stay.", "Marbella · Golden Mile · Puerto Banús"],
      ["02", "Airport & private aviation", "Arrival handovers at Málaga Airport, including private aviation coordination.", "AGP · arrivals & departures"],
      ["03", "Personal chauffeur", "A professional driver for a day, a weekend or the full stay when you would rather be driven.", "On request"],
      ["04", "VIP concierge", "Restaurant bookings, club tables, beach clubs, yacht or jet requests through the same 24/7 line.", "EN · FR · DE · NL · ES"],
    ],
    deliveryEyebrow: "Costa del Sol delivery",
    deliveryTitle: <>From Sotogrande<br /><em>to Málaga.</em></>,
    deliveryCopy: "Free delivery is available in Marbella and Puerto Banús. For the wider Costa del Sol, Five Star coordinates the handover around your route, hotel or arrival time.",
    deliveryRoute: ["Sotogrande", "Puerto Banús", "Golden Mile", "Marbella", "Málaga Airport"],
    planDelivery: "Plan my handover",
    base: "Five Star base · Puerto Banús",
    openMaps: "Open in Google Maps",
    proofEyebrow: "Five Star, in numbers",
    proofTitle: <>Small enough to be personal.<br /><em>Built to stay available.</em></>,
    proofFacts: [["4.9", "Google rating"], ["38+", "Google reviews"], ["21", "premium vehicles"], ["24/7", "concierge line"]],
    bookingEyebrow: "Direct booking",
    bookingTitle: <>Car. Place. Dates.<br /><em>Then WhatsApp.</em></>,
    bookingCopy: "No account and no call-centre loop. Send the essentials and continue directly with the Five Star concierge, who confirms availability, terms and delivery.",
    vehicle: "Vehicle",
    location: "Delivery location",
    dateFrom: "From",
    dateTo: "To",
    whatsapp: "Continue with concierge",
    response: "Direct WhatsApp · Available 24/7",
    footerTitle: "Five Star Rentals",
    footerLine: "Luxury car rental · Marbella, Puerto Banús & Costa del Sol",
    exploreFooter: "Explore",
    contact: "Contact",
    visit: "Base",
    cookieTitle: "Essential cookies only.",
    cookieCopy: "We use essential storage to keep this experience working correctly.",
    accept: "Accept",
  },
  ES: {
    nav: ["Flota", "Experiencia", "Entrega", "Concierge"],
    reserve: "Solicitar coche",
    owner: "Acceso propietario",
    heroTag: "Alquiler de coches de lujo · Marbella y Puerto Banús",
    heroTitle: <>Elige el coche.<br /><em>Five Star se ocupa de Marbella.</em></>,
    heroCopy: "Una flota premium de 21 coches, entrega gratuita en Marbella y Puerto Banús y un concierge multilingüe disponible 24/7. Desde tu llegada hasta la recogida final, el alquiler se adapta a tu estancia.",
    explore: "Explorar la flota",
    concierge: "Hablar con concierge",
    heroFacts: [["21", "vehículos premium"], ["24/7", "concierge personal"], ["5", "idiomas"], ["Gratis", "entrega en Marbella"]],
    heroSelection: "Selección Five Star",
    from: "Desde",
    day: "/ día",
    spotlightEyebrow: "La selección Five Star",
    spotlightTitle: <>Cuatro coches.<br /><em>Cuatro formas de Marbella.</em></>,
    spotlightCopy: "Un super-SUV para llegar, un gran turismo V12, un GT3 de carretera y el inconfundible Clase G. Empieza por cómo quieres conducir; el concierge resuelve la logística.",
    viewCar: "Ver vehículo",
    requestThis: "Solicitar este coche",
    fleetEyebrow: "La colección",
    fleetTitle: <>21 coches.<br /><em>Nada de catálogo anónimo.</em></>,
    fleetCopy: "Cada vehículo tiene su propia configuración, tarifa y carácter. Filtra según cómo quieras conducir y pide a Five Star que confirme fechas y condiciones directamente por WhatsApp.",
    vehicles: "vehículos",
    seats: "plazas",
    all: "Mostrar los 21 vehículos",
    curated: "Volver a la selección",
    categories: { All: "Todos", Supercar: "Superdeportivos", "Luxury SUV": "SUV de lujo", "Grand Tourer": "Gran turismo", Convertible: "Descapotables", Performance: "Performance" },
    experienceEyebrow: "Más que las llaves",
    experienceTitle: <>Tu llegada también<br /><em>forma parte del servicio.</em></>,
    experienceCopy: "Five Star funciona mejor cuando el coche se integra en el plan: esperando fuera del hotel, coordinado con tu vuelo, con chófer o respaldado por un concierge durante el resto de la estancia.",
    experiences: [
      ["01", "Entrega en hotel y villa", "El coche en la entrada y recogida al terminar tu estancia.", "Marbella · Golden Mile · Puerto Banús"],
      ["02", "Aeropuerto y aviación privada", "Entregas coordinadas en el aeropuerto de Málaga, incluida aviación privada.", "AGP · llegadas y salidas"],
      ["03", "Chófer personal", "Conductor profesional por un día, un fin de semana o toda la estancia cuando prefieras que conduzcan por ti.", "Bajo petición"],
      ["04", "VIP concierge", "Reservas de restaurantes, clubs, beach clubs y peticiones de yate o jet desde la misma línea 24/7.", "EN · FR · DE · NL · ES"],
    ],
    deliveryEyebrow: "Entrega Costa del Sol",
    deliveryTitle: <>De Sotogrande<br /><em>a Málaga.</em></>,
    deliveryCopy: "La entrega es gratuita en Marbella y Puerto Banús. Para el resto de la Costa del Sol, Five Star coordina la entrega alrededor de tu ruta, hotel u hora de llegada.",
    deliveryRoute: ["Sotogrande", "Puerto Banús", "Golden Mile", "Marbella", "Aeropuerto de Málaga"],
    planDelivery: "Planificar mi entrega",
    base: "Base Five Star · Puerto Banús",
    openMaps: "Abrir en Google Maps",
    proofEyebrow: "Five Star, en cifras",
    proofTitle: <>Lo bastante pequeño para ser personal.<br /><em>Preparado para estar disponible.</em></>,
    proofFacts: [["4.9", "valoración en Google"], ["38+", "reseñas en Google"], ["21", "vehículos premium"], ["24/7", "línea de concierge"]],
    bookingEyebrow: "Reserva directa",
    bookingTitle: <>Coche. Lugar. Fechas.<br /><em>Después, WhatsApp.</em></>,
    bookingCopy: "Sin cuenta y sin vueltas de centralita. Envía lo esencial y continúa directamente con el concierge de Five Star, que confirma disponibilidad, condiciones y entrega.",
    vehicle: "Vehículo",
    location: "Lugar de entrega",
    dateFrom: "Desde",
    dateTo: "Hasta",
    whatsapp: "Continuar con concierge",
    response: "WhatsApp directo · Disponible 24/7",
    footerTitle: "Five Star Rentals",
    footerLine: "Alquiler de coches de lujo · Marbella, Puerto Banús y Costa del Sol",
    exploreFooter: "Explorar",
    contact: "Contacto",
    visit: "Base",
    cookieTitle: "Solo cookies esenciales.",
    cookieCopy: "Usamos almacenamiento esencial para que esta experiencia funcione correctamente.",
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

const heroVehicle = fleet.find((vehicle) => vehicle.slug === "lamborghini-urus-s") ?? fleet[0];

function getIsoDate(offset: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

export default function PublicSite() {
  const [language, setLanguage] = useState<Language>("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [category, setCategory] = useState<(typeof fleetCategories)[number]>("All");
  const [showAll, setShowAll] = useState(false);
  const [spotlightSlug, setSpotlightSlug] = useState(curatedOrder[0]);
  const [bookingVehicle, setBookingVehicle] = useState("Lamborghini Urus S");
  const [location, setLocation] = useState("Puerto Banús");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cookiesVisible, setCookiesVisible] = useState(false);
  const t = copy[language];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [category, showAll]);

  useEffect(() => {
    setStartDate(getIsoDate(1));
    setEndDate(getIsoDate(4));
    try {
      setCookiesVisible(window.localStorage.getItem("five-star-essential-accepted") !== "1");
    } catch {
      setCookiesVisible(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

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
    const dates = startDate && endDate ? `${startDate} to ${endDate}` : "dates to be confirmed";
    const datesEs = startDate && endDate ? `del ${startDate} al ${endDate}` : "con fechas por confirmar";
    const message = language === "EN"
      ? `Hello Five Star Rentals, I am interested in the ${bookingVehicle}. I would like delivery to ${location}, ${dates}. Could you confirm availability and terms?`
      : `Hola Five Star Rentals, me interesa el ${bookingVehicle}. Me gustaría recibirlo en ${location}, ${datesEs}. ¿Podéis confirmarme disponibilidad y condiciones?`;
    return `https://wa.me/34622897184?text=${encodeURIComponent(message)}`;
  }, [bookingVehicle, location, startDate, endDate, language]);

  const switchLanguage = () => setLanguage((current) => (current === "EN" ? "ES" : "EN"));
  const resultCount = category === "All" ? fleet.length : fleet.filter((car) => car.category === category).length;

  const acceptCookies = () => {
    try { window.localStorage.setItem("five-star-essential-accepted", "1"); } catch {}
    setCookiesVisible(false);
  };

  return (
    <main className="public-site signature-site archic-2026">
      <header className={`public-header signature-header a26-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="fs-brand" href="#top" aria-label="Five Star Rentals home"><BrandLogo priority /></Link>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
          <Link href="#fleet" onClick={() => setMenuOpen(false)}>{t.nav[0]}</Link>
          <Link href="#service" onClick={() => setMenuOpen(false)}>{t.nav[1]}</Link>
          <Link href="#delivery" onClick={() => setMenuOpen(false)}>{t.nav[2]}</Link>
          <Link href="#booking" onClick={() => setMenuOpen(false)}>{t.nav[3]}</Link>
        </nav>
        <div className="public-header-actions">
          <button className="language-switch" onClick={switchLanguage} type="button" aria-label="Switch language">{language}<ChevronDown /></button>
          <Link className="outline-button" href="#booking">{t.reserve}<ArrowRight /></Link>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} type="button" aria-label="Toggle menu">{menuOpen ? <Close /> : <Menu />}</button>
        </div>
      </header>

      <section className="signature-hero a26-hero" id="top">
        <Image src="https://fivestars-rental.com/assets/images/hero-bg.jpg" alt="Lamborghini Urus from Five Star Rentals in Marbella" fill priority sizes="100vw" className="signature-hero-image" />
        <div className="signature-hero-shade" />
        <div className="signature-hero-copy a26-hero-copy">
          <p className="hero-tag a26-kicker">{t.heroTag}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-copy">{t.heroCopy}</p>
          <div className="hero-actions">
            <Link className="signature-primary" href="#fleet">{t.explore}<ArrowRight /></Link>
            <a className="signature-secondary" href="https://wa.me/34622897184" target="_blank" rel="noreferrer">{t.concierge}<WhatsApp /></a>
          </div>
        </div>

        <Link className="a26-hero-car" href={`/fleet/${heroVehicle.slug}`}>
          <div className="a26-hero-car-head"><span>{t.heroSelection}</span><ArrowUpRight /></div>
          <div><small>{heroVehicle.brand} · {heroVehicle.year}</small><h2>{heroVehicle.shortModel}</h2></div>
          <div className="a26-hero-car-rate"><span>{t.from}</span><b>{formatEuro(heroVehicle.price)}</b><small>{t.day}</small></div>
        </Link>

        <div className="signature-hero-bottom a26-hero-bottom">
          <div className="a26-hero-proof"><b>4.9</b><span>38+ Google reviews</span></div>
          <div className="hero-fact-grid">
            {t.heroFacts.map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="spotlight-section a26-spotlight" aria-label="Selected vehicles">
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
            {spotlightFleet.map((car, index) => (
              <button className={car.slug === spotlight.slug ? "active" : ""} onClick={() => setSpotlightSlug(car.slug)} type="button" key={car.slug}>
                <span className="a26-picker-index">0{index + 1}</span>
                <span><b>{car.shortModel}</b><small>{car.brand}</small></span>
                <span><b>{formatEuro(car.price)}</b><small>{t.day}</small></span>
              </button>
            ))}
          </aside>
        </div>
      </section>

      <section className="signature-fleet a26-fleet" id="fleet">
        <div className="signature-section-head reveal">
          <div><p className="a26-section-eyebrow">{t.fleetEyebrow}</p><h2>{t.fleetTitle}</h2></div>
          <p>{t.fleetCopy}</p>
        </div>
        <div className="fleet-toolbar signature-toolbar reveal">
          <div className="fleet-category-tabs" aria-label="Filter vehicles">
            {fleetCategories.map((item) => (
              <button className={category === item ? "active" : ""} type="button" onClick={() => { setCategory(item); setShowAll(false); }} key={item}>{t.categories[item]}</button>
            ))}
          </div>
          <span>{resultCount} {t.vehicles}</span>
        </div>
        <div className="signature-fleet-grid">
          {visibleFleet.map((car, index) => (
            <Link className="signature-car-card reveal" href={`/fleet/${car.slug}`} key={car.slug}>
              <div className="signature-card-image"><Image src={car.image} alt={`${car.brand} ${car.model}`} fill sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw" /></div>
              <div className="a26-card-index">{String(index + 1).padStart(2, "0")}</div>
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

      <section className="a26-experience" id="service">
        <header className="a26-experience-head reveal">
          <p>{t.experienceEyebrow}</p>
          <h2>{t.experienceTitle}</h2>
          <span>{t.experienceCopy}</span>
        </header>
        <div className="a26-experience-layout">
          <div className="a26-experience-media reveal">
            <Image src="https://fivestars-rental.com/assets/images/fleet/aston-martin-dbs-superleggera/front-three-quarter.webp" alt="Aston Martin DBS Superleggera prepared by Five Star Rentals" fill sizes="(max-width: 900px) 100vw, 46vw" />
            <div className="a26-experience-caption"><span>Five Star Rentals</span><b>Marbella · Puerto Banús</b></div>
          </div>
          <div className="a26-experience-list reveal">
            {t.experiences.map(([index, title, description, meta]) => (
              <article key={index}>
                <span>{index}</span>
                <div><h3>{title}</h3><p>{description}</p><small>{meta}</small></div>
                <ArrowUpRight />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="signature-delivery a26-delivery" id="delivery">
        <div className="signature-delivery-copy reveal">
          <p className="a26-section-eyebrow">{t.deliveryEyebrow}</p>
          <h2>{t.deliveryTitle}</h2>
          <p>{t.deliveryCopy}</p>
          <div className="a26-route" aria-label="Costa del Sol delivery route">
            {t.deliveryRoute.map((stop, index) => <span key={stop}><i>{String(index + 1).padStart(2, "0")}</i>{stop}</span>)}
          </div>
          <Link href="#booking">{t.planDelivery}<ArrowRight /></Link>
        </div>
        <div className="signature-map reveal">
          <iframe title="Five Star Rentals at Parking Mathilda, Puerto Banús" src="https://www.google.com/maps?q=Parking%20Mathilda%2C%20Av.%20de%20Lola%20Flores%2C%20Puerto%20Ban%C3%BAs%2C%20Marbella&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="signature-map-card"><span>{t.base}</span><h3>Parking Mathilda</h3><p>Av. de Lola Flores, s/n<br />29660 Puerto Banús, Marbella</p><a href="https://www.google.com/maps/search/?api=1&query=Parking%20Mathilda%2C%20Av.%20de%20Lola%20Flores%2C%20Puerto%20Ban%C3%BAs%2C%20Marbella" target="_blank" rel="noreferrer">{t.openMaps}<ArrowUpRight /></a></div>
        </div>
      </section>

      <section className="a26-proof">
        <div className="a26-proof-head reveal"><p>{t.proofEyebrow}</p><h2>{t.proofTitle}</h2></div>
        <div className="a26-proof-grid reveal">
          {t.proofFacts.map(([value, label], index) => <div key={label}><span>0{index + 1}</span><b>{value}</b><p>{label}</p></div>)}
        </div>
      </section>

      <section className="signature-booking a26-booking" id="booking">
        <div className="signature-booking-head reveal"><p className="a26-section-eyebrow">{t.bookingEyebrow}</p><h2>{t.bookingTitle}</h2><p>{t.bookingCopy}</p></div>
        <div className="signature-booking-panel reveal">
          <label><span>{t.vehicle}</span><select value={bookingVehicle} onChange={(event) => setBookingVehicle(event.target.value)}>{fleet.map((car) => <option key={car.slug}>{car.brand} {car.shortModel}</option>)}<option>{language === "EN" ? "Let the concierge advise me" : "Prefiero que me asesore el concierge"}</option></select><ChevronDown /></label>
          <label><span>{t.location}</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option>Puerto Banús</option><option>Marbella</option><option>Málaga Airport</option><option>{language === "EN" ? "My hotel or villa" : "Mi hotel o villa"}</option></select><ChevronDown /></label>
          <label><span>{t.dateFrom}</span><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></label>
          <label><span>{t.dateTo}</span><input type="date" value={endDate} min={startDate || undefined} onChange={(event) => setEndDate(event.target.value)} /></label>
          <a className="signature-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsApp />{t.whatsapp}<ArrowRight /></a>
          <p>{t.response}</p>
        </div>
      </section>

      <footer className="signature-footer a26-footer">
        <div className="signature-footer-main"><BrandLogo /><div><h2>{t.footerTitle}</h2><p>{t.footerLine}</p></div></div>
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
          <button type="button" onClick={acceptCookies}>{t.accept}</button>
          <button className="cookie-close" type="button" onClick={acceptCookies} aria-label="Close cookie notice"><Close /></button>
        </aside>
      )}
    </main>
  );
}