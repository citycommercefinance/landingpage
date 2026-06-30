import type { Metadata } from "next";
import LegalDoc from "../components/LegalDoc";

export const metadata: Metadata = {
  title: "Disclaimer | City Commerce Finance",
  description:
    "Important information about the use of the City Commerce Finance website and services, including that nothing on the site is financial, investment, legal or tax advice.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalDoc
      file="disclaimer.md"
      title="Disclaimer"
      lead="Important information about this website and our services."
    />
  );
}
