export type VehicleCategory =
  | "Supercar"
  | "Luxury SUV"
  | "Grand Tourer"
  | "Convertible"
  | "Performance";

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  shortModel: string;
  year: number;
  price: number;
  weekPrice: number;
  monthPrice: number;
  hp: number;
  seats: number;
  acceleration: string;
  topSpeed: number;
  transmission: string;
  drivetrain: string;
  fuel: string;
  category: VehicleCategory;
  image: string;
  description: string;
  statement: string;
  featured?: boolean;
};

const image = (folder: string) =>
  `https://fivestars-rental.com/assets/images/fleet/${folder}/main.webp`;

export const fleet: Vehicle[] = [
  {
    slug: "aston-martin-dbs-superleggera",
    brand: "Aston Martin",
    model: "DBS Superleggera",
    shortModel: "DBS Superleggera",
    year: 2020,
    price: 1500,
    weekPrice: 9450,
    monthPrice: 33750,
    hp: 725,
    seats: 2,
    acceleration: "3.4 s",
    topSpeed: 340,
    transmission: "8-speed automatic",
    drivetrain: "RWD",
    fuel: "Petrol",
    category: "Supercar",
    image: image("aston-martin-dbs-superleggera"),
    description:
      "The ultimate British Super GT. A twin-turbo V12, carbon bodywork and effortless pace meet rare grand-touring elegance.",
    statement: "Regal elegance. Relentless performance.",
    featured: true,
  },
  {
    slug: "lamborghini-urus-s",
    brand: "Lamborghini",
    model: "Urus S Blu Eleos",
    shortModel: "Urus S",
    year: 2024,
    price: 1200,
    weekPrice: 7560,
    monthPrice: 27000,
    hp: 666,
    seats: 5,
    acceleration: "3.5 s",
    topSpeed: 305,
    transmission: "8-speed automatic",
    drivetrain: "AWD",
    fuel: "Petrol",
    category: "Luxury SUV",
    image: image("lamborghini-urus-s"),
    description:
      "The Lamborghini Super-SUV in an unmistakable Blu Eleos specification. Supercar speed with space for five.",
    statement: "Make every arrival unforgettable.",
    featured: true,
  },
  {
    slug: "mercedes-amg-g63-brabus",
    brand: "Mercedes-AMG",
    model: "G63 Brabus Kit",
    shortModel: "G63 Brabus",
    year: 2021,
    price: 1100,
    weekPrice: 6930,
    monthPrice: 24750,
    hp: 585,
    seats: 5,
    acceleration: "4.5 s",
    topSpeed: 220,
    transmission: "9-speed automatic",
    drivetrain: "AWD",
    fuel: "Petrol",
    category: "Luxury SUV",
    image: image("g63-brabus-kit"),
    description:
      "The iconic G-Class elevated by a complete Brabus Widestar kit, carbon details and an unmistakable road presence.",
    statement: "An icon, amplified.",
    featured: true,
  },
  {
    slug: "porsche-911-gt3-992",
    brand: "Porsche",
    model: "911 GT3 (992)",
    shortModel: "911 GT3",
    year: 2022,
    price: 1000,
    weekPrice: 6300,
    monthPrice: 22500,
    hp: 510,
    seats: 2,
    acceleration: "3.4 s",
    topSpeed: 318,
    transmission: "7-speed PDK",
    drivetrain: "RWD",
    fuel: "Petrol",
    category: "Supercar",
    image: image("porsche-911-gt3-992"),
    description:
      "A road-legal race car with a naturally aspirated flat-six, 9,000 rpm redline and the most communicative chassis in the fleet.",
    statement: "The road becomes the occasion.",
    featured: true,
  },
  {
    slug: "mercedes-benz-gls-580",
    brand: "Mercedes-Benz",
    model: "GLS 580 4MATIC",
    shortModel: "GLS 580",
    year: 2024,
    price: 850,
    weekPrice: 5355,
    monthPrice: 19125,
    hp: 510,
    seats: 7,
    acceleration: "4.7 s",
    topSpeed: 250,
    transmission: "9-speed automatic",
    drivetrain: "AWD",
    fuel: "Mild hybrid",
    category: "Luxury SUV",
    image: image("mercedes-gls580"),
    description:
      "Mercedes' flagship seven-seat SUV: a private lounge with V8 performance, air suspension and room for every guest.",
    statement: "First-class, for seven.",
  },
  {
    slug: "mercedes-amg-g63-black",
    brand: "Mercedes-AMG",
    model: "G63 Obsidian Black",
    shortModel: "G63 AMG",
    year: 2022,
    price: 850,
    weekPrice: 5355,
    monthPrice: 19125,
    hp: 585,
    seats: 5,
    acceleration: "4.5 s",
    topSpeed: 220,
    transmission: "9-speed automatic",
    drivetrain: "AWD",
    fuel: "Petrol",
    category: "Luxury SUV",
    image: image("mercedes-amg-g63-black"),
    description:
      "Obsidian Black, Night package and the unmistakable soundtrack of AMG's twin-turbo V8.",
    statement: "Presence without introduction.",
  },
  {
    slug: "bmw-m5-touring-g99",
    brand: "BMW",
    model: "M5 Touring G99",
    shortModel: "M5 Touring",
    year: 2025,
    price: 750,
    weekPrice: 4725,
    monthPrice: 16875,
    hp: 727,
    seats: 5,
    acceleration: "3.6 s",
    topSpeed: 305,
    transmission: "8-speed automatic",
    drivetrain: "AWD",
    fuel: "Plug-in hybrid",
    category: "Grand Tourer",
    image: image("bmw-m5-touring-2025"),
    description:
      "The return of an icon: 727 hybrid horsepower, M xDrive and true long-distance comfort in a British Racing Green touring body.",
    statement: "Performance, with no compromises.",
    featured: true,
  },
  {
    slug: "mercedes-amg-gle-53",
    brand: "Mercedes-AMG",
    model: "GLE 53 4MATIC+",
    shortModel: "GLE 53",
    year: 2025,
    price: 700,
    weekPrice: 4410,
    monthPrice: 15750,
    hp: 435,
    seats: 5,
    acceleration: "4.9 s",
    topSpeed: 250,
    transmission: "9-speed automatic",
    drivetrain: "AWD",
    fuel: "Mild hybrid",
    category: "Luxury SUV",
    image: image("mercedes-amg-gle53-2025"),
    description:
      "Balanced refinement and AMG performance, with a coupé silhouette and adaptive air suspension.",
    statement: "Everyday, made exceptional.",
  },
  {
    slug: "audi-rs6-avant-performance",
    brand: "Audi",
    model: "RS6 Avant Performance",
    shortModel: "RS6 Performance",
    year: 2024,
    price: 700,
    weekPrice: 4410,
    monthPrice: 15750,
    hp: 630,
    seats: 5,
    acceleration: "3.4 s",
    topSpeed: 305,
    transmission: "8-speed automatic",
    drivetrain: "AWD",
    fuel: "Petrol",
    category: "Grand Tourer",
    image: image("audi-rs6-performance"),
    description:
      "A supercar in discreet grand-touring form. Quattro traction, 630 horsepower and space for the whole itinerary.",
    statement: "Fast, whatever the destination.",
  },
  {
    slug: "mercedes-benz-s580e",
    brand: "Mercedes-Benz",
    model: "S 580 e 4MATIC",
    shortModel: "S 580 e",
    year: 2024,
    price: 650,
    weekPrice: 4095,
    monthPrice: 14625,
    hp: 510,
    seats: 5,
    acceleration: "5.1 s",
    topSpeed: 250,
    transmission: "9-speed automatic",
    drivetrain: "AWD",
    fuel: "Plug-in hybrid",
    category: "Grand Tourer",
    image: image("mercedes-s580e"),
    description:
      "The benchmark luxury saloon in plug-in hybrid form: silent electric progress, air suspension and a true first-class cabin.",
    statement: "Travel, elevated.",
  },
  {
    slug: "range-rover-sport-p460e",
    brand: "Land Rover",
    model: "Range Rover Sport P460e",
    shortModel: "Range Rover Sport",
    year: 2024,
    price: 600,
    weekPrice: 3780,
    monthPrice: 13500,
    hp: 460,
    seats: 5,
    acceleration: "5.6 s",
    topSpeed: 225,
    transmission: "8-speed automatic",
    drivetrain: "AWD",
    fuel: "Plug-in hybrid",
    category: "Luxury SUV",
    image: image("range-rover-sport-p460e"),
    description:
      "British modern luxury with 119 km of electric range and the capability to make every road feel effortless.",
    statement: "Quiet confidence, anywhere.",
  },
  {
    slug: "audi-q8-55-tfsi",
    brand: "Audi",
    model: "Q8 55 TFSI Quattro",
    shortModel: "Audi Q8",
    year: 2024,
    price: 600,
    weekPrice: 3780,
    monthPrice: 13500,
    hp: 340,
    seats: 5,
    acceleration: "5.9 s",
    topSpeed: 250,
    transmission: "8-speed automatic",
    drivetrain: "AWD",
    fuel: "Mild hybrid",
    category: "Luxury SUV",
    image: image("audi-q8"),
    description:
      "A refined coupé SUV with Quattro assurance, adaptive air suspension and a precise, modern cabin.",
    statement: "Designed for the coast.",
  },
  {
    slug: "porsche-panamera-gts",
    brand: "Porsche",
    model: "Panamera GTS Sport Turismo",
    shortModel: "Panamera GTS",
    year: 2022,
    price: 600,
    weekPrice: 3780,
    monthPrice: 13500,
    hp: 480,
    seats: 5,
    acceleration: "3.9 s",
    topSpeed: 289,
    transmission: "8-speed PDK",
    drivetrain: "AWD",
    fuel: "Petrol",
    category: "Grand Tourer",
    image: image("porsche-panamera-gts"),
    description:
      "Porsche GTS character with long-distance usability, a panoramic roof and the soundtrack of a twin-turbo V8.",
    statement: "A grand tour, in every sense.",
  },
  {
    slug: "mercedes-amg-sl55",
    brand: "Mercedes-AMG",
    model: "SL 55 Roadster",
    shortModel: "SL 55 Roadster",
    year: 2023,
    price: 550,
    weekPrice: 3465,
    monthPrice: 12375,
    hp: 476,
    seats: 4,
    acceleration: "3.9 s",
    topSpeed: 295,
    transmission: "9-speed automatic",
    drivetrain: "AWD",
    fuel: "Petrol",
    category: "Convertible",
    image: image("mercedes-amg-sl55-cabriolet"),
    description:
      "A modern icon built for Mediterranean evenings: V8 power, four seats and an electrically folding soft top.",
    statement: "The coast, with the roof down.",
    featured: true,
  },
  {
    slug: "bmw-m4-competition-cabriolet",
    brand: "BMW",
    model: "M4 Competition Cabriolet",
    shortModel: "M4 Cabriolet",
    year: 2024,
    price: 550,
    weekPrice: 3465,
    monthPrice: 12375,
    hp: 530,
    seats: 4,
    acceleration: "3.7 s",
    topSpeed: 280,
    transmission: "8-speed automatic",
    drivetrain: "AWD",
    fuel: "Petrol",
    category: "Convertible",
    image: image("bmw-m4-competition-cabriolet"),
    description:
      "M performance, xDrive confidence and open-air driving in a four-seat cabriolet made for the Golden Mile.",
    statement: "Open air. Full intensity.",
  },
  {
    slug: "porsche-cayenne-e-hybrid",
    brand: "Porsche",
    model: "Cayenne Coupé E-Hybrid",
    shortModel: "Cayenne E-Hybrid",
    year: 2021,
    price: 500,
    weekPrice: 3150,
    monthPrice: 11250,
    hp: 462,
    seats: 5,
    acceleration: "5.0 s",
    topSpeed: 253,
    transmission: "8-speed automatic",
    drivetrain: "AWD",
    fuel: "Plug-in hybrid",
    category: "Luxury SUV",
    image: image("porsche-cayenne-e-hybrid-2021"),
    description:
      "Porsche dynamics, coupé proportions and plug-in flexibility in a matte-black specification.",
    statement: "Sporting instinct. Everyday freedom.",
  },
  {
    slug: "audi-rs3-sportback",
    brand: "Audi",
    model: "RS3 Sportback",
    shortModel: "RS3 Sportback",
    year: 2025,
    price: 400,
    weekPrice: 2520,
    monthPrice: 9000,
    hp: 400,
    seats: 5,
    acceleration: "3.6 s",
    topSpeed: 290,
    transmission: "7-speed S tronic",
    drivetrain: "AWD",
    fuel: "Petrol",
    category: "Performance",
    image: image("audi-rs3-2025"),
    description:
      "The last of the five-cylinder icons. Compact proportions, unmistakable sound and Quattro performance.",
    statement: "Small footprint. Huge character.",
  },
  {
    slug: "bmw-m2-g87",
    brand: "BMW",
    model: "M2 G87 Coupé",
    shortModel: "BMW M2",
    year: 2023,
    price: 400,
    weekPrice: 2520,
    monthPrice: 9000,
    hp: 460,
    seats: 4,
    acceleration: "4.3 s",
    topSpeed: 270,
    transmission: "8-speed automatic",
    drivetrain: "RWD",
    fuel: "Petrol",
    category: "Performance",
    image: image("bmw-m2-g87"),
    description:
      "A compact, rear-wheel-drive M car with the right proportions and the performance to make every mountain road memorable.",
    statement: "Pure M, concentrated.",
  },
  {
    slug: "mercedes-cle-200-cabriolet",
    brand: "Mercedes-Benz",
    model: "CLE 200 Cabriolet AMG Line",
    shortModel: "CLE Cabriolet",
    year: 2024,
    price: 400,
    weekPrice: 2520,
    monthPrice: 9000,
    hp: 204,
    seats: 4,
    acceleration: "7.8 s",
    topSpeed: 236,
    transmission: "9-speed automatic",
    drivetrain: "RWD",
    fuel: "Mild hybrid",
    category: "Convertible",
    image: image("mercedes-cle-200-cabriolet-amg-line"),
    description:
      "Elegant open-air touring with four proper seats, AMG Line detailing and effortless comfort.",
    statement: "A softer way to see Marbella.",
  },
  {
    slug: "audi-a5-cabriolet",
    brand: "Audi",
    model: "A5 Cabriolet 45 TFSI",
    shortModel: "A5 Cabriolet",
    year: 2023,
    price: 250,
    weekPrice: 1575,
    monthPrice: 5625,
    hp: 265,
    seats: 4,
    acceleration: "5.7 s",
    topSpeed: 250,
    transmission: "7-speed S tronic",
    drivetrain: "AWD",
    fuel: "Mild hybrid",
    category: "Convertible",
    image: image("audi-a5-cabriolet-45-tfsi"),
    description:
      "A timeless four-seat convertible with Quattro confidence and a fabric roof that opens in seconds.",
    statement: "Mediterranean driving, effortlessly.",
  },
  {
    slug: "audi-q3-45-tfsi",
    brand: "Audi",
    model: "Q3 45 TFSI Quattro",
    shortModel: "Audi Q3",
    year: 2024,
    price: 200,
    weekPrice: 1260,
    monthPrice: 4500,
    hp: 245,
    seats: 5,
    acceleration: "5.8 s",
    topSpeed: 240,
    transmission: "7-speed S tronic",
    drivetrain: "AWD",
    fuel: "Petrol",
    category: "Luxury SUV",
    image: image("audi-q3-45-tfsi"),
    description:
      "Compact premium versatility with Quattro traction and an easy footprint for Marbella's streets.",
    statement: "The easy choice, done properly.",
  },
];

