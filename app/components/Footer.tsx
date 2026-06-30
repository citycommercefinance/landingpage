import { flagshipServices } from "../lib/services";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="ft-wrap">
        <div className="ft-brand">
          <div className="ft-logo">
            <svg viewBox="0 0 240 230" aria-hidden="true" width="40" height="38">
              <polygon points="116,34 30,198 100,198 116,150" fill="#fff" />
              <polygon points="116,150 100,198 64,198" fill="#fff" />
              <polygon points="124,34 210,198 140,198 124,150" fill="#fff" />
              <polygon points="124,150 140,198 176,198" fill="#fff" />
              <polygon points="120,150 101,192 120,180" fill="#fff" />
              <polygon points="120,150 139,192 120,180" fill="#fff" />
            </svg>
            <span>
              <strong>CITY COMMERCE FINANCE</strong>
              <em>The Home of Endless Possibilities</em>
            </span>
          </div>
          <p>
            Dubai-based trade finance and verified Shariah-compliant funding — connecting businesses
            to a global banking network with secure, efficient solutions.
          </p>
        </div>

        <nav className="ft-col" aria-label="Company">
          <h4>Company</h4>
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/#why-us">Why Us</a>
          <a href="/#projects">Projects</a>
          <a href="/#blogs">Blogs</a>
          <a href="/#contact">Contact</a>
        </nav>

        <nav className="ft-col" aria-label="Services">
          <h4>Services</h4>
          {flagshipServices.map((s) => (
            <a key={s.slug} href={`/services/${s.slug}`}>
              {s.title}
            </a>
          ))}
          <a href="/services">All services →</a>
        </nav>

        <div className="ft-col">
          <h4>Contact</h4>
          <a href="tel:+97145525640">+971 4 552 5640</a>
          <a href="mailto:info@citycommercefinance.com">info@citycommercefinance.com</a>
          <p className="ft-addr">
            Office No. 504, 5th Floor, Nouf Tower, Port Saeed, Deira, Dubai, UAE
          </p>
        </div>
      </div>

      <div className="ft-bottom">
        <span>© {new Date().getFullYear()} City Commerce Finance LLC — UAE. All rights reserved.</span>
        <nav className="ft-legal" aria-label="Legal">
          <a href="/privacy">Privacy Policy</a>
          <a href="/disclaimer">Disclaimer</a>
        </nav>
      </div>
    </footer>
  );
}
