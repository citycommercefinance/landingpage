---
title: "Letter of Credit vs Bank Guarantee vs SBLC: Which One Does Your Deal Need?"
seoTitle: "LC vs Bank Guarantee vs SBLC: Which Do You Need?"
slug: "letter-of-credit-vs-bank-guarantee-vs-sblc-uae"
description: "A UAE guide to the three core trade finance instruments: what triggers payment under each, which rules govern it, and how to choose."
category: "Trade Finance"
publishedAt: "2026-08-14"
updatedAt: "2026-08-14"
readingTime: "12 min"
featured: true
authorName: "Masiar Rahaman"
authorRole: "Founder, City Commerce Finance LLC"
authorUrl: "/about/masiar-rahaman"
tags: "letter of credit, bank guarantee, standby letter of credit, UCP 600, URDG 758, UAE"
---
# Letter of Credit vs Bank Guarantee vs SBLC: Which One Does Your Deal Need?

There is one distinction that decides almost everything else, and most explanations bury it under a table of definitions.

**A letter of credit is meant to be paid. A bank guarantee and a standby letter of credit are meant never to be paid.**

Get that right and the rest of the choice follows. Get it wrong and you will spend money securing the wrong risk.

## The primary / secondary divide

A commercial letter of credit is a **payment mechanism**. Your supplier ships, presents documents, and gets paid. As the ICC puts it, commercial credits "facilitate trade and are issued with the intention that a document presentation will be delivered to a bank for payment." It is the primary payment vehicle in the transaction.

A bank guarantee and a standby letter of credit are **security**. They sit behind an obligation and are called only if something goes wrong. The ICC describes a standby as "a secondary payment vehicle, or payment of last resort," and notes that "most SBLCs never receive a drawing and simply expire in accordance with a SBLC's stated expiry date/period."

The rulebooks encode this. Under URDG 758 Article 15(a), a demand under a guarantee must be supported by "a statement by the beneficiary, indicating in what respect the applicant is in breach of its obligations under the underlying relationship" — unless the guarantee expressly excludes that requirement, which Article 15(c) permits and which demand-only guarantees commonly do. Subject to that, a guarantee is triggered by breach. A letter of credit is triggered by performance.

Even the SWIFT message set gives it away. There is a dedicated message to *demand* payment under a guarantee or standby — MT765. There is no equivalent for a commercial LC, because an LC is drawn by presenting documents, not by making a demand.

So the first question is not "which instrument is better." It is: **am I trying to pay for something, or trying to protect against someone not doing something?**

## The comparison

| | **Commercial Letter of Credit** | **Bank Guarantee** | **Standby Letter of Credit** |
|---|---|---|---|
| **Purpose** | Payment for goods or services | Security against non-performance | Security against non-performance |
| **Primary or secondary** | Primary payment vehicle | Secondary — default only | Secondary — "payment of last resort" |
| **Expected to be drawn?** | Yes | No | No — most simply expire |
| **What triggers payment** | Complying documents (invoice, bill of lading, etc.) | Complying demand **plus** a statement of the applicant's breach | Complying presentation, typically a default certificate or demand |
| **Governing rules** | UCP 600 (ICC Pub. 600); practice guide ISBP 821; eUCP 2.1 for electronic presentation | URDG 758 (ICC Pub. 758) | ISP98 (ICC Pub. 590); can alternatively be made subject to UCP 600 or URDG 758 |
| **Who it protects** | The seller against non-payment — and the buyer, since payment depends on documents | The beneficiary against a contractor's or supplier's default | The beneficiary against applicant default |
| **Typical UAE use** | Importing goods from a counterparty you don't know well | Construction and government tenders: bid, advance payment, performance, retention | Long-term supply contracts; counterparties (especially US) who prefer LC form |
| **Typical tenor** | Short — the ICC describes commercial credits as generally six months or less | Contract length, often with a defects tail | Often longer-term |
| **SWIFT issue** | MT700 | MT760 | MT760 |
| **SWIFT amend** | MT707 | MT767 | MT767 |
| **SWIFT demand** | n/a — drawn by presentation | MT765 | MT765 |
| **Examination period** | 5 banking days (UCP 600 Art. 14(b)) | 5 business days (URDG 758 Art. 20) | Reasonableness standard: ISP98 Rule 5.01 deems notice within 3 business days not unreasonable, and beyond 7 business days unreasonable |

One correction worth making, because a surprising number of pages get it wrong: **MT760 does not issue a documentary credit.** Its SWIFT designation is "Issue of a Demand Guarantee/Standby Letter of Credit." A commercial LC goes out on MT700, always. If a counterparty tells you their documentary credit will arrive by MT760, something is misdescribed.

