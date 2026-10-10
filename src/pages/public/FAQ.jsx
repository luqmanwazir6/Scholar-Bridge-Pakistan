import React, { useState } from "react";
import Input from "../../components/ui/Input";
import { FaSearch, FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

export const FAQ = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: "General",
      q: "Is ScholarBridge Pakistan an official government portal?",
      a: "No. ScholarBridge Pakistan is an independent prototype platform designed to demonstrate modern, verified scholarship management for educational institutions and non-profit trusts. It is not affiliated with the Higher Education Commission (HEC) or any provincial government ministry.",
    },
    {
      category: "General",
      q: "Can students outside Dera Ismail Khan apply?",
      a: "Yes! While our initial pilot focuses on Dera Ismail Khan and southern Khyber Pakhtunkhwa (with partners like Gomal University and local colleges), many listed scholarships are open to students across all provinces of Pakistan.",
    },
    {
      category: "Eligibility & Domicile",
      q: "What if my domicile is from a newly merged tribal district?",
      a: "Students from South Waziristan, North Waziristan, and other merged tribal districts are eligible for designated frontier scholarships. Ensure you upload a valid domicile certificate bearing the Deputy Commissioner's seal.",
    },
    {
      category: "Eligibility & Domicile",
      q: "Can I apply if my intermediate result is awaiting re-checking?",
      a: "You may apply using your current provisional result card. If your board issues an updated marks sheet before the review deadline, you can re-upload it via the Document Center.",
    },
    {
      category: "Documents & Uploads",
      q: "What file formats and file sizes are supported for uploads?",
      a: "We accept JPG, PNG, and PDF files. Each document must be under 2.0 MB. For privacy and performance, files are verified in-browser before simulated upload.",
    },
    {
      category: "Documents & Uploads",
      q: "What happens if an admin officer requests a document correction?",
      a: "You will receive an in-app alert and notification detailing exactly what needs adjustment (e.g. 'Uploaded salary slip is blurry or missing the employer stamp'). You can re-upload the corrected document directly from your application details page before the stated deadline.",
    },
    {
      category: "Fees & Payment Simulation",
      q: "Why are some scholarships free while others require a token fee?",
      a: "Most scholarships on our platform are 100% free (PKR 0). Some private trusts charge a small token fee (e.g. PKR 250) strictly to cover physical document attestation or aptitude testing. The fee purpose is clearly disclosed before checkout.",
    },
    {
      category: "Fees & Payment Simulation",
      q: "Does the payment checkout process real money in this prototype?",
      a: "No! All payments on this prototype portal are 100% simulated. No money is charged, and you can test the flow using mock Easypaisa, JazzCash, or Bank Transfer references.",
    },
  ];

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase()) ||
    f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-faq" style={{ padding: "48px 0 72px" }}>
      <div className="container container-narrow">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "13px", fontWeight: "bold", color: "var(--color-secondary)", textTransform: "uppercase" }}>
            Help & Guidance
          </div>
          <h1 style={{ fontSize: "2.4rem", margin: "8px 0 16px" }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: "16px", color: "var(--color-text-subtle)" }}>
            Clear answers regarding eligibility rules, document guidelines, and portal processes.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "32px" }}>
          <Input
            placeholder="Search questions by topic or keyword (e.g. domicile, fee, marks)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "38px" }}
          />
          <FaSearch
            style={{ position: "absolute", left: "14px", top: "13px", color: "var(--color-text-subtle)", pointerEvents: "none" }}
          />
        </div>

        {/* FAQ Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  border: `1px solid ${isOpen ? "var(--color-primary-100)" : "var(--color-border)"}`,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    padding: "18px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: isOpen ? "var(--color-primary-50)" : "#FFFFFF",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: isOpen ? "var(--color-primary-dark)" : "var(--color-text-main)",
                    transition: "background 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "11px", backgroundColor: "#e2e8f0", padding: "2px 6px", borderRadius: "4px", color: "#475569" }}>
                      {item.category}
                    </span>
                    <span>{item.q}</span>
                  </div>
                  <span>{isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}</span>
                </button>

                {isOpen && (
                  <div style={{ padding: "18px 24px", backgroundColor: "#FFFFFF", fontSize: "14px", lineHeight: "1.6", color: "var(--color-text-muted)", borderTop: "1px solid var(--color-border)" }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
