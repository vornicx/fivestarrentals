"use client";

import { useEffect, useState } from "react";

const fleetCars = [
  { brand: "Lamborghini", model: "Urus S", year: "2024", price: "1,200", hp: "666", seats: "5", acceleration: "3.5s", category: "Super SUV", image: "https://fivestars-rental.com/assets/images/fleet/lamborghini-urus-s/main.webp", position: "center 58%" },
  { brand: "Aston Martin", model: "DBS Superleggera", year: "2020", price: "1,500", hp: "725", seats: "2", acceleration: "3.4s", category: "Grand Tourer", image: "https://fivestars-rental.com/assets/images/fleet/aston-martin-dbs-superleggera/main.webp", position: "center 56%" },
  { brand: "Porsche", model: "911 GT3", year: "2022", price: "1,000", hp: "510", seats: "2", acceleration: "3.4s", category: "Sports car", image: "https://fivestars-rental.com/assets/images/fleet/porsche-911-gt3-992/main.webp", position: "center 54%" },
  { brand: "Mercedes-AMG", model: "G63 Brabus Kit", year: "2021", price: "1,100", hp: "585", seats: "5", acceleration: "4.5s", category: "Super SUV", image: "https://fivestars-rental.com/assets/images/fleet/g63-brabus-kit/main.webp", position: "center 54%" },
  { brand: "BMW", model: "M5 Touring G99", year: "2025", price: "750", hp: "727", seats: "5", acceleration: "3.6s", category: "Grand Tourer", image: "https://fivestars-rental.com/assets/images/fleet/bmw-m5-touring-2025/main.webp", position: "center 54%" },
  { brand: "Mercedes-AMG", model: "SL 55 Roadster", year: "2023", price: "550", hp: "476", seats: "4", acceleration: "3.9s", category: "Convertible", image: "https://fivestars-rental.com/assets/images/fleet/mercedes-amg-sl55-cabriolet/main.webp", position: "center 56%" },
];

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}

function MenuIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>;
}

function CloseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>;
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4A8 8 0 1 1 20 11.7Z" /><path d="M9 8.5c.5 2.8 2 4.3 4.7 5.1" /></svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedCar, setSelectedCar] = useState<(typeof fleetCars)[number] | null>(null);
  const [controlOpen, setControlOpen] = useState(false);
  const [bookingCar, setBookingCar] = useState("Lamborghini Urus S");
  const [pickup, setPickup] = useState("Puerto Banús");
  const [dates, setDates] = useState("18–21 Aug");
  const categories = ["All", "Sports car", "Super SUV", "Grand Tourer", "Convertible"];
  const displayedCars = filter === "All" ? fleetCars : fleetCars.filter((car) => car.category === filter);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Five Star Rentals home">
          <span className="brand-mark">5</span>
          <span className="brand-type"><b>Five Star</b><small>Rentals</small></span>
        </a>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
          <a href="#collection" onClick={() => setMenuOpen(false)}>The fleet</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#delivery" onClick={() => setMenuOpen(false)}>Delivery</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
        </nav>
        <div className="header-actions">
          <button className="language" type="button" aria-label="Select language">EN <span>⌄</span></button>
          <a className="header-cta" href="#reserve">Request a car <ArrowIcon /></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><MenuIcon /></button>
        </div>
      </header>

      <section className="hero" id="top">
        <img className="hero-image" src="https://fivestars-rental.com/assets/images/fleet/lamborghini-urus-s/main.webp" alt="Blue Lamborghini Urus S from Five Star Rentals in Marbella" />
        <div className="hero-shade" />
        <div className="hero-grain" />
        <div className="hero-content">
          <p className="eyebrow reveal-1">Marbella · Puerto Banús · Costa del Sol</p>
          <h1 className="reveal-2">Drive beyond<br /><em>expectation.</em></h1>
          <p className="hero-copy reveal-3">Exceptional cars. Personal delivery. A concierge who answers before you need to ask.</p>
          <div className="hero-actions reveal-4">
            <a className="button button-light" href="#collection">Explore the fleet <ArrowIcon /></a>
            <a className="text-link" href="#experience">Discover the experience <span>↘</span></a>
          </div>
        </div>
        <div className="hero-meta">
          <div><strong>21</strong><span>Exceptional vehicles</span></div>
          <div><strong>24/7</strong><span>Personal concierge</span></div>
          <div><strong>4.9</strong><span>Guest rating</span></div>
        </div>
        <div className="scroll-cue"><span /> Scroll to discover</div>
      </section>

      <section className="collection" id="collection">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">A considered collection</p>
            <h2>Choose your<br /><em>next memory.</em></h2>
          </div>
          <div className="heading-aside">
            <p>Hand-picked performance, grand touring and luxury SUVs. Every car is delivered immaculate, fuelled and ready.</p>
            <a className="underlined-link" href="#all-fleet">View all 21 vehicles <ArrowIcon /></a>
          </div>
        </div>

        <div className="fleet-filters" aria-label="Filter fleet">
          {categories.map((category) => <button type="button" className={filter === category ? "active" : ""} onClick={() => setFilter(category)} key={category}>{category}</button>)}
        </div>
        <div className="car-grid">
          {displayedCars.map((car, index) => (
            <article className={`car-card ${index === 0 ? "car-card-wide" : ""}`} key={car.model}>
              <img src={car.image} alt={`${car.brand} ${car.model}`} style={{ objectPosition: car.position }} />
              <div className="car-overlay" />
              <div className="car-index">0{index + 1}</div>
              <div className="car-tag">{car.category}</div>
              <div className="car-content">
                <p>{car.brand} · {car.year}</p>
                <h3>{car.model}</h3>
                <div className="car-specs">
                  <span><b>{car.hp}</b> HP</span>
                  <span><b>{car.acceleration}</b> 0–100</span>
                  <span><b>{car.seats}</b> seats</span>
                </div>
              </div>
              <div className="car-price"><small>From</small><strong>€{car.price}</strong><span>/ day</span></div>
              <button className="round-link" type="button" onClick={() => setSelectedCar(car)} aria-label={`View ${car.model}`}><ArrowIcon /></button>
            </article>
          ))}
        </div>
      </section>

      <section className="marquee" aria-hidden="true">
        <div>MARBELLA <i /> PUERTO BANÚS <i /> COSTA DEL SOL <i /> MÁLAGA AIRPORT <i /> MARBELLA <i /> PUERTO BANÚS</div>
      </section>

      <section className="experience" id="experience">
        <div className="experience-visual">
          <img src="https://fivestars-rental.com/assets/images/fleet/aston-martin-dbs-superleggera/front-three-quarter.webp" alt="Aston Martin DBS Superleggera prepared by Five Star Rentals" />
          <div className="experience-caption"><span>01</span><p>Every handover is considered down to the last detail.</p></div>
        </div>
        <div className="experience-copy">
          <p className="eyebrow">Beyond the keys</p>
          <h2>Luxury is when<br /><em>nothing feels difficult.</em></h2>
          <p className="lead">Tell us where you will be. We take care of everything else — preparation, delivery, collection and every detail between.</p>
          <div className="service-list">
            <article><span>01</span><div><h3>Personal concierge</h3><p>A single point of contact, available around the clock in five languages.</p></div></article>
            <article><span>02</span><div><h3>Delivered to you</h3><p>Airport, hotel, villa or yacht. Your car arrives immaculate and ready.</p></div></article>
            <article><span>03</span><div><h3>Exactly your car</h3><p>The model you choose is the model you drive. No queues and no substitutions.</p></div></article>
          </div>
        </div>
      </section>

      <section className="delivery" id="delivery">
        <div className="delivery-copy">
          <p className="eyebrow dark">Made for your arrival</p>
          <h2>From runway<br />to <em>open road.</em></h2>
          <p>Private aviation, Málaga Airport, your villa or the marina. We coordinate the handover around your itinerary, not the other way around.</p>
        </div>
        <div className="delivery-map" aria-label="Delivery locations illustration">
          <div className="coast-line" />
          <div className="map-point point-one"><i /><b>Málaga Airport</b><span>Private aviation · AGP</span></div>
          <div className="map-point point-two"><i /><b>Marbella</b><span>Hotels · Villas</span></div>
          <div className="map-point point-three"><i /><b>Puerto Banús</b><span>Marina · Collection</span></div>
          <p>Costa del Sol</p>
        </div>
      </section>

      <section className="control-teaser">
        <div>
          <p className="eyebrow">Five Star Owner Control</p>
          <h2>Every vehicle.<br /><em>One clear view.</em></h2>
          <p>A tailored workspace to update the fleet, control availability and respond to every enquiry without depending on a developer.</p>
          <button className="button button-champagne" type="button" onClick={() => setControlOpen(true)}>Open management demo <ArrowIcon /></button>
        </div>
        <div className="control-preview">
          <div className="preview-top"><span>Five Star Control</span><i /><i /><i /></div>
          <div className="preview-body">
            <aside><b>Overview</b><span>Fleet</span><span>Enquiries</span><span>Clients</span></aside>
            <div>
              <p>Today, 15 August</p><h3>Good afternoon.</h3>
              <div className="mini-kpis"><article><small>Available</small><strong>16</strong></article><article><small>On hire</small><strong>5</strong></article><article><small>New enquiries</small><strong>8</strong></article></div>
              <div className="mini-table"><span>Latest fleet status</span>{fleetCars.slice(0,3).map((car, i) => <p key={car.model}><img src={car.image} alt="" /><b>{car.model}</b><i className={i === 1 ? "busy" : ""} />{i === 1 ? "On hire" : "Available"}</p>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="reserve" id="reserve">
        <div className="reserve-intro">
          <p className="eyebrow">Your next drive</p>
          <h2>Tell us the plan.<br /><em>We will make it happen.</em></h2>
        </div>
        <div className="reserve-form">
          <label>Choose a car<select value={bookingCar} onChange={(event) => setBookingCar(event.target.value)}><option>Lamborghini Urus S</option><option>Aston Martin DBS Superleggera</option><option>Porsche 911 GT3</option><option>Mercedes-AMG G63 Brabus</option><option>Let the concierge advise me</option></select></label>
          <label>Delivery location<select value={pickup} onChange={(event) => setPickup(event.target.value)}><option>Puerto Banús</option><option>Marbella</option><option>Málaga Airport</option><option>My villa or hotel</option></select></label>
          <label>Rental dates<input value={dates} onChange={(event) => setDates(event.target.value)} aria-label="Rental dates" /></label>
          <a className="whatsapp-button" href={`https://wa.me/34622897184?text=${encodeURIComponent(`Hello Five Star Rentals, I am interested in the ${bookingCar}. I would like delivery to ${pickup} for ${dates}.`)}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> Continue on WhatsApp <ArrowIcon /></a>
          <p>Average response time under 5 minutes · Available 24/7</p>
        </div>
      </section>

      <footer id="story">
        <div className="footer-brand"><span className="brand-mark">5</span><h2>Born in Marbella.<br />Built for <em>legends.</em></h2></div>
        <div className="footer-columns">
          <div><small>Explore</small><a href="#collection">The fleet</a><a href="#experience">Experience</a><a href="#delivery">Delivery</a></div>
          <div><small>Contact</small><a href="https://wa.me/34622897184">+34 622 897 184</a><a href="mailto:hello@fivestar-rentals.com">hello@fivestar-rentals.com</a><span>24/7 concierge</span></div>
          <div><small>Visit</small><span>Parking Mathilda</span><span>Puerto Banús</span><span>29660 Marbella</span></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Five Star Rentals</span><span>Concept by Archic</span><div><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Legal</a></div></div>
      </footer>
    </main>

    {selectedCar && (
      <div className="car-modal" role="dialog" aria-modal="true" aria-label={selectedCar.model}>
        <button className="modal-close" type="button" onClick={() => setSelectedCar(null)} aria-label="Close car details"><CloseIcon /></button>
        <div className="modal-image"><img src={selectedCar.image} alt={`${selectedCar.brand} ${selectedCar.model}`} /><span>{selectedCar.category}</span></div>
        <div className="modal-copy">
          <p className="eyebrow dark">{selectedCar.brand} · {selectedCar.year}</p>
          <h2>{selectedCar.model}</h2>
          <p>An exceptional expression of performance and presence, prepared to Five Star standards and personally delivered anywhere on the Costa del Sol.</p>
          <div className="modal-specs"><div><strong>{selectedCar.hp}</strong><small>Horsepower</small></div><div><strong>{selectedCar.acceleration}</strong><small>0–100 km/h</small></div><div><strong>{selectedCar.seats}</strong><small>Seats</small></div></div>
          <div className="modal-price"><span>From</span><strong>€{selectedCar.price}</strong><small>per day</small></div>
          <a className="button button-dark" href={`https://wa.me/34622897184?text=${encodeURIComponent(`Hello Five Star Rentals, I am interested in the ${selectedCar.brand} ${selectedCar.model}.`)}`} target="_blank" rel="noreferrer">Request this car <ArrowIcon /></a>
        </div>
      </div>
    )}

    {controlOpen && (
      <div className="control-modal" role="dialog" aria-modal="true" aria-label="Five Star Owner Control demo">
        <aside className="control-sidebar">
          <div className="control-logo"><span className="brand-mark">5</span><div><b>Five Star</b><small>Owner Control</small></div></div>
          <nav><button className="active">Overview</button><button>Fleet</button><button>Enquiries <i>8</i></button><button>Calendar</button><button>Clients</button></nav>
          <button className="control-exit" type="button" onClick={() => setControlOpen(false)}><CloseIcon /> Exit demo</button>
        </aside>
        <div className="control-main">
          <header><div><p>Saturday, 15 August</p><h2>Good afternoon.</h2></div><div className="manager"><span>FS</span><div><b>Five Star Rentals</b><small>Administrator</small></div></div></header>
          <section className="control-kpis"><article><small>Available today</small><strong>16</strong><span>of 21 vehicles</span></article><article><small>Currently on hire</small><strong>5</strong><span>€12,850 active value</span></article><article><small>New enquiries</small><strong>8</strong><span>3 awaiting response</span></article><article><small>This month</small><strong>€84.2k</strong><span className="positive">+18.4%</span></article></section>
          <div className="control-grid">
            <section className="fleet-table">
              <div className="panel-title"><div><p>Fleet overview</p><h3>Live vehicle status</h3></div><button type="button">Manage fleet <ArrowIcon /></button></div>
              {fleetCars.map((car, index) => <article key={car.model}><img src={car.image} alt="" /><div><b>{car.model}</b><span>{car.brand} · {car.year}</span></div><strong>€{car.price}<small>/day</small></strong><span className={index === 1 || index === 4 ? "status hired" : "status"}>{index === 1 || index === 4 ? "On hire" : "Available"}</span><button type="button">•••</button></article>)}
            </section>
            <section className="enquiry-panel">
              <div className="panel-title"><div><p>Enquiries</p><h3>Needs attention</h3></div><span>8 new</span></div>
              <article><span>TM</span><div><b>Thomas Meyer</b><small>Lamborghini Urus S · 18–21 Aug</small></div><i>2m</i></article>
              <article><span>AR</span><div><b>Amelia Rossi</b><small>Porsche 911 GT3 · 22–25 Aug</small></div><i>18m</i></article>
              <article><span>JB</span><div><b>James Brown</b><small>G63 Brabus · Airport delivery</small></div><i>1h</i></article>
              <button type="button">View all enquiries <ArrowIcon /></button>
            </section>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
