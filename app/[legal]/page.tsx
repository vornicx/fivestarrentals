import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "../_components/icons";

const pages = {
  privacy: {
    title: "Privacy policy",
    intro: "How Five Star Rentals handles personal information submitted through its website and concierge channels.",
    sections: [
      ["Information we collect", "We may collect contact details, rental preferences and information required to respond to your enquiry or prepare a rental agreement."],
      ["How information is used", "Information is used to communicate with you, check vehicle availability, coordinate delivery and provide the service you request."],
      ["Your choices", "You may request access, correction or deletion of your personal information by contacting hello@fivestar-rentals.com."],
    ],
  },
  terms: {
    title: "Website terms",
    intro: "The conditions that apply when using this Five Star Rentals website and submitting a vehicle enquiry.",
    sections: [
      ["Enquiries and availability", "Website prices are indicative starting rates. A vehicle is not reserved until availability, conditions and payment are confirmed by Five Star Rentals."],
      ["Vehicle information", "Specifications and imagery are presented in good faith and may be updated as the collection changes."],
      ["Rental agreement", "Every confirmed hire is governed by the rental agreement signed with Five Star Rentals before handover."],
    ],
  },
  legal: {
    title: "Legal notice",
    intro: "Business and contact information for Five Star Rentals in Marbella, Spain.",
    sections: [
      ["Business", "Five Star Rentals operates a luxury and sports car rental service from Puerto Banús, Marbella."],
      ["Contact", "Parking Mathilda, Puerto Banús, 29660 Marbella, Málaga. hello@fivestar-rentals.com · +34 622 897 184."],
      ["Intellectual property", "Branding, photography and website content belong to their respective owners and may not be reproduced without permission."],
    ],
  },
};

type Props = { params: Promise<{ legal: string }> };

export function generateStaticParams() {
  return Object.keys(pages).map((legal) => ({ legal }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { legal } = await params;
  const page = pages[legal as keyof typeof pages];
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function LegalPage({ params }: Props) {
  const { legal } = await params;
  const page = pages[legal as keyof typeof pages];
  if (!page) notFound();

  return (
    <main className="legal-page">
      <header>
        <Link className="fs-brand" href="/">
          <span className="fs-brand-mark"><b>5</b><i /></span>
          <span className="fs-brand-copy"><b>Five Star</b><small>Rentals</small></span>
        </Link>
        <Link href="/">Return home<ArrowRight /></Link>
      </header>
      <section>
        <p className="micro-label dark"><span />Legal information</p>
        <h1>{page.title}</h1>
        <p className="legal-intro">{page.intro}</p>
        <div className="legal-sections">
          {page.sections.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{body}</p></div></article>)}
        </div>
        <small>Last updated: 15 August 2026</small>
      </section>
    </main>
  );
}