## What the rules actually say

Two principles run through all three instruments, and they are the reason banks will take these obligations seriously when your buyer will not.

**Independence.** UCP 600 Article 4(a): "A credit by its nature is a separate transaction from the sale or other contract on which it may be based. Banks are in no way concerned with or bound by such contract." URDG 758 Article 5 says the same for guarantees. Your commercial dispute with the other side is not the bank's problem, and cannot be used to stop payment.

**Documents, not goods.** UCP 600 Article 5: "Banks deal with documents and not with goods, services or performance to which the documents may relate." URDG 758 Article 6 mirrors it.

Together these make the instrument reliable — and they are also why it can bite you. The bank will not pay because the goods arrived. It will pay because the paperwork was right.

A note on the word "irrevocable." Under UCP 600 Article 3, "a credit is irrevocable even if there is no indication to that effect." Revocable credits were a UCP 500 concept and no longer exist under UCP 600. You do not need to negotiate for irrevocability; you have it.

**Confirmation, however, you do need to ask for.** A confirmed credit adds "a definite undertaking of the confirming bank, in addition to that of the issuing bank." If you are exporting to a market where you would rather not rely on the issuing bank's country risk, confirmation is what you are buying. It costs extra and it is priced on the issuing bank and country risk.

### One thing to check on every instrument you receive

None of these rulebooks applies automatically. UAE counsel (Kayrouz & Associates, 2026) note that banks here routinely incorporate UCP 600 by express reference — but a credit that does not reference UCP 600 may be governed solely by UAE domestic law.

So when an instrument arrives, look for the line that names the rules. Its absence is not a technicality.

## Choosing, by situation

**You are importing and your supplier wants payment security before shipping.**
Commercial LC. Sight if they want cash on presentation; usance or deferred payment if you need credit terms after shipment. If you are trading as an intermediary and would rather your supplier and buyer not meet, look at a transferable credit (UCP 600 Art. 38) or a back-to-back structure — a master credit in your favour, and a second credit in your supplier's.

**You are bidding for a Dubai government contract.**
Bank guarantee, and the percentages are set by law rather than convention — subject to the Department of Finance prescribing otherwise. Under Dubai Law No. 12 of 2020, a bid bond "must not exceed two percent (2%) of the estimated value of the public tender," and the winning bidder provides an interest-free performance bond of "ten percent (10%) of the Bid value" in the form of a certified cheque or "an unconditional and irrevocable bank guarantee issued in favour of the Government Entity by a bank operating in the UAE." Advance payments must be secured by a guarantee "in the same amount and currency."

Note that the law requires the performance bond to be *unconditional and irrevocable* — a demand guarantee, not a conditional surety. Private-sector contracts are freely negotiated, but these figures anchor market expectations.

**You have a long-term supply or offtake contract and want protection against default.**
SBLC or bank guarantee. Which one is often a matter of counterparty preference rather than substance — the ICC itself calls them "extremely similar undertakings," differing mainly in governing rule set, force majeure treatment, examination practice and terminology. US counterparties tend to prefer the LC form for historical reasons: American banks once lacked the corporate power to issue certain guarantees but could always issue letters of credit, so the standby was engineered by adapting the LC to call for default certificates instead of shipping documents.

**Your buyer keeps paying late on open account.**
An SBLC sitting behind the trading relationship, drawn only if an invoice goes unpaid, is usually cleaner than issuing an LC for every shipment.

## What it costs, and where the cost actually goes

Pricing is bank-specific and negotiable, but the *structure* of the cost is consistent, and understanding it will save you more than shopping around will.

Published UAE tariffs give the shape. Emirates NBD's trade finance schedule — which carries no effective date on its face — lists import LC issuance and amendment commission at 1.575% per annum with a three-month minimum, and the same rate for guarantees and standby credits. Emirates Islamic's Key Fact Statement of June 2022 lists import LC issuance at 1.575% per annum with a three-month minimum, VAT inclusive. *Both were retrieved in August 2026 and neither is a quotation to you — confirm current rates with your own bank.*

Two structural points matter more than the headline number:

**Under conventional pricing, commission is per annum, so tenor drives price.** A 12-month standby costs roughly four times a three-month one. Shortening tenor is usually the largest single lever you have. (Shariah-compliant instruments are priced on a different basis — see our guide to [Shariah-compliant trade finance](/insights/shariah-compliant-trade-finance-uae-sme-guide).)

**Discrepancy fees are the avoidable cost — and the likeliest to hit you.** Emirates NBD's tariff lists USD 157.50 per set of discrepant documents. That sounds trivial until you see the ICC's own estimate. In a 2022 Banking Commission briefing, the ICC put it this way: "It is estimated that the global percentage of documents refused on first presentation under documentary credits ranges between 65-80%."

