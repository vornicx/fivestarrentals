"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Calendar,
  Car,
  Check,
  ChevronDown,
  Clock,
  Close,
  Edit,
  Inbox,
  LayoutDashboard,
  LogOut,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sliders,
  TrendingUp,
  Users,
} from "../_components/icons";
import BrandLogo from "../_components/brand-logo";
import {
  clients,
  fleet,
  formatEuro,
  initialEnquiries,
  type Enquiry,
  type EnquiryStatus,
  type Vehicle,
} from "../_data/fleet";

type View = "overview" | "fleet" | "enquiries" | "calendar" | "clients" | "settings";
type Availability = "Available" | "On hire" | "Reserved" | "Service";
type ManagedVehicle = Vehicle & { availability: Availability; currentPrice: number };

const initialManagedFleet: ManagedVehicle[] = fleet.map((vehicle, index) => ({
  ...vehicle,
  currentPrice: vehicle.price,
  availability:
    index === 1 || index === 6 || index === 13
      ? "On hire"
      : index === 2 || index === 8
        ? "Reserved"
        : index === 15
          ? "Service"
          : "Available",
}));

const navigation: Array<{ id: View; label: string; icon: typeof LayoutDashboard }> = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "fleet", label: "Fleet", icon: Car },
  { id: "enquiries", label: "Enquiries", icon: Inbox },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "clients", label: "Clients", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

const viewTitles: Record<View, { kicker: string; title: string }> = {
  overview: { kicker: "Saturday, 15 August", title: "Good afternoon." },
  fleet: { kicker: "Fleet management", title: "Your collection." },
  enquiries: { kicker: "Sales pipeline", title: "Client enquiries." },
  calendar: { kicker: "18–24 August", title: "Rental calendar." },
  clients: { kicker: "Client relationships", title: "Your guests." },
  settings: { kicker: "Business configuration", title: "Five Star settings." },
};

const calendarDays = [
  { day: "Mon", date: 18 },
  { day: "Tue", date: 19 },
  { day: "Wed", date: 20 },
  { day: "Thu", date: 21 },
  { day: "Fri", date: 22 },
  { day: "Sat", date: 23 },
  { day: "Sun", date: 24 },
];

