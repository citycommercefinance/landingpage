import { flagshipServices } from "../lib/services";

export default function ServicesOverview() {
  return (
    <section className="svc-band" id="services">
      <div className="svc-head">
        <p className="eyebrow">What we do</p>
        <h2>Comprehensive financial solutions for business</h2>
        <p className="lead">
          From trade facilities and Shariah-compliant funding to project, property and equipment
          finance — structured around your goals and backed by a global banking network.
        </p>
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

      <div className="svc-cta-row">
        <a className="btn-primary" href="/services">
          View all services
        </a>
      </div>
    </section>
  );
}