It is an estimate, not a measurement — but even at the bottom of that range, refusal on first presentation is the norm rather than the exception.

The fee is the smallest part of the damage. A refusal means delay, renewed shipping and storage costs, a supplier who has not been paid, and sometimes a buyer who uses the discrepancy as leverage to renegotiate. The bank has five banking days to examine and is entitled to reject on any non-compliance — the standard is strict compliance, not substantial compliance.

The practical answer is boring and it works: agree the document list with your supplier *before* the credit is issued, make sure they can actually produce every document exactly as specified, and have someone check the draft credit for conditions nobody can satisfy. Almost every discrepancy I see was designed into the credit at issuance.

The full cost stack: issuance commission (per annum, minimum period), amendment fees, discrepancy fees per set, usance or acceptance commission, confirmation charges where required, advising and negotiation fees, SWIFT charges, and VAT.

## Why UAE SMEs get turned down — and what to do about it

If your bank has declined, you are not an outlier.

The Asian Development Bank's 2025 survey put the global trade finance gap at US$2.5 trillion, unchanged from 2023 and equivalent to around 10% of global merchandise trade flows. SME rejection rates stood at 41%, against 40% for large and mid-cap corporates — SME rates have improved, but the absolute level is high for everyone. The same report cites the ICC's UAE chapter estimating unmet demand in the UAE at about US$3.3 billion.

The reason banks ranked first most often was constraints on US-dollar or local currency liquidity. Unacceptable country or counterparty risk was in the top two for nearly half of respondents. Geopolitical tension, economic slowdown, profitability and relationship targets, and the cost of capital all ranked ahead of KYC, which just over 15% of respondents ranked first. Insufficient security or collateral ranked lower still.

Notice what dominates that list: liquidity, risk appetite, capital cost and macro conditions. Most declines are portfolio decisions, not verdicts on your trade.

What actually moves the outcome:

- **Fix the KYC file anyway.** Ownership structure, source of funds, and counterparty documentation. It has receded as a cause of rejection in the ADB data, but it remains the cheapest thing on this list to put right, and it is the one delay you fully control.
- **Present the trade, not the company.** A specific contract, a named counterparty, a defined tenor, an identifiable repayment source. Banks decline vague working capital requests far more readily than they decline a documented transaction.
- **Be realistic about security.** Cash margin, a lien over goods, assignment of receivables, corporate or personal guarantees. Requirements are negotiated case by case, from full cash cover to a clean limit depending on the relationship — I am deliberately not quoting a percentage, because published figures for this do not exist and anyone who quotes one is guessing. Be aware that where cash margin is taken it is blocked: as Emirates Islamic's own documentation states, you "will not be able to access it."
- **Shorten the tenor.** It reduces both the bank's risk and your commission.
- **Ask about structure, not just price.** Whether an instrument is confirmed, transferable or back-to-back often matters more to whether a deal happens than the commission does.

## When things go wrong

The independence principle means your bank pays on a complying demand even while you insist the beneficiary is in the wrong. There is a fraud exception, but it is narrow, and two points about it are widely misunderstood.

First, **UCP 600 contains no fraud provision at all.** Fraud is a matter for the applicable national law, not the ICC rules.

Second, the bar is high by design. UAE counsel report that Dubai's courts intervene only where there are exceptional and compelling reasons and the claim is fully ascertained, and that precautionary attachment requires the applicant to rely on serious and solid grounds. UAE and DIFC courts consistently uphold the autonomy principle and apply the fraud exception restrictively to preserve commercial certainty. In the international case law, the exception generally requires fraud by the *beneficiary*, not a third party, and clear evidence of it — not a disputed fact pattern.

If you believe a call on your guarantee is abusive, the window is short and the evidential threshold is evidence of abuse, not evidence of a dispute. Take UAE legal advice immediately, not after the payment.

Finally, a word of caution on where you source these instruments. A legitimate LC, guarantee or standby is issued by a licensed bank against a facility, for a real underlying transaction. Instruments are not leased, bought, sold or "monetised" — and a large share of the search results for these terms are advance-fee fraud. If someone has offered you an instrument for lease, read [how to verify an SBLC or bank guarantee provider](/insights/verify-sblc-bank-guarantee-provider-uae) before you pay anything.

---

## Frequently asked questions

**Is a standby letter of credit the same as a bank guarantee?**
Economically they do the same job — both are secondary, default-triggered undertakings. The ICC calls them "extremely similar undertakings." The practical differences are the governing rulebook (ISP98 for standbys, URDG 758 for demand guarantees), and consequent differences in force majeure treatment, examination practice, confirmation and terminology. Counterparty and jurisdictional preference usually decides which you use.

