import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Blog — Insights | City Commerce Finance",
  description:
    "Guides and insights on trade finance, Sukuk, Shariah-compliant funding and financial instrument monetization from City Commerce Finance, Dubai.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="eyebrow">Insights</p>
          <h1>Blog</h1>
          <p className="lead">
            Guides and insights on trade finance, Sukuk and Shariah-compliant funding.
          </p>
        </div>
      </section>

      <main className="blog-empty">
        <div className="blog-empty-card">
          <span className="blog-empty-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
          <h2>Stay connected for updates</h2>
          <p>
            We&rsquo;re preparing practical articles on trade finance, Sukuk and Shariah-compliant
            funding. Check back soon — and in the meantime, our team is always glad to help.
          </p>
          <a className="cta" href="/#contact">
            Get in touch
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}
