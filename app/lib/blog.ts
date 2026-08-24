import fs from "fs";
import path from "path";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  featured: boolean;
  authorName: string;
  authorRole: string;
  authorUrl: string;
  tags: string[];
};

export type Faq = { question: string; answer: string };

// --- tiny front-matter parser (flat keys, values quoted; no extra deps) ------
function parseFrontMatter(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body: m[2] };
}

function toMeta(slug: string, d: Record<string, string>): PostMeta {
  return {
    slug: d.slug || slug,
    title: d.title || slug,
    seoTitle: d.seoTitle || d.title || slug,
    description: d.description || "",
    category: d.category || "Insights",
    publishedAt: d.publishedAt || "",
    updatedAt: d.updatedAt || d.publishedAt || "",
    readingTime: d.readingTime || "",
    featured: d.featured === "true",
    authorName: d.authorName || "City Commerce Finance",
    authorRole: d.authorRole || "",
    authorUrl: d.authorUrl || "",
    tags: (d.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
      const { data } = parseFrontMatter(raw);
      return toMeta(f.replace(/\.md$/, ""), data);
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

// Pull the FAQ section (## Frequently asked questions … up to the next ---)
function extractFaqs(body: string): Faq[] {
  const m = body.match(/##\s*Frequently asked questions\s*\n([\s\S]*?)\n---/);
  if (!m) return [];
  const out: Faq[] = [];
  const re = /\*\*(.+?)\*\*\n([\s\S]+?)(?=\n\s*\n|$)/g;
  let mm: RegExpExecArray | null;
  while ((mm = re.exec(m[1])) !== null) {
    const answer = mm[2]
      .replace(/\[(.+?)\]\((.+?)\)/g, "$1")
      .replace(/\*\*/g, "")
      .replace(/\s+/g, " ")
      .trim();
    out.push({ question: mm[1].trim(), answer });
  }
  return out;
}

export function getPost(
  slug: string
): { meta: PostMeta; html: string; faqs: Faq[] } | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, body } = parseFrontMatter(raw);
  const faqs = extractFaqs(body);
  // Drop the document's leading H1 — the hero shows the title instead.
  const clean = body.replace(/^#[^\n]*\n+/, "");
  const html = marked.parse(clean) as string;
  return { meta: toMeta(slug, data), html, faqs };
}