export default function StudioClient() {
  const [view, setView] = useState<View>("overview");
  const [managedFleet, setManagedFleet] = useState<ManagedVehicle[]>(initialManagedFleet);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [fleetSearch, setFleetSearch] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<ManagedVehicle | null>(null);
  const [newBookingOpen, setNewBookingOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const savedFleet = localStorage.getItem("five-star-managed-fleet");
    const savedEnquiries = localStorage.getItem("five-star-enquiries");
    if (savedFleet) setManagedFleet(JSON.parse(savedFleet) as ManagedVehicle[]);
    if (savedEnquiries) setEnquiries(JSON.parse(savedEnquiries) as Enquiry[]);
  }, []);

  useEffect(() => {
    localStorage.setItem("five-star-managed-fleet", JSON.stringify(managedFleet));
  }, [managedFleet]);

  useEffect(() => {
    localStorage.setItem("five-star-enquiries", JSON.stringify(enquiries));
  }, [enquiries]);

  const availableCount = managedFleet.filter((vehicle) => vehicle.availability === "Available").length;
  const onHire = managedFleet.filter((vehicle) => vehicle.availability === "On hire");
  const newEnquiries = enquiries.filter((enquiry) => enquiry.status === "New");
  const activeValue = onHire.reduce((total, vehicle) => total + vehicle.currentPrice * 3, 0);
  const filteredFleet = useMemo(() => {
    const query = fleetSearch.trim().toLowerCase();
    if (!query) return managedFleet;
    return managedFleet.filter((vehicle) =>
      `${vehicle.brand} ${vehicle.model} ${vehicle.category} ${vehicle.availability}`.toLowerCase().includes(query),
    );
  }, [fleetSearch, managedFleet]);

  const updateVehicle = (slug: string, update: Partial<ManagedVehicle>) => {
    setManagedFleet((current) =>
      current.map((vehicle) => (vehicle.slug === slug ? { ...vehicle, ...update } : vehicle)),
    );
    setSelectedVehicle((current) => (current?.slug === slug ? { ...current, ...update } : current));
    flashSaved();
  };

  const updateEnquiry = (id: string, status: EnquiryStatus) => {
    setEnquiries((current) => current.map((enquiry) => (enquiry.id === id ? { ...enquiry, status } : enquiry)));
    flashSaved();
  };

  const flashSaved = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const changeView = (next: View) => {
    setView(next);
    setMobileNavOpen(false);
  };

  return (
    <main className="studio-shell">
      <aside className={`studio-sidebar ${mobileNavOpen ? "is-open" : ""}`}>
        <div className="studio-logo">
          <span className="studio-logo-art"><BrandLogo priority /></span>
          <small>Owner Control</small>
        </div>
        <nav aria-label="Owner Control navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button className={view === item.id ? "active" : ""} type="button" onClick={() => changeView(item.id)} key={item.id}>
                <Icon /><span>{item.label}</span>
                {item.id === "enquiries" && newEnquiries.length > 0 && <i>{newEnquiries.length}</i>}
              </button>
            );
          })}
        </nav>
        <div className="studio-sidebar-footer">
          <div className="studio-health"><i /><div><b>All systems operational</b><span>Updated just now</span></div></div>
          <Link href="/"><LogOut /><span>Return to website</span></Link>
        </div>
      </aside>

      <section className="studio-main">
        <header className="studio-header">
          <button className="studio-mobile-menu" type="button" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Toggle navigation">
            <Sliders />
          </button>
          <div>
            <p>{viewTitles[view].kicker}</p>
            <h1>{viewTitles[view].title}</h1>
          </div>
          <div className="studio-header-actions">
            {saved && <span className="saved-indicator"><Check />Saved</span>}
            <button className="notification-button" type="button" aria-label="Notifications"><Bell /><i /></button>
            <div className="studio-manager"><span>FS</span><div><b>Five Star Rentals</b><small>Administrator</small></div><ChevronDown /></div>
          </div>
        </header>

        {view === "overview" && (
          <div className="studio-view">
            <section className="studio-kpis">
              <article><div><small>Available today</small><Car /></div><strong>{availableCount}</strong><p>of {managedFleet.length} vehicles</p><span className="kpi-note positive"><TrendingUp />2 more than yesterday</span></article>
              <article><div><small>Currently on hire</small><Clock /></div><strong>{onHire.length}</strong><p>{formatEuro(activeValue)} active value</p><span className="kpi-note">Next return at 17:30</span></article>
              <article><div><small>New enquiries</small><Inbox /></div><strong>{newEnquiries.length}</strong><p>{newEnquiries.filter((item) => item.received.includes("min")).length} received in the last hour</p><span className="kpi-note attention">Needs your attention</span></article>
              <article><div><small>August revenue</small><TrendingUp /></div><strong>€84.2k</strong><p>€112k projected</p><span className="kpi-note positive"><TrendingUp />18.4% vs July</span></article>
            </section>

            <section className="studio-overview-grid">
              <div className="studio-panel fleet-overview">
                <PanelHeading kicker="Fleet overview" title="Live vehicle status" action="Manage fleet" onAction={() => changeView("fleet")} />
                <div className="studio-table-head"><span>Vehicle</span><span>Rate</span><span>Status</span><span>Next action</span><span /></div>
                {managedFleet.slice(0, 7).map((vehicle) => (
                  <button className="studio-fleet-row" type="button" onClick={() => setSelectedVehicle(vehicle)} key={vehicle.slug}>
                    <span className="fleet-row-car"><Image src={vehicle.image} alt="" width={74} height={48} /><span><b>{vehicle.shortModel}</b><small>{vehicle.brand} · {vehicle.year}</small></span></span>
                    <strong>{formatEuro(vehicle.currentPrice)}<small>/day</small></strong>
                    <StatusBadge status={vehicle.availability} />
                    <span className="next-action">{vehicle.availability === "On hire" ? "Return today · 17:30" : vehicle.availability === "Service" ? "Workshop · 19 Aug" : "Ready to book"}</span>
                    <MoreHorizontal />
                  </button>
                ))}
              </div>

              <div className="studio-panel needs-attention">
                <PanelHeading kicker="Enquiries" title="Needs attention" badge={`${newEnquiries.length} new`} />
                {enquiries.slice(0, 4).map((enquiry) => (
                  <article key={enquiry.id}>
                    <span className="client-avatar">{enquiry.initials}</span>
                    <div><b>{enquiry.client}</b><small>{enquiry.vehicle} · {enquiry.dates}</small><p>{enquiry.delivery}</p></div>
                    <i>{enquiry.received}</i>
                  </article>
                ))}
                <button className="panel-full-action" type="button" onClick={() => changeView("enquiries")}>View all enquiries<span>→</span></button>
              </div>
            </section>

            <section className="studio-bottom-grid">
              <div className="studio-panel today-panel">
                <PanelHeading kicker="Today" title="Handover schedule" badge="4 movements" />
                <div className="movement"><time>10:30</time><i className="complete" /><div><b>Vehicle returned</b><span>Mercedes-AMG G63 · Puente Romano</span></div><small>Complete</small></div>
                <div className="movement"><time>14:00</time><i /><div><b>Delivery · Thomas Meyer</b><span>Lamborghini Urus S · Marbella Club</span></div><small>In preparation</small></div>
                <div className="movement"><time>17:30</time><i /><div><b>Vehicle return · James Brown</b><span>G63 Brabus · Málaga Airport</span></div><small>Upcoming</small></div>
              </div>
              <div className="studio-panel revenue-panel">
                <PanelHeading kicker="Performance" title="Revenue trend" badge="+18.4%" />
                <div className="bar-chart" aria-label="Revenue trend from March to August">
                  {[42, 54, 49, 68, 72, 91].map((height, index) => <i style={{ height: `${height}%` }} key={height}><span>{["Mar","Apr","May","Jun","Jul","Aug"][index]}</span></i>)}
                </div>
              </div>
            </section>
          </div>
        )}

        {view === "fleet" && (
          <div className="studio-view">
            <div className="view-toolbar">
              <label className="studio-search"><Search /><input value={fleetSearch} onChange={(event) => setFleetSearch(event.target.value)} placeholder="Search vehicle, category or status" /></label>
              <button className="secondary-action" type="button"><Sliders />Filters</button>
              <button className="primary-action" type="button" onClick={() => setNewBookingOpen(true)}><Plus />New booking</button>
            </div>
            <section className="studio-panel fleet-management">
              <div className="management-head"><span>Vehicle</span><span>Category</span><span>Daily rate</span><span>Availability</span><span>Utilisation</span><span /></div>
              {filteredFleet.map((vehicle, index) => (
                <article key={vehicle.slug}>
                  <button className="vehicle-identity" type="button" onClick={() => setSelectedVehicle(vehicle)}><Image src={vehicle.image} alt="" width={88} height={58} /><span><b>{vehicle.shortModel}</b><small>{vehicle.brand} · {vehicle.year}</small></span></button>
                  <span>{vehicle.category}</span>
                  <label className="inline-price"><span>€</span><input type="number" value={vehicle.currentPrice} onChange={(event) => updateVehicle(vehicle.slug, { currentPrice: Number(event.target.value) })} /></label>
                  <label className="status-select"><i className={vehicle.availability.toLowerCase().replace(" ", "-")} /><select value={vehicle.availability} onChange={(event) => updateVehicle(vehicle.slug, { availability: event.target.value as Availability })}><option>Available</option><option>On hire</option><option>Reserved</option><option>Service</option></select><ChevronDown /></label>
                  <div className="utilisation"><span><i style={{ width: `${48 + ((index * 7) % 44)}%` }} /></span><b>{48 + ((index * 7) % 44)}%</b></div>
                  <button type="button" onClick={() => setSelectedVehicle(vehicle)} aria-label={`Edit ${vehicle.shortModel}`}><Edit /></button>
                </article>
              ))}
            </section>
          </div>
        )}

        {view === "enquiries" && (
          <div className="studio-view">
            <div className="view-toolbar">
              <label className="studio-search"><Search /><input placeholder="Search client or vehicle" /></label>
              <button className="secondary-action" type="button"><Sliders />This month</button>
              <button className="primary-action" type="button" onClick={() => setNewBookingOpen(true)}><Plus />New enquiry</button>
            </div>
            <section className="enquiry-summary">
              {(["New", "Contacted", "Quoted", "Confirmed"] as EnquiryStatus[]).map((status) => <article key={status}><small>{status}</small><strong>{enquiries.filter((item) => item.status === status).length}</strong><span>{formatEuro(enquiries.filter((item) => item.status === status).reduce((sum, item) => sum + item.value, 0))}</span></article>)}
            </section>
            <section className="studio-panel enquiry-table">
              <div className="enquiry-head"><span>Client</span><span>Request</span><span>Delivery</span><span>Value</span><span>Status</span><span /></div>
              {enquiries.map((enquiry) => (
                <article key={enquiry.id}>
                  <div className="enquiry-client"><span>{enquiry.initials}</span><div><b>{enquiry.client}</b><small>{enquiry.id} · {enquiry.received}</small></div></div>
                  <div><b>{enquiry.vehicle}</b><small>{enquiry.dates}</small></div>
                  <span>{enquiry.delivery}</span>
                  <strong>{formatEuro(enquiry.value)}</strong>
                  <label className="pipeline-select"><select value={enquiry.status} onChange={(event) => updateEnquiry(enquiry.id, event.target.value as EnquiryStatus)}><option>New</option><option>Contacted</option><option>Quoted</option><option>Confirmed</option></select><ChevronDown /></label>
                  <button type="button"><MoreHorizontal /></button>
                </article>
              ))}
            </section>
          </div>
        )}

        {view === "calendar" && (
          <div className="studio-view">
            <div className="view-toolbar calendar-toolbar">
              <div><button type="button">←</button><button type="button">Today</button><button type="button">→</button></div>
              <button className="secondary-action" type="button">Week view<ChevronDown /></button>
              <button className="primary-action" type="button" onClick={() => setNewBookingOpen(true)}><Plus />New booking</button>
            </div>
            <section className="studio-panel rental-calendar">
              <div className="calendar-grid">
                <div className="calendar-time-label">Vehicle</div>
                {calendarDays.map((day) => <div className={day.date === 21 ? "calendar-day active" : "calendar-day"} key={day.date}><span>{day.day}</span><b>{day.date}</b></div>)}
                {managedFleet.slice(0, 8).map((vehicle, vehicleIndex) => (
                  <div className="calendar-row" key={vehicle.slug}>
                    <div className="calendar-car"><Image src={vehicle.image} alt="" width={48} height={32} /><div><b>{vehicle.shortModel}</b><span>{vehicle.brand}</span></div></div>
                    {calendarDays.map((day, dayIndex) => {
                      const active = (vehicleIndex + dayIndex) % 5 < 2;
                      return <div className="calendar-cell" key={day.date}>{active && <span className={vehicleIndex % 3 === 0 ? "booking-block gold" : "booking-block"}>{dayIndex % 2 === 0 ? "On hire" : "Reserved"}</span>}</div>;
                    })}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {view === "clients" && (
          <div className="studio-view">
            <div className="view-toolbar">
              <label className="studio-search"><Search /><input placeholder="Search client, country or tier" /></label>
              <button className="secondary-action" type="button"><Sliders />Segments</button>
              <button className="primary-action" type="button"><Plus />Add client</button>
            </div>
            <section className="client-insights">
              <article><small>Total clients</small><strong>248</strong><span>+21 this month</span></article>
              <article><small>Returning clients</small><strong>64%</strong><span>Top 10% drive 41% revenue</span></article>
              <article><small>Average lifetime value</small><strong>€9.8k</strong><span>+€1.2k vs 2025</span></article>
            </section>
            <section className="studio-panel client-table">
              <div className="client-head"><span>Client</span><span>Country</span><span>Rentals</span><span>Lifetime spend</span><span>Last visit</span><span>Tier</span><span /></div>
              {clients.map((client) => (
                <article key={client.name}>
                  <div><span className="client-avatar">{client.initials}</span><b>{client.name}</b></div>
                  <span>{client.country}</span><strong>{client.rentals}</strong><strong>{formatEuro(client.spend)}</strong><span>{client.lastVisit}</span><em className={client.tier.toLowerCase()}>{client.tier}</em><button type="button"><MoreHorizontal /></button>
                </article>
              ))}
            </section>
          </div>
        )}

        {view === "settings" && (
          <div className="studio-view settings-view">
            <section className="studio-panel settings-card">
              <div><p>Business profile</p><h2>Five Star Rentals</h2><span>Public information displayed across the website and enquiry messages.</span></div>
              <label>Business name<input defaultValue="Five Star Rentals" /></label>
              <label>Primary location<input defaultValue="Parking Mathilda, Puerto Banús, Marbella" /></label>
              <label>WhatsApp<input defaultValue="+34 622 897 184" /></label>
              <label>Email<input defaultValue="hello@fivestar-rentals.com" /></label>
              <button className="primary-action" type="button" onClick={flashSaved}>Save profile</button>
            </section>
            <section className="studio-panel settings-card">
              <div><p>Rental defaults</p><h2>Operations</h2><span>Set the defaults used when new bookings and vehicles are created.</span></div>
              <label>Minimum rental<select defaultValue="1 day"><option>1 day</option><option>2 days</option><option>3 days</option></select></label>
              <label>Default deposit<input defaultValue="€5,000" /></label>
              <label>Included mileage<input defaultValue="150 km / day" /></label>
              <label className="toggle-setting"><span><b>Automatic WhatsApp message</b><small>Prepare a client-ready confirmation after a booking is created.</small></span><input type="checkbox" defaultChecked /></label>
              <button className="primary-action" type="button" onClick={flashSaved}>Save operations</button>
            </section>
          </div>
        )}
      </section>

      {selectedVehicle && (
        <div className="studio-drawer-backdrop" onClick={() => setSelectedVehicle(null)}>
          <aside className="studio-drawer" onClick={(event) => event.stopPropagation()}>
            <button className="drawer-close" type="button" onClick={() => setSelectedVehicle(null)} aria-label="Close vehicle editor"><Close /></button>
            <div className="drawer-image"><Image src={selectedVehicle.image} alt={selectedVehicle.model} fill sizes="420px" /></div>
            <div className="drawer-content">
              <p>{selectedVehicle.brand} · {selectedVehicle.year}</p><h2>{selectedVehicle.shortModel}</h2>
              <div className="drawer-stats"><span><b>{selectedVehicle.hp}</b> HP</span><span><b>{selectedVehicle.seats}</b> seats</span><span><b>{selectedVehicle.acceleration}</b> 0–100</span></div>
              <label>Availability<select value={selectedVehicle.availability} onChange={(event) => updateVehicle(selectedVehicle.slug, { availability: event.target.value as Availability })}><option>Available</option><option>On hire</option><option>Reserved</option><option>Service</option></select><ChevronDown /></label>
              <label>Daily rate<div><span>€</span><input type="number" value={selectedVehicle.currentPrice} onChange={(event) => updateVehicle(selectedVehicle.slug, { currentPrice: Number(event.target.value) })} /></div></label>
              <label>Internal note<textarea defaultValue="Prepared and ready at the Five Star base." /></label>
              <button className="primary-action drawer-save" type="button" onClick={() => { flashSaved(); setSelectedVehicle(null); }}><Check />Save changes</button>
              <Link href={`/fleet/${selectedVehicle.slug}`} target="_blank">View public vehicle page<span>↗</span></Link>
            </div>
          </aside>
        </div>
      )}

      {newBookingOpen && (
        <div className="studio-modal-backdrop">
          <form className="booking-modal" onSubmit={(event) => { event.preventDefault(); setNewBookingOpen(false); flashSaved(); }}>
            <button type="button" onClick={() => setNewBookingOpen(false)} aria-label="Close new booking"><Close /></button>
            <p>Quick action</p><h2>Create a booking</h2>
            <div className="modal-form-grid">
              <label>Client name<input placeholder="Full name" required /></label>
              <label>Vehicle<select defaultValue={fleet[1].shortModel}>{fleet.map((vehicle) => <option key={vehicle.slug}>{vehicle.shortModel}</option>)}</select><ChevronDown /></label>
              <label>Start date<input type="date" defaultValue="2026-08-18" /></label>
              <label>End date<input type="date" defaultValue="2026-08-21" /></label>
              <label>Delivery<input defaultValue="Puerto Banús" /></label>
              <label>Status<select defaultValue="Confirmed"><option>Pending</option><option>Confirmed</option></select><ChevronDown /></label>
            </div>
            <button className="primary-action" type="submit"><Check />Create booking</button>
          </form>
        </div>
      )}
    </main>
  );
}

function PanelHeading({ kicker, title, action, onAction, badge }: { kicker: string; title: string; action?: string; onAction?: () => void; badge?: string }) {
  return (
    <div className="panel-heading">
      <div><p>{kicker}</p><h2>{title}</h2></div>
      {action && <button type="button" onClick={onAction}>{action}<span>→</span></button>}
      {badge && <span>{badge}</span>}
    </div>
  );
}

function StatusBadge({ status }: { status: Availability }) {
  return <span className={`status-badge ${status.toLowerCase().replace(" ", "-")}`}><i />{status}</span>;
}