export const featuredFleet = fleet.filter((vehicle) => vehicle.featured);

export const fleetCategories: Array<"All" | VehicleCategory> = [
  "All",
  "Supercar",
  "Luxury SUV",
  "Grand Tourer",
  "Convertible",
  "Performance",
];

export function getVehicle(slug: string) {
  return fleet.find((vehicle) => vehicle.slug === slug);
}

export function formatEuro(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export type EnquiryStatus = "New" | "Contacted" | "Quoted" | "Confirmed";

export type Enquiry = {
  id: string;
  client: string;
  initials: string;
  vehicle: string;
  dates: string;
  delivery: string;
  value: number;
  received: string;
  status: EnquiryStatus;
};

export const initialEnquiries: Enquiry[] = [
  { id: "FS-1088", client: "Thomas Meyer", initials: "TM", vehicle: "Lamborghini Urus S", dates: "18–21 Aug", delivery: "Puente Romano", value: 3600, received: "2 min", status: "New" },
  { id: "FS-1087", client: "Amelia Rossi", initials: "AR", vehicle: "Porsche 911 GT3", dates: "22–25 Aug", delivery: "Puerto Banús", value: 3000, received: "18 min", status: "New" },
  { id: "FS-1086", client: "James Brown", initials: "JB", vehicle: "Mercedes-AMG G63 Brabus", dates: "16–19 Aug", delivery: "Málaga Airport", value: 3300, received: "1 h", status: "Contacted" },
  { id: "FS-1085", client: "Noura Al-Fayed", initials: "NA", vehicle: "Aston Martin DBS Superleggera", dates: "28 Aug–2 Sep", delivery: "Villa delivery", value: 7500, received: "3 h", status: "Quoted" },
  { id: "FS-1084", client: "Lucas van Dijk", initials: "LV", vehicle: "BMW M5 Touring", dates: "20–24 Aug", delivery: "Marbella Club", value: 3000, received: "Yesterday", status: "Confirmed" },
];

export const clients = [
  { name: "Alexander Weiss", initials: "AW", country: "Germany", rentals: 8, spend: 28600, lastVisit: "08 Aug 2026", tier: "Signature" },
  { name: "Noura Al-Fayed", initials: "NA", country: "UAE", rentals: 6, spend: 34900, lastVisit: "28 Jul 2026", tier: "Signature" },
  { name: "Lucas van Dijk", initials: "LV", country: "Netherlands", rentals: 4, spend: 12300, lastVisit: "12 Aug 2026", tier: "Preferred" },
  { name: "Amelia Rossi", initials: "AR", country: "Italy", rentals: 3, spend: 8900, lastVisit: "04 Aug 2026", tier: "Preferred" },
  { name: "Thomas Meyer", initials: "TM", country: "Switzerland", rentals: 1, spend: 3600, lastVisit: "New client", tier: "New" },
];
