import SiteHeader from "./components/SiteHeader";
import DoorHero from "./components/DoorHero";
import FirmIntro from "./components/FirmIntro";
import WhyUs from "./components/WhyUs";
import LeadForm from "./components/LeadForm";
import Footer from "./components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "City Commerce Finance LLC",
  description:
    "Dubai-based trade finance and verified Shariah-compliant funding: trade facilities (LC, SBLC, bank guarantees), Sukuk advisory, and financial instrument monetization.",
  url: "https://citycommercefinance.com",
  telephone: "+971 4 552 5640",
  areaServed: "AE",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office No. 504, 5th Floor, Nouf Tower, Port Saeed, Deira",
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
        <FirmIntro />

        <WhyUs />

        <section className="after alt" id="projects">
          <h2>Projects</h2>
          <p>
            Selected client mandates across trade finance, project finance and real estate — proof of
            delivery at scale.
          </p>
        </section>
        <section className="contact" id="contact">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Us</h2>
              <p>
                Tell us about your financing requirement — our team responds quickly with a
                tailored, compliant route forward.
              </p>
              <ul className="contact-points">
                <li className="contact-point">
                  <span className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.24 1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>
                    <span className="cp-label">Call us</span>
                    <a href="tel:+97145525640">+971 4 552 5640</a>
                  </span>
                </li>
                <li className="contact-point">
                  <span className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>
                    <span className="cp-label">Email</span>
                    <a href="mailto:info@citycommercefinance.com">info@citycommercefinance.com</a>
                  </span>
                </li>
                <li className="contact-point">
                  <span className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                  <span>
                    <span className="cp-label">Visit</span>
                    <span className="cp-val">Office 504, Nouf Tower, Port Saeed, Deira, Dubai, UAE</span>
                  </span>
                </li>
              </ul>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
