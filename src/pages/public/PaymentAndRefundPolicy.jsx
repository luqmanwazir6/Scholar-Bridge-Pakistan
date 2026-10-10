import React from "react";
import { BRAND } from "../../config/brand";

export const PaymentAndRefundPolicy = () => {
  return (
    <div className="page-policy" style={{ padding: "48px 0 72px" }}>
      <div className="container container-narrow">
        <h1 style={{ fontSize: "2.2rem", marginBottom: "12px" }}>Payment & Refund Policy</h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", marginBottom: "32px" }}>
          Transparent Fee Guidelines • ScholarBridge Pakistan
        </p>

        <div className="card" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px", lineHeight: "1.7", fontSize: "14.5px", color: "var(--color-text-muted)" }}>
          <section>
            <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", marginBottom: "8px" }}>
              1. Fee Philosophy & Zero Barrier Access
            </h2>
            <p>
              ScholarBridge strongly encourages scholarship sponsors and trusts to offer <strong>100% Free (PKR 0)</strong> applications. We believe that economic barriers should never prevent a qualified student from applying for educational assistance.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", marginBottom: "8px" }}>
              2. Transparent Disclosure of Processing Tokens
            </h2>
            <p>
              In cases where a specialized examination or corporate aptitude testing platform assesses candidates, a nominal processing fee (e.g. PKR 250 or PKR 500) may be required by the sponsor. This fee is:
            </p>
            <ul style={{ paddingLeft: "20px" }}>
              <li>Clearly disclosed in bold PKR before any checkout step begins.</li>
              <li>Accompanied by an explicit statement of purpose (e.g. "Laboratory dossier appraisal" or "Aptitude platform fee").</li>
              <li><strong>NOT an official government or HEC charge.</strong></li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", marginBottom: "8px" }}>
              3. Refund Eligibility Guidelines
            </h2>
            <p>
              Application processing fees are generally non-refundable once an application has been submitted and desk review has commenced. However, full refunds are processed if:
            </p>
            <ul style={{ paddingLeft: "20px" }}>
              <li>The scholarship sponsor cancels the scholarship cycle prior to candidate selection.</li>
              <li>A technical system glitch causes duplicate fee deduction for the same application.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", marginBottom: "8px" }}>
              4. Demo Mode Simulation Notice
            </h2>
            <div style={{ backgroundColor: "#FEF3C7", padding: "16px", borderRadius: "6px", color: "#92400E", border: "1px solid #F59E0B" }}>
              <strong>Notice:</strong> In this frontend prototype, no real financial transactions take place. All Easypaisa, JazzCash, and Bank Transfer checkout screens are simulated workflows designed for testing and UX evaluation.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PaymentAndRefundPolicy;
