export type FAQ = { q: string; a: string };
export type Section = { heading: string; body?: string; bullets?: string[] };

export type Service = {
  slug: string;
  title: string;
  eyebrow?: string;
  summary: string; // one-liner for cards
  flagship?: boolean; // the 6 headline services
  shariah?: boolean; // shows a Shariah-Compliant chip
  image?: string; // /services/*.png (flagship only)
  intro: string; // opening paragraph on the detail page
  sections?: Section[];
  faqs?: FAQ[];
};

export const services: Service[] = [
  // ---------------------------------------------------------------- FLAGSHIP 6
  {
    slug: "trade-facilities",
    title: "Trade Facilities",
    eyebrow: "Trade Finance",
    summary: "Secure international trade with bank-backed instruments — LCs, SBLCs and guarantees.",
    flagship: true,
    image: "/services/trade-facilities.png",
    intro:
      "Keep your imports and exports moving with secure, bank-backed trade instruments. City Commerce Finance structures and issues Letters of Credit, Standby LCs and Bank Guarantees, and manages the entire bank dialogue so your counterparties are protected and your goods move on time.",
    sections: [
      {
        heading: "What we provide",
        bullets: [
          "Documentary & Standby Letters of Credit (LC / SBLC)",
          "Bank Guarantees — bid, performance and advance-payment",
          "Documentary collections and bill negotiation",
          "Confirmation and risk mitigation on overseas banks",
          "Fast issuance through our international banking network",
        ],
      },
      {
        heading: "How it works",
        body:
          "We review your trade flow, counterparties and terms, recommend the right instrument, and arrange issuance through our partner banks. Our team handles the documentation, amendments and settlement end-to-end, so you can focus on the deal rather than the paperwork.",
      },
      {
        heading: "Who it's for",
        body:
          "Importers, exporters, trading houses and contractors who need secure payment terms, want to protect against counterparty risk, or need a trusted instrument to win and deliver international contracts.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between a Letter of Credit and an SBLC?",
        a: "A documentary Letter of Credit is a primary payment mechanism — the bank pays the seller once compliant shipping documents are presented. A Standby Letter of Credit (SBLC) is a backup guarantee that is only drawn if the buyer fails to pay or perform. We help you choose the right one for each transaction.",
      },
      {
        q: "How quickly can a Letter of Credit be issued?",
        a: "Once your application and supporting documents are complete, issuance through our banking partners is typically fast. Timelines depend on the issuing bank, the structure and the counterparties involved, and our team works to expedite every step.",
      },
      {
        q: "Do you offer Shariah-compliant trade finance?",
        a: "Yes. Trade instruments can be structured on Shariah-compliant terms through our Sukuk & Shariah Advisory practice, with appropriate scholar review and documentation.",
      },
      {
        q: "What documents do I need to apply?",
        a: "Typically your trade contract or proforma invoice, company KYC documents, and details of the counterparties and banks involved. Our team will give you a precise checklist for your specific transaction.",
      },
    ],
  },
  {
    slug: "sukuk-shariah-advisory",
    title: "Sukuk & Shariah Advisory",
    eyebrow: "Islamic Finance",
    summary: "Verified Shariah-compliant structuring — Sukuk issuance, Islamic facilities and governance.",
    flagship: true,
    shariah: true,
    image: "/services/sukuk-shariah-advisory.png",
    intro:
      "Grow on principle-aligned terms with fully Shariah-compliant structuring. Our scholars and structurers ensure every transaction — from Sukuk issuance to day-to-day facilities — meets Islamic finance standards, with the governance and documentation to prove it.",
    sections: [
      {
        heading: "What we provide",
        bullets: [
          "Sukuk issuance and structuring",
          "Murabaha, Ijarah, Mudarabah and Musharakah facilities",
          "Shariah governance and board review",
          "Conversion of conventional facilities to compliant structures",
          "Ongoing Shariah advisory and certification",
        ],
      },
      {
        heading: "How it works",
        body:
          "We assess your financing need, design a structure that achieves your commercial goals within Islamic finance principles, obtain Shariah board approval, and support issuance and ongoing monitoring — so compliance is documented at every stage.",
      },
      {
        heading: "Who it's for",
        body:
          "Businesses, family offices and investors who want ethical, interest-free financing, or institutions that need verified Shariah governance behind their funding.",
      },
    ],
    faqs: [
      {
        q: "What makes a facility Shariah-compliant?",
        a: "It must avoid interest (riba), excessive uncertainty (gharar) and prohibited activities, and instead use asset-backed or profit-sharing structures such as Murabaha, Ijarah or Musharakah. A qualified Shariah board reviews and approves the structure.",
      },
      {
        q: "What is Sukuk?",
        a: "Sukuk are Islamic financial certificates, often described as the Shariah-compliant equivalent of bonds. Instead of paying interest, they give investors a share in the ownership and returns of underlying assets or projects.",
      },
      {
        q: "Do you provide a Shariah certificate?",
        a: "Yes. Approved structures are accompanied by the appropriate Shariah documentation and certification from the reviewing scholars.",
      },
      {
        q: "Can you convert my existing conventional loan to an Islamic structure?",
        a: "In many cases, yes. We review the existing facility and, where feasible, restructure it into a compliant alternative that meets your commercial and religious requirements.",
      },
    ],
  },
  {
    slug: "instrument-monetization",
    title: "Instrument Monetization",
    eyebrow: "Liquidity Solutions",
    summary: "Unlock working capital from bank instruments through our global desks.",
    flagship: true,
    image: "/services/instrument-monetization.png",
    intro:
      "Turn financial instruments into usable working capital. We connect your Bank Guarantees, Standby LCs and other eligible instruments to trusted monetization desks worldwide, releasing liquidity quickly and compliantly.",
    sections: [
      {
        heading: "What we provide",
        bullets: [
          "Monetization of BG, SBLC and other bank instruments",
          "Access to established global monetization desks",
          "Structured, compliant transactions",
          "Advisory on instrument eligibility and process",
        ],
      },
      {
        heading: "How it works",
        body:
          "We review the instrument, issuing bank and your objectives, confirm eligibility, and introduce the transaction to the appropriate desk. The structure and terms are agreed transparently before anything proceeds.",
      },
      {
        heading: "Who it's for",
        body:
          "Businesses and project owners holding eligible bank instruments who want to release liquidity for trade, projects or expansion without disposing of the underlying asset.",
      },
    ],
    faqs: [
      {
        q: "Which instruments can be monetized?",
        a: "Commonly Bank Guarantees and Standby Letters of Credit from acceptable banks, among other instruments. Eligibility depends on the issuing bank, wording and structure — we assess each case individually.",
      },
      {
        q: "Is instrument monetization compliant?",
        a: "We structure transactions through established desks with proper documentation and due diligence. Eligibility, terms and process are confirmed transparently before proceeding.",
      },
      {
        q: "How long does the process take?",
        a: "Timelines vary with the instrument, issuing bank and desk involved. After an initial eligibility review we provide an indicative timeline for your specific case.",
      },
    ],
  },
  {
    slug: "project-finance",
    title: "Project Finance",
    eyebrow: "Capital Solutions",
    summary: "Long-term capital for infrastructure and industrial projects.",
    flagship: true,
    image: "/services/project-finance.png",
    intro:
      "Fund large-scale infrastructure and industrial projects with capital structured around your cash flows. We arrange syndicated and bilateral facilities with repayment profiles matched to project milestones and revenues.",
    sections: [
      {
        heading: "What we provide",
        bullets: [
          "Syndicated and bilateral facilities",
          "Construction and long-term term funding",
          "Cash-flow-matched repayment profiles",
          "Infrastructure, energy and industrial sectors",
        ],
      },
      {
        heading: "How it works",
        body:
          "We assess the project's economics, sponsors and risk profile, structure a facility around its cash flows, and arrange funding through our lending network — supporting you from financial close through drawdown.",
      },
      {
        heading: "Who it's for",
        body:
          "Developers, sponsors and corporates undertaking infrastructure, energy or industrial projects that need capital aligned to long project timelines.",
      },
    ],
    faqs: [
      {
        q: "What project sizes do you finance?",
        a: "We work across a range of project sizes. Share your project details and we will advise on the most suitable structure and funding route.",
      },
      {
        q: "Which sectors do you cover?",
        a: "Infrastructure, energy, manufacturing and other industrial sectors, among others. We assess each project on its merits.",
      },
      {
        q: "What repayment tenor is available?",
        a: "Repayment is structured around the project's cash flow and can extend over the long term. We design a profile that matches your revenue ramp-up.",
      },
    ],
  },
  {
    slug: "mortgage-real-estate",
    title: "Mortgage & Real Estate",
    eyebrow: "Property Finance",
    summary: "Property-backed funding with flexible terms and fast decisions.",
    flagship: true,
    image: "/services/mortgage-real-estate.png",
    intro:
      "Access funding secured against property — commercial or residential — with flexible terms, competitive rates and fast, transparent decisions, whether you are acquiring, refinancing or developing.",
    sections: [
      {
        heading: "What we provide",
        bullets: [
          "Commercial and residential mortgages",
          "Real-estate-backed business loans",
          "Development and construction funding",
          "Refinancing of existing facilities",
        ],
      },
      {
        heading: "How it works",
        body:
          "We value the asset and your requirement, recommend the right structure, and arrange funding through our network — with a transparent process and quick decisions.",
      },
      {
        heading: "Who it's for",
        body:
          "Property owners, investors and developers who want to unlock value from real estate or fund an acquisition or development.",
      },
    ],
    faqs: [
      {
        q: "Do you finance both residential and commercial property?",
        a: "Yes. We arrange funding secured against residential, commercial and mixed-use assets.",
      },
      {
        q: "How fast can a decision be made?",
        a: "Property-backed decisions are handled quickly once the asset and documents are reviewed. We pride ourselves on transparent, fast turnaround.",
      },
      {
        q: "Can I refinance an existing mortgage?",
        a: "Yes. We can review your current facility and arrange refinancing on improved or more suitable terms where possible.",
      },
    ],
  },
  {
    slug: "equipment-finance",
    title: "Equipment Finance",
    eyebrow: "Asset Finance",
    summary: "Asset-secured financing for machinery and vehicles.",
    flagship: true,
    image: "/services/equipment-finance.png",
    intro:
      "Acquire the machinery and vehicles your operations need while preserving working capital. Financing is secured by the assets themselves, with repayment schedules matched to their useful life.",
    sections: [
      {
        heading: "What we provide",
        bullets: [
          "Asset-secured lending",
          "Machinery, plant and commercial vehicles",
          "New and used equipment",
          "Fixed, predictable repayment schedules",
        ],
      },
      {
        heading: "How it works",
        body:
          "We assess the equipment and your business, structure the facility against the asset, and arrange funding — so you can preserve cash while you grow capacity.",
      },
      {
        heading: "Who it's for",
        body:
          "Manufacturers, contractors, logistics operators and growing businesses that need plant, machinery or vehicles without a large upfront outlay.",
      },
    ],
    faqs: [
      {
        q: "What equipment qualifies?",
        a: "Most income-generating plant, machinery and commercial vehicles can be financed. Share the asset details and we will confirm.",
      },
      {
        q: "Do you finance used equipment?",
        a: "Yes, both new and used equipment can be financed, subject to valuation and condition.",
      },
      {
        q: "What repayment terms are available?",
        a: "Repayment is structured around the asset's useful life with fixed, predictable schedules. We tailor the term to your cash flow.",
      },
    ],
  },

  // ------------------------------------------------------------- ADDITIONAL 16
  {
    slug: "ecb-funding",
    title: "ECB Funding",
    eyebrow: "Corporate Finance",
    summary: "Foreign-currency loans for corporate expansion and refinancing.",
    intro:
      "External Commercial Borrowing (ECB) gives established companies access to foreign-currency funding for expansion, capital expenditure or refinancing existing debt on competitive international terms.",
  },
  {
    slug: "equity-financing",
    title: "Equity Financing",
    eyebrow: "Growth Capital",
    summary: "Raise growth capital through equity.",
    intro:
      "Raise capital by issuing equity to investors — ideal for high-growth businesses that want funding without adding debt to the balance sheet.",
  },
  {
    slug: "bill-discount-facilities",
    title: "Bill Discount Facilities",
    eyebrow: "Working Capital",
    summary: "Sell receivables before maturity for immediate liquidity.",
    intro:
      "Convert your outstanding invoices and bills into cash today. Bill discounting releases the value of your receivables before maturity, so you can fund operations without waiting for customer payment.",
  },
  {
    slug: "sme-msme-loans",
    title: "SME & MSME Loans",
    eyebrow: "Business Loans",
    summary: "Flexible funding for small and medium enterprises.",
    intro:
      "Flexible, tailored loans designed for the growth needs of small, medium and micro enterprises — for working capital, expansion or equipment.",
  },
  {
    slug: "real-estate-finance",
    title: "Real Estate Finance",
    eyebrow: "Property Finance",
    summary: "Funding for residential, commercial and mixed-use projects.",
    intro:
      "Funding for property development and investment across residential, commercial and mixed-use projects, structured around the project timeline and exit.",
  },
  {
    slug: "merchant-export-finance",
    title: "Merchant Export Finance",
    eyebrow: "Trade Finance",
    summary: "Pre- and post-shipment working capital for exporters.",
    intro:
      "Working-capital solutions for merchant exporters, covering both pre-shipment production costs and post-shipment receivables, so your cash flow keeps pace with your order book.",
  },
  {
    slug: "pre-ipo-finance",
    title: "Pre-IPO Finance",
    eyebrow: "Capital Markets",
    summary: "Bridge capital for companies preparing to list.",
    intro:
      "Bridge financing for companies in the run-up to a public listing, providing capital and runway through the pre-IPO period.",
  },
  {
    slug: "term-loan-machinery",
    title: "Term Loan for Machinery",
    eyebrow: "Asset Finance",
    summary: "Machinery loans with fixed repayment schedules.",
    intro:
      "Term loans to purchase machinery, with fixed repayment schedules and clear interest terms that align with the asset's productive life.",
  },
  {
    slug: "unsecured-loans",
    title: "Unsecured Loans",
    eyebrow: "Business Loans",
    summary: "Collateral-free loans based on creditworthiness.",
    intro:
      "Collateral-free financing based on your business's creditworthiness and cash flow — fast access to funds without pledging assets.",
  },
  {
    slug: "ship-financing",
    title: "Ship Financing",
    eyebrow: "Maritime Finance",
    summary: "Funding for vessel construction, acquisition or refurbishment.",
    intro:
      "Specialised funding for the maritime sector, covering vessel construction, acquisition and refurbishment for owners and operators.",
  },
  {
    slug: "micro-finance",
    title: "Micro Finance",
    eyebrow: "Financial Inclusion",
    summary: "Small loans supporting entrepreneurship and inclusion.",
    intro:
      "Small-ticket loans for individuals and micro-businesses, supporting entrepreneurship and financial inclusion.",
  },
  {
    slug: "agriculture-loans",
    title: "Agriculture Loans",
    eyebrow: "Sector Finance",
    summary: "Funding for inputs, equipment and harvests.",
    intro:
      "Seasonal and term funding for farmers and agri-businesses — covering inputs, equipment and the gap between planting and harvest.",
  },
  {
    slug: "education-loans",
    title: "Education Loans",
    eyebrow: "Sector Finance",
    summary: "Funding for tuition and living expenses.",
    intro:
      "Funding for tuition and living expenses with flexible repayment terms designed around the student's course and early career.",
  },
  {
    slug: "healthcare-loans",
    title: "Healthcare Loans",
    eyebrow: "Sector Finance",
    summary: "Sector loans for clinics, hospitals and equipment.",
    intro:
      "Sector-specific financing for healthcare providers — clinics, hospitals and diagnostic centres — covering fit-out, expansion and medical equipment.",
  },
  {
    slug: "export-packing-credit",
    title: "Export Packing Credit",
    eyebrow: "Trade Finance",
    summary: "Pre-shipment funding for export production.",
    intro:
      "Pre-shipment finance that funds the production, processing and packing of goods against confirmed export orders.",
  },
  {
    slug: "third-party-collateral-loans",
    title: "Third Party Collateral Loans",
    eyebrow: "Secured Lending",
    summary: "Loans secured by third-party collateral.",
    intro:
      "Financing secured by collateral provided by a third party — such as a parent company or associate — to unlock funding when your own assets are limited.",
  },
];

export const flagshipServices = services.filter((s) => s.flagship);
export const additionalServices = services.filter((s) => !s.flagship);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
