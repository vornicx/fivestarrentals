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
    nav: ["Fleet", "Experience", "Delivery", "About"],
    reserve: "Request a car",
    owner: "Owner Control",
    heroEyebrow: "Private fleet · Marbella & Puerto Banús",
    heroTitle: <>The car is<br /><em>part of the story.</em></>,
    heroCopy: "Twenty-one exceptional cars, delivered to your hotel, villa, yacht or terminal — with one concierge handling every detail.",
    explore: "Explore the collection",
    story: "See the Five Star experience",
    stats: ["Exceptional vehicles", "Personal concierge", "Languages spoken"],
    scroll: "Discover Five Star",
    marques: "Selected marques",
    aboutEyebrow: "Born in Marbella",
    aboutTitle: <>Not simply a rental.<br /><em>A better way to arrive.</em></>,
    aboutOne: "Five Star is built around the part most rental companies forget: how the entire experience feels. The handover, the timing, the detail and the confidence that everything is already handled.",
    aboutTwo: "Land at Málaga, leave a villa in Benahavís or step off a yacht in Puerto Banús. The car should feel like it was always meant to be there.",
    collection: "The collection",
    collectionTitle: <>Choose the car.<br /><em>We handle the rest.</em></>,
    collectionCopy: "A deliberately varied collection: supercars for the occasion, grand tourers for the coast and SUVs that make every arrival feel considered.",
    vehicles: "vehicles",
    from: "From",
    day: "/ day",
    seats: "seats",
    all: "View the complete fleet",
    curated: "Show curated selection",
    experience: "The Five Star standard",
    experienceTitle: <>Luxury is when<br /><em>nothing feels difficult.</em></>,
    experienceCopy: "No queues. No counter. No hand-offs between departments. From the first message to the final collection, one dedicated concierge keeps the experience moving around you.",
    experienceCaption: "Prepared, detailed and checked before every handover.",
    experiencePoints: [
      ["Personal concierge", "One point of contact, available 24/7 in English, French, German, Dutch and Spanish."],
      ["Doorstep delivery", "Your car arrives fuelled and detailed at your hotel, villa, yacht, terminal or private aviation arrival."],
      ["The exact vehicle", "The model you choose is the model you drive. No substitutions and no last-minute surprises."],
      ["Discreet by default", "A calm, considered service for guests who value privacy as much as performance."],
    ],
    delivery: "Delivered around you",
    deliveryTitle: <>Your car, waiting<br /><em>where you arrive.</em></>,
    deliveryCopy: "Free delivery in Marbella and Puerto Banús, with tailored handovers across the Costa del Sol and Málaga Airport. We work backwards from your itinerary, not from an office counter.",
    planDelivery: "Plan your delivery",
    base: "Five Star base · Open 24/7",
    openMaps: "Open in Google Maps",
    reviewLabel: "Guest experience",
    reviewQuote: "The cars are immaculate, the team listens and the whole service feels genuinely VIP.",
    reviewMeta: "Recent Five Star guest · Marbella",
    booking: "Begin your journey",
    bookingTitle: <>Tell us the plan.<br /><em>We make it happen.</em></>,
    bookingCopy: "Send the essentials and continue directly with the concierge on WhatsApp. Replies are available around the clock.",
    vehicle: "Choose a vehicle",
    location: "Delivery location",
    dateFrom: "From",
    dateTo: "To",
    whatsapp: "Continue on WhatsApp",
    response: "Direct concierge · Available 24/7",
    footerTitle: <>Born in Marbella.<br />Built for <em>the moment.</em></>,
    exploreFooter: "Explore",
    contact: "Contact",
    visit: "Visit",
    cookieTitle: "A considered experience.",
    cookieCopy: "We use essential cookies to keep this demonstration working smoothly.",
    accept: "Accept",
  },
  ES: {
    nav: ["Flota", "Experiencia", "Entrega", "Nosotros"],
    reserve: "Solicitar vehículo",
    owner: "Panel de gestión",
    heroEyebrow: "Flota privada · Marbella y Puerto Banús",
    heroTitle: <>El coche también<br /><em>forma parte de la historia.</em></>,
    heroCopy: "Veintiún coches excepcionales, entregados en tu hotel, villa, yate o terminal, con un concierge ocupándose de cada detalle.",
    explore: "Explorar la colección",
    story: "Descubrir la experiencia Five Star",
    stats: ["Vehículos excepcionales", "Concierge personal", "Idiomas disponibles"],
    scroll: "Descubrir Five Star",
    marques: "Marcas seleccionadas",
    aboutEyebrow: "Nacido en Marbella",
    aboutTitle: <>No es solo alquilar.<br /><em>Es otra forma de llegar.</em></>,
    aboutOne: "Five Star cuida la parte que muchas empresas de alquiler olvidan: cómo se siente toda la experiencia. La entrega, el horario, los detalles y la tranquilidad de saber que todo está resuelto.",
    aboutTwo: "Aterrices en Málaga, salgas de una villa en Benahavís o bajes de un yate en Puerto Banús, el coche debe sentirse como si siempre hubiera estado esperándote.",
    collection: "La colección",
    collectionTitle: <>Elige el coche.<br /><em>Nosotros hacemos el resto.</em></>,
    collectionCopy: "Una colección elegida con intención: superdeportivos para la ocasión, GT para recorrer la costa y SUV que convierten cada llegada en algo especial.",
    vehicles: "vehículos",
    from: "Desde",
    day: "/ día",
    seats: "plazas",
    all: "Ver la flota completa",
    curated: "Mostrar selección curada",
    experience: "El estándar Five Star",
    experienceTitle: <>Lujo es cuando<br /><em>nada resulta difícil.</em></>,
    experienceCopy: "Sin colas, mostradores ni cambios de interlocutor. Desde el primer mensaje hasta la recogida final, un concierge coordina toda la experiencia alrededor de ti.",
    experienceCaption: "Preparado, detallado y revisado antes de cada entrega.",
    experiencePoints: [
      ["Concierge personal", "Un único contacto disponible 24/7 en inglés, francés, alemán, neerlandés y español."],
      ["Entrega donde estés", "El coche llega repostado y detallado a tu hotel, villa, yate, terminal o aviación privada."],
      ["El vehículo exacto", "El modelo que eliges es el que conduces. Sin sustituciones ni sorpresas de última hora."],
      ["Discreción de serie", "Un servicio tranquilo y cuidado para clientes que valoran la privacidad tanto como las prestaciones."],
    ],
    delivery: "Entregado a tu medida",
    deliveryTitle: <>Tu coche esperando<br /><em>donde tú llegas.</em></>,
    deliveryCopy: "Entrega gratuita en Marbella y Puerto Banús, además de entregas personalizadas en la Costa del Sol y el aeropuerto de Málaga. Trabajamos alrededor de tu itinerario, no de un mostrador.",
    planDelivery: "Planificar la entrega",
    base: "Base Five Star · Abierto 24/7",
    openMaps: "Abrir en Google Maps",
    reviewLabel: "Experiencia de cliente",
    reviewQuote: "Los coches están impecables, el equipo escucha y todo el servicio se siente realmente VIP.",
    reviewMeta: "Cliente reciente de Five Star · Marbella",
    booking: "Empieza tu viaje",
    bookingTitle: <>Cuéntanos el plan.<br /><em>Nosotros lo hacemos realidad.</em></>,
    bookingCopy: "Envíanos lo esencial y continúa directamente con el concierge por WhatsApp. Estamos disponibles las 24 horas.",
    vehicle: "Elige un vehículo",
    location: "Lugar de entrega",
    dateFrom: "Desde",
    dateTo: "Hasta",
    whatsapp: "Continuar por WhatsApp",
    response: "Concierge directo · Disponible 24/7",
    footerTitle: <>Nacido en Marbella.<br />Creado para <em>el momento.</em></>,
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
    const message =
      language === "EN"
        ? `Hello Five Star Rentals, I am interested in the ${bookingVehicle}. I would like delivery to ${location} from ${startDate} to ${endDate}.`
        : `Hola Five Star Rentals, me interesa el ${bookingVehicle}. Me gustaría recibirlo en ${location} del ${startDate} al ${endDate}.`;
    return `https://wa.me/34622897184?text=${encodeURIComponent(message)}`;
  }, [bookingVehicle, location, startDate, endDate, language]);

  const switchLanguage = () => setLanguage((current) => (current === "EN" ? "ES" : "EN"));
  const resultCount = category === "All" ? fleet.length : fleet.filter((car) => car.category === category).length;

  return (
    <main className="public-site">
      <header className={`public-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="fs-brand" href="#top" aria-label="Five Star Rentals home">
          <BrandLogo priority />
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
          src="https://fivestars-rental.com/assets/images/hero-bg.jpg"
          alt="Lamborghini Urus by Five Star Rentals in Marbella"
          fill
          priority
          sizes="100vw"
          className="luxury-hero-image"
        />
        <div className="hero-overlay" />
        <div className="film-grain" />
        <div className="hero-edition">MARBELLA · 2026</div>
        <div className="luxury-hero-content">
          <p className="micro-label hero-enter-1"><span />{t.heroEyebrow}</p>
          <h1 className="hero-enter-2">{t.heroTitle}</h1>
          <p className="hero-lead hero-enter-3">{t.heroCopy}</p>
          <div className="hero-ctas hero-enter-4">
            <Link className="solid-button light" href="#fleet">{t.explore}<ArrowRight /></Link>
            <Link className="quiet-link" href="#experience">{t.story}<ArrowUpRight /></Link>
          </div>
        </div>
        <div className="hero-caption">
          <span>01 / 21</span>
          <div><b>Lamborghini Urus S</b><small>Blu Eleos · Marbella</small></div>
        </div>
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

      <section className="editorial-intro reveal" id="about">
        <div className="editorial-number">01</div>
        <div>
          <p className="micro-label dark"><span />{t.aboutEyebrow}</p>
          <h2>{t.aboutTitle}</h2>
        </div>
        <div className="editorial-aside">
          <p>{t.aboutOne}</p>
          <p>{t.aboutTwo}</p>
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
          <span>{resultCount} {t.vehicles}</span>
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
                <div className="premium-card-specs"><span>{car.hp} HP</span><span>{car.acceleration} 0–100</span><span>{car.seats} {t.seats}</span></div>
              </div>
              <div className="premium-card-price"><small>{t.from}</small><b>{formatEuro(car.price)}</b><span>{t.day}</span></div>
              <span className="circular-arrow"><ArrowRight /></span>
            </Link>
          ))}
        </div>

        {resultCount > 6 && (
          <button className="fleet-expand" type="button" onClick={() => setShowAll(!showAll)}>
            {showAll ? t.curated : t.all}<span>{showAll ? "−" : "+"}</span>
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
          <div className="experience-image-caption"><span>01</span><p>{t.experienceCaption}</p></div>
        </div>
        <div className="experience-content reveal">
          <p className="micro-label"><span />{t.experience}</p>
          <h2>{t.experienceTitle}</h2>
          <p className="experience-lead">{t.experienceCopy}</p>
          <div className="experience-points">
            {t.experiencePoints.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="delivery-section" id="delivery">
        <div className="delivery-copy reveal">
          <p className="micro-label dark"><span />{t.delivery}</p>
          <h2>{t.deliveryTitle}</h2>
          <p>{t.deliveryCopy}</p>
          <Link className="underlined-action" href="#booking">{t.planDelivery}<ArrowRight /></Link>
        </div>
        <div className="delivery-map reveal">
          <iframe
            title="Five Star Rentals at Parking Mathilda, Puerto Banús"
            src="https://www.google.com/maps?q=Parking%20Mathilda%2C%20Av.%20de%20Lola%20Flores%2C%20Puerto%20Ban%C3%BAs%2C%20Marbella&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-location-card">
            <span>{t.base}</span>
            <h3>Parking Mathilda</h3>
            <p>Av. de Lola Flores, s/n<br />29660 Puerto Banús, Marbella</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Parking%20Mathilda%2C%20Av.%20de%20Lola%20Flores%2C%20Puerto%20Ban%C3%BAs%2C%20Marbella" target="_blank" rel="noreferrer">
              {t.openMaps}<ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-score"><b>4.9</b><span>38+ Google reviews</span></div>
        <div className="testimonial-copy reveal">
          <p className="micro-label dark"><span />{t.reviewLabel}</p>
          <blockquote>“{t.reviewQuote}”</blockquote>
          <div className="testimonial-meta"><span>{t.reviewMeta}</span></div>
        </div>
      </section>

      <section className="booking-section" id="booking">
        <div className="booking-title reveal">
          <p className="micro-label"><span />{t.booking}</p>
          <h2>{t.bookingTitle}</h2>
          <p>{t.bookingCopy}</p>
        </div>
        <div className="booking-panel reveal">
          <label>
            <span>{t.vehicle}</span>
            <select value={bookingVehicle} onChange={(event) => setBookingVehicle(event.target.value)}>
              {fleet.map((car) => <option key={car.slug}>{car.brand} {car.shortModel}</option>)}
              <option>{language === "EN" ? "Let the concierge advise me" : "Prefiero que me asesore el concierge"}</option>
            </select>
            <ChevronDown />
          </label>
          <label>
            <span>{t.location}</span>
            <select value={location} onChange={(event) => setLocation(event.target.value)}>
              <option>Puerto Banús</option><option>Marbella</option><option>Málaga Airport</option><option>{language === "EN" ? "My hotel or villa" : "Mi hotel o villa"}</option>
            </select>
            <ChevronDown />
          </label>
          <label>
            <span>{t.dateFrom}</span>
            <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </label>
          <label>
            <span>{t.dateTo}</span>
            <input type="date" value={endDate} min={startDate} onChange={(event) => setEndDate(event.target.value)} />
          </label>
          <a className="whatsapp-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            <WhatsApp />{t.whatsapp}<ArrowRight />
          </a>
          <p>{t.response}</p>
        </div>
      </section>

      <footer className="public-footer">
        <div className="footer-statement">
          <BrandLogo />
          <h2>{t.footerTitle}</h2>
        </div>
        <div className="footer-details">
          <div><small>{t.exploreFooter}</small><Link href="#fleet">{t.nav[0]}</Link><Link href="#experience">{t.nav[1]}</Link><Link href="#delivery">{t.nav[2]}</Link><Link href="/studio">{t.owner}</Link></div>
          <div><small>{t.contact}</small><a href="https://wa.me/34622897184">+34 622 897 184</a><a href="mailto:hello@fivestar-rentals.com">hello@fivestar-rentals.com</a><span>24/7 concierge</span></div>
          <div><small>{t.visit}</small><span>Parking Mathilda</span><span>Puerto Banús</span><span>29660 Marbella, Málaga</span></div>
        </div>
        <div className="footer-legal"><span>© 2026 Five Star Rentals</span><span>Concept and technology by Archic</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/legal">Legal</Link></div></div>
      </footer>

      <a className="floating-concierge" href="https://wa.me/34622897184" target="_blank" rel="noreferrer" aria-label="Contact Five Star Rentals concierge on WhatsApp">
        <WhatsApp /><span>Concierge</span>
      </a>

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
