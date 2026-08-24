import type { Metadata } from "next";
import LegalDoc from "../components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How City Commerce Finance LLC collects, uses, shares and protects your personal data under the UAE Personal Data Protection Law (PDPL).",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      file="privacy.md"
      title="Privacy Policy"
      lead="How we collect, use and protect your personal data."
    />
  );
}
