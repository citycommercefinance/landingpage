import fs from "fs";
import path from "path";
import { marked } from "marked";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";

type Props = {
  file: string; // markdown file in content/legal/
  title: string; // shown in the hero (the markdown's own H1 is stripped)
  lead: string;
  eyebrow?: string;
};

export default function LegalDoc({ file, title, lead, eyebrow = "Legal" }: Props) {
  const md = fs.readFileSync(path.join(process.cwd(), "content/legal", file), "utf8");
  // Drop the document's leading H1 — the hero shows the title instead.
  const body = md.replace(/^#[^\n]*\n+/, "");
  const html = marked.parse(body) as string;

  return (
    <>
      <SiteHeader />
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
        </div>
      </section>
      <main className="legal">
        <div className="legal-inner" dangerouslySetInnerHTML={{ __html: html }} />
      </main>
      <Footer />
    </>
  );
}
