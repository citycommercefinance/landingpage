import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import { flagshipServices, additionalServices, services } from "../lib/services";

export const metadata: Metadata = {
  title: "Services — Trade, Shariah & Corporate Finance in Dubai",
  description:
    "Explore City Commerce Finance's full range: trade facilities, Sukuk & Shariah-compliant advisory, instrument monetization, project, property and equipment finance, and more.",
  alternates: { canonical: "/services" },
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `https://www.citycommercefinance.com/services/${s.slug}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <SiteHeader solid />

      <main className="subpage">
        <section className="page-hero">
          <div className="page-hero-inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <span aria-current="page">Services</span>
            </nav>
            <p className="eyebrow">Our Services</p>
            <h1>Comprehensive financial solutions for business</h1>
            <p className="lead">
              From trade facilities and verified Shariah-compliant funding to project, property and
              equipment finance — tailored to your business and backed by a global banking network.
            </p>
          </div>
        </section>

        <section className="svc-band">
          <div className="svc-head">
            <h2>Flagship services</h2>
            <p className="lead">Our most-requested solutions, with dedicated guidance end-to-end.</p>
          </div>
          <div className="svc-grid">
            {flagshipServices.map((s) => (
              <a className="svc-card" key={s.slug} href={`/services/${s.slug}`}>
                <div className="svc-ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={s.image} alt={s.title} />
                  {s.shariah && <span className="chip">Shariah-Compliant</span>}
                </div>
                <div className="svc-card-body">
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <span className="svc-more">Learn more →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="svc-band alt">
          <div className="svc-head">
            <h2>Full range of financing</h2>
            <p className="lead">
              Specialist and sector-specific facilities across the business lifecycle.
            </p>
          </div>
          <div className="svc-grid compact">
            {additionalServices.map((s) => (
              <a className="mini-card" key={s.slug} href={`/services/${s.slug}`}>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <span className="svc-more">Learn more →</span>
              </a>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <h2>Not sure which facility fits?</h2>
          <p>Tell us about your requirement and our Dubai team will recommend the right route.</p>
          <a className="btn-primary" href="/#contact">
            Start a Conversation
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}
