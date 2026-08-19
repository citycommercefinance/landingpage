import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import { getAllPosts } from "../lib/blog";
import "../content-blog.css";

const SITE = "https://citycommercefinance.com";

export const metadata: Metadata = {
  title: "Blog — Trade & Islamic Finance Insights",
  description:
    "Practical, sourced guides to trade finance, bank guarantees, SBLCs and Shariah-compliant funding in the UAE — for importers, traders and contractors.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blog — City Commerce Finance",
    description: "Practical, sourced guides to trade finance and Shariah-compliant funding in the UAE.",
  },
};

function fmtDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "City Commerce Finance — Insights",
    url: `${SITE}/blog`,
    publisher: { "@type": "Organization", name: "City Commerce Finance LLC", logo: { "@type": "ImageObject", url: `${SITE}/icon.svg` } },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
      author: { "@type": "Person", name: p.authorName, url: `${SITE}${p.authorUrl}` },
      url: `${SITE}/blog/${p.slug}`,
    })),
  };

  const [lead, ...rest] = posts;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd).replace(/</g, "\\u003c") }} />
      <SiteHeader />

      <section className="page-hero">
        <div className="page-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span aria-current="page">Blog</span>
          </nav>
          <p className="eyebrow">Insights</p>
          <h1>Trade &amp; Islamic finance, explained clearly</h1>
          <p className="lead">
            Practical, carefully sourced guides for UAE importers, traders and contractors — how the
            instruments actually work, what they cost, and how to avoid the traps.
          </p>
        </div>
      </section>

      <main className="blog-list-wrap">
        {lead && (
          <a className="blog-lead" href={`/blog/${lead.slug}`}>
            <span className="cat">{lead.category}</span>
            <h2>{lead.title}</h2>
            <p>{lead.description}</p>
            <div className="post-meta">
              <span>{lead.authorName}</span><span aria-hidden="true">·</span>
              <span>{fmtDate(lead.publishedAt)}</span><span aria-hidden="true">·</span>
              <span>{lead.readingTime} read</span>
            </div>
            <span className="more">Read the guide →</span>
          </a>
        )}

        <div className="blog-grid">
          {rest.map((p) => (
            <a className="blog-card" key={p.slug} href={`/blog/${p.slug}`}>
              <span className="cat">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="post-meta">
                <span>{fmtDate(p.publishedAt)}</span><span aria-hidden="true">·</span>
                <span>{p.readingTime} read</span>
              </div>
              <span className="more">Read →</span>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
