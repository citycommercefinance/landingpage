import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import Footer from "../../components/Footer";
import { getAllPosts, getPost } from "../../lib/blog";
import "../../content-blog.css";

const SITE = "https://citycommercefinance.com";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const { meta } = post;
  const url = `/blog/${meta.slug}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: meta.title,
      description: meta.description,
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt,
      authors: [meta.authorName],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

function fmtDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const { meta, html, faqs } = post;
  const related = getAllPosts().filter((p) => p.slug !== meta.slug).slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt,
    author: {
      "@type": "Person",
      name: meta.authorName,
      jobTitle: "Founder",
      url: `${SITE}${meta.authorUrl}`,
      worksFor: { "@type": "Organization", name: "City Commerce Finance LLC" },
    },
    publisher: { "@type": "Organization", name: "City Commerce Finance LLC", logo: { "@type": "ImageObject", url: `${SITE}/icon.svg` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${meta.slug}` },
    articleSection: meta.category,
    keywords: meta.tags.join(", "),
  };

  const faqLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: meta.title, item: `${SITE}/blog/${meta.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd).replace(/</g, "\\u003c") }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }} />

      <SiteHeader />

      <section className="page-hero">
        <div className="page-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a><span>/</span>
            <a href="/blog">Blog</a><span>/</span>
            <span aria-current="page">{meta.category}</span>
          </nav>
          <p className="eyebrow">{meta.category}</p>
          <h1>{meta.title}</h1>
          <div className="post-meta light">
            <span>By {meta.authorName}</span><span aria-hidden="true">·</span>
            <span>{fmtDate(meta.publishedAt)}</span><span aria-hidden="true">·</span>
            <span>{meta.readingTime} read</span>
          </div>
        </div>
      </section>

      <main className="legal">
        <div className="legal-inner" dangerouslySetInnerHTML={{ __html: html }} />

        <aside className="author-box">
          <div>
            <p className="ab-name">{meta.authorName}</p>
            <p className="ab-role">{meta.authorRole}</p>
            <p className="ab-bio">
              Double-MBA in Banking &amp; Finance and Islamic Banking, leading City Commerce Finance&rsquo;s
              trade and Shariah-compliant advisory in Dubai.
            </p>
            <a className="more" href={meta.authorUrl}>About {meta.authorName} →</a>
          </div>
        </aside>

        {related.length > 0 && (
          <section className="blog-related">
            <h2>Keep reading</h2>
            <div className="blog-grid">
              {related.map((p) => (
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

        <section className="blog-cta">
          <h2>Talk to a trade finance specialist</h2>
          <p>Bring us your transaction — we&rsquo;ll recommend the right instrument and a compliant route.</p>
          <a className="btn-primary" href="/#contact">Start a Conversation</a>
        </section>
      </main>

      <Footer />
    </>
  );
}