**Which is expected to actually be paid out?**
The letter of credit. It is the primary payment vehicle and is issued with the intention that documents will be presented for payment. Guarantees and standbys are security: the ICC notes that most standbys never receive a drawing and simply expire.

**How often are letter of credit documents rejected?**
The ICC estimated in a 2022 Banking Commission briefing that the global refusal rate on first presentation runs between 65% and 80%. Agreeing the document list with your supplier before the credit is issued is the single most effective preventive step.

**How many days does a bank have to examine documents?**
Five banking days following presentation under UCP 600 Article 14(b), and five business days under URDG 758 Article 20. ISP98 instead applies a reasonableness standard: Rule 5.01 deems notice within three business days not unreasonable, and notice beyond seven business days unreasonable.

**Can my bank refuse to pay because I am in a dispute with the buyer?**
No. Under UCP 600 Article 4(a) and URDG 758 Article 5, the instrument is independent of the underlying contract, and the bank is not concerned with it. That independence is what makes the instrument worth having.

**Does UCP 600 apply automatically?**
No. It applies when expressly incorporated into the credit. UAE banks routinely incorporate it by reference, but a credit that does not reference it may be governed solely by UAE domestic law. Check for the incorporating line on every instrument you receive.

**What guarantee percentage will a Dubai government tender require?**
Under Dubai Law No. 12 of 2020, the bid bond must not exceed 2% of the estimated tender value, and the performance bond is 10% of the bid value, provided as a certified cheque or an unconditional and irrevocable bank guarantee from a bank operating in the UAE. Advance payment guarantees must match the advance in amount and currency. Private contracts are negotiated.

**What is the difference between MT700 and MT760?**
MT700 issues a documentary credit. MT760 issues a demand guarantee or standby letter of credit. They are not interchangeable, and a commercial LC is never issued by MT760.

**Why do UAE banks ask for cash margin?**
Because they are taking your credit risk on a contingent liability. Requirements vary from full cash cover to a clean facility limit depending on the relationship, the tenor and the counterparty. Where cash margin is taken it is blocked for the life of the instrument.

---

*This article is general information about trade finance practice and does not constitute legal or financial advice. Bank tariffs cited are as published at the time of writing and change without notice. Confirm current rules, rates and legal requirements with your bank and UAE counsel before acting.*

## Sources

- ICC Academy — [A Comprehensive Guide to Standby Letters of Credit](https://academy.iccwbo.org/trade-finance/article/a-comprehensive-guide-to-standby-letters-of-credit/)
- ICC Academy — [Types of documentary credit](https://academy.iccwbo.org/trade-finance/article/types-of-documentary-credit-a-comprehensive-guide/)
- ICC Banking Commission — [Technical Advisory Briefing No. 3: Reducing discrepancy rates under Documentary Credits (2022)](https://library.iccwbo.org/content/tfb/BRIEFINGS/20220627_TA_Briefing_No3_reducing_discrepancy_rates.pdf)
- ICC — [UCP 600 text](https://cpeapp.icai.org/downloadBGM/65c1c211b0373.pdf) and [URDG 758 text](https://www.cipcic-bragadin.com/wp-content/uploads/2015/09/ICC-URDG-758.pdf)
- IIBLP — [ISP98](https://iiblp.org/pages/isp98)
- Government of Dubai — [Law No. 12 of 2020 Concerning Contracts and Warehouse Management](https://www.gdrfad.gov.ae/themes/gdrfad/content/pdf/law_no.\(12\)of2020_en.pdf)
- Asian Development Bank — [Global Trade Finance Gap Survey 2025](https://www.adb.org/news/demand-trade-finance-rise-amid-supply-chain-realignment-adb-report)
- SWIFT — [Category 7 Standards](https://www.swift.com/sites/default/files/files/swift_cat7_advanceinformation_feb2022.pdf)
- Emirates NBD — [Trade finance tariff](https://www.emiratesnbd.com/-/media/enbd/files/cib/cash-deposit-services/emiratesnbd_trade_tariff.pdf)
- Emirates Islamic — [Key Fact Statement: Letter of Credit (June 2022)](https://www.emiratesislamic.ae/-/media/ei/pdfs/key-information/bb_kfs_letter_of_credit_e.pdf)
- Kayrouz & Associates — [UAE letters of credit: legal framework](https://www.kayrouzandassociates.com/insights/letters-of-credit-uae-cross-border-trade-guide) and [Bank guarantees in UAE commercial contracts](https://www.kayrouzandassociates.com/insights/bank-guarantees-uae-commercial-contracts-guide)
