import type { Metadata } from "next";
import SiteHeader from "../../components/SiteHeader";
import Footer from "../../components/Footer";
import { getAllPosts } from "../../lib/blog";
import "../../content-blog.css";

const SITE = "https://citycommercefinance.com";
const NAME = "Masiar Rahaman";

export const metadata: Metadata = {
  title: `${NAME} — Founder`,
  description:
    "Masiar Rahaman is the founder of City Commerce Finance LLC in Dubai — a double-MBA in Banking & Finance and Islamic Banking, leading the firm's trade and Shariah-compliant advisory.",
  alternates: { canonical: "/about/masiar-rahaman" },
  openGraph: {
    type: "profile",
    url: "/about/masiar-rahaman",
    title: `${NAME} — Founder, City Commerce Finance`,
    description: "Founder of City Commerce Finance LLC, Dubai. Double-MBA in Banking & Finance and Islamic Banking.",
  },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  jobTitle: "Founder",
  url: `${SITE}/about/masiar-rahaman`,
  worksFor: { "@type": "Organization", name: "City Commerce Finance LLC", url: SITE },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Jaipur National University", address: "Jaipur, India" },
    { "@type": "CollegeOrUniversity", name: "Lincoln University College", address: "Malaysia" },
  ],
  knowsAbout: [
    "Trade Finance", "Letters of Credit", "Bank Guarantees", "Standby Letters of Credit",
    "Islamic Finance", "Shariah-Compliant Trade Finance", "Sukuk",
  ],
};

const CREDS: [string, string][] = [
  ["Double MBA", "Banking & Finance (Jaipur National University, India) and Islamic Banking (Lincoln University, Malaysia)."],
  ["Trade finance", "Structures LCs, SBLCs and bank guarantees for UAE importers, traders and contractors."],
  ["Shariah-compliant advisory", "Leads the firm's Islamic trade finance and Sukuk advisory practice."],
  ["Dubai-based", "Serves clients across the UAE and the wider GCC from Deira, Dubai."],
];

export default function FounderPage() {
  const posts = getAllPosts();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }} />
      <SiteHeader />

      <section className="page-hero">
        <div className="page-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a><span>/</span>
            <span aria-current="page">{NAME}</span>
          </nav>
          <p className="eyebrow">Founder</p>
          <h1>{NAME}</h1>
          <p className="lead">Founder, City Commerce Finance LLC — Dubai, UAE</p>
        </div>
      </section>

      <main className="founder">
        <div className="founder-grid">
          <div className="founder-copy">
            <p className="lead">
              Masiar Rahaman founded City Commerce Finance to give UAE businesses a clearer, more
              trustworthy route to trade and Shariah-compliant funding.
            </p>
            <p>
              He holds a double MBA — the first from Jaipur National University in India, specialising
              in Banking &amp; Finance, and the second from Lincoln University in Malaysia, specialising
              in Islamic Banking. That combination sits at the centre of the firm&rsquo;s work: conventional
              trade instruments handled with institutional rigour, and Shariah-compliant structures
              advised on their own terms rather than as an afterthought.
            </p>
            <p>
              Today he leads City Commerce Finance&rsquo;s Dubai practice, structuring letters of credit,
              standby letters of credit and bank guarantees for importers, traders and contractors, and
              guiding clients through Islamic trade finance and Sukuk. He also writes the firm&rsquo;s
              insights — practical, carefully sourced explanations of how these instruments actually work.
            </p>

            <ul className="cred-list">
              {CREDS.map(([t, d]) => (
                <li key={t}><strong>{t}</strong><span>{d}</span></li>
              ))}
            </ul>

            <a className="btn-primary" href="/#contact">Work with our team</a>
          </div>
        </div>

        {posts.length > 0 && (
          <section className="blog-related">
            <h2>Insights by {NAME}</h2>
            <div className="blog-grid">
              {posts.map((p) => (
                <a className="blog-card" key={p.slug} href={`/blog/${p.slug}`}>
                  <span className="cat">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <span className="more">Read →</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
