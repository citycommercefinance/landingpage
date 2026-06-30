import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import Footer from "../../components/Footer";
import { services, getService, flagshipServices } from "../../lib/services";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const s = getService(params.slug);
  if (!s) return { title: "Service not found" };
  return {
    title: `${s.title} in Dubai`,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: `${s.title} | City Commerce Finance`,
      description: s.summary,
      url: `/services/${s.slug}`,
    },
  };
}

export default function ServiceDetail({ params }: Params) {
  const s = getService(params.slug);
  if (!s) notFound();

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.summary,
    serviceType: s.eyebrow || s.title,
    areaServed: "AE",
    provider: { "@type": "FinancialService", name: "City Commerce Finance LLC" },
    url: `https://www.citycommercefinance.com/services/${s.slug}`,
  };

  const faqLd =
    s.faqs && s.faqs.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: s.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const others = flagshipServices.filter((o) => o.slug !== s.slug).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      <SiteHeader solid />

      <main className="subpage">
        <section className="page-hero">
          <div className="page-hero-inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/services">Services</a>
              <span>/</span>
              <span aria-current="page">{s.title}</span>
            </nav>
            {s.eyebrow && <p className="eyebrow">{s.eyebrow}</p>}
            <h1>
              {s.title}
              {s.shariah && <span className="chip">Shariah-Compliant</span>}
            </h1>
            <p className="lead">{s.intro}</p>
            <div className="hero-actions">
              <a className="btn-primary" href="/#contact">
                Speak to Our Team
              </a>
              <a className="btn-ghost" href="/services">
                All services
              </a>
            </div>
          </div>
        </section>

        <article className="svc-detail">
          {s.sections && s.sections.length ? (
            s.sections.map((sec) => (
              <section className="svc-section" key={sec.heading}>
                <h2>{sec.heading}</h2>
                {sec.body && <p>{sec.body}</p>}
                {sec.bullets && (
                  <ul className="ticks">
                    {sec.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))
          ) : (
            <section className="svc-section">
              <h2>How City Commerce Finance helps</h2>
              <p>
                Our team structures {s.title.toLowerCase()} around your specific requirement and
                arranges funding through our banking network — with a transparent process and a clear,
                fast decision. Talk to us about your situation and we will recommend the right route
                forward.
              </p>
              <ul className="ticks">
                <li>Tailored structuring for your business</li>
                <li>Access to a global banking and lending network</li>
                <li>Secure, compliant and efficient processing</li>
                <li>Dedicated support from enquiry to drawdown</li>
              </ul>
            </section>
          )}

          {s.faqs && s.faqs.length > 0 && (
            <section className="svc-section faq">
              <h2>Frequently asked questions</h2>
              {s.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>
          )}

          <section className="cta-band">
            <h2>Ready to discuss {s.title.toLowerCase()}?</h2>
            <p>Our Dubai team will respond quickly with a tailored, compliant route forward.</p>
            <a className="btn-primary" href="/#contact">
              Start a Conversation
            </a>
          </section>

          <section className="related">
            <h2>Other services</h2>
            <div className="related-grid">
              {others.map((o) => (
                <a key={o.slug} href={`/services/${o.slug}`}>
                  <strong>{o.title}</strong>
                  <span>{o.summary}</span>
                </a>
              ))}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
