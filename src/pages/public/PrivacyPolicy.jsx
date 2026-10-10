import React from "react";
import { BRAND } from "../../config/brand";

export const PrivacyPolicy = () => {
  return (
    <div className="page-policy" style={{ padding: "48px 0 72px" }}>
      <div className="container container-narrow">
        <h1 style={{ fontSize: "2.2rem", marginBottom: "12px" }}>Privacy & Data Protection Policy</h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", marginBottom: "32px" }}>
          Effective Date: October 2026 • ScholarBridge Pakistan (Technical Demo Prototype)
        </p>

        <div className="card" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px", lineHeight: "1.7", fontSize: "14.5px", color: "var(--color-text-muted)" }}>
          <section>
            <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", marginBottom: "8px" }}>
              1. Prototype Privacy Guarantee
            </h2>
            <p>
              ScholarBridge Pakistan is currently operating in <strong>Frontend Prototype Mode</strong>. All applicant identities, CNIC records, and academic files are synthetic demonstrations. Real passwords, real NADRA biometrics, and authentic banking transactions are <strong>never collected, transmitted, or stored</strong> in this demo.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", marginBottom: "8px" }}>
              2. Data Minimization & CNIC Masking
            </h2>
            <p>
              We believe in strict data minimization. Whenever CNIC or B-Form data is processed on-screen, it is masked (e.g. <code>12101-*****67-1</code>) to prevent shoulder-surfing and unauthorized exposure. Only designated verification officers can view verified metadata.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", marginBottom: "8px" }}>
              3. Handling of Uploaded Documents
            </h2>
            <p>
              Files uploaded in this frontend prototype exist exclusively as temporary in-memory Object URLs or synthetic preview placeholders. Files are not persisted to any external cloud or third-party database. When you reset demo data or close the browser tab, in-memory representations are discarded.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", marginBottom: "8px" }}>
              4. Future Backend Security Architecture
            </h2>
            <p>
              When integrated with a production backend, all applicant data will be protected by AES-256 encrypted file vaults, role-based access control (RBAC), and strict audit logging compliant with the Prevention of Electronic Crimes Act (PECA) and relevant Pakistani privacy regulations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
