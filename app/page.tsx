import SiteHeader from "./components/SiteHeader";
import DoorHero from "./components/DoorHero";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "City Commerce Finance LLC",
  description:
    "Dubai-based trade finance and verified Shariah-compliant funding: trade facilities (LC, SBLC, bank guarantees), Sukuk advisory, and financial instrument monetization.",
  url: "https://citycommercefinance.com",
  areaServed: "AE",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  serviceType: [
    "Trade Facilities",
    "Sukuk & Shariah Advisory",
    "Instrument Monetization",
    "Project Finance",
    "Mortgage & Real Estate Finance",
    "Equipment Finance",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <DoorHero />

      <main>
        <section className="after" id="services">
          <h2>Services</h2>
          <p>
            Trade Facilities, Sukuk & Shariah-compliant advisory, and financial instrument
            monetization — backed by a verified global banking network. (The animated service cards
            above are the interactive preview of this section.)
          </p>
        </section>
        <section className="after alt" id="about">
          <h2>About City Commerce Finance</h2>
          <p>
            A premier Dubai trade & Shariah-compliant finance firm, connecting businesses to a global
            banking network with a high success rate and fast, compliant processing.
          </p>
        </section>
        <section className="after" id="certifications">
          <h2>Certifications</h2>
          <p>
            Verified Shariah-compliance certification and licensing — the credentials behind every
            mandate we structure.
          </p>
        </section>
        <section className="after alt" id="projects">
          <h2>Projects</h2>
          <p>
            Selected client mandates across trade finance, project finance and real estate — proof of
            delivery at scale.
          </p>
        </section>
        <section className="after" id="blogs">
          <h2>Blogs & Insights</h2>
          <p>
            SEO/AEO-optimized articles that answer the questions your clients are asking — built to
            grow organic and answer-engine visibility.
          </p>
        </section>
        <section className="after alt" id="contact" style={{ paddingBottom: 140 }}>
          <h2>Contact Us</h2>
          <p>
            Get in touch to discuss your financing requirement — our team responds quickly with a
            tailored, compliant route forward.
          </p>
          <a className="cta" href="#">
            Start a Conversation
          </a>
        </section>
      </main>
    </>
  );
}
