import React from "react";
import { BRAND } from "../../config/brand";

export const TermsAndConditions = () => {
  return (
    <div className="page-policy" style={{ padding: "48px 0 72px" }}>
      <div className="container container-narrow">
        <h1 style={{ fontSize: "2.2rem", marginBottom: "12px" }}>Terms & Conditions of Portal Use</h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", marginBottom: "32px" }}>
          Effective Date: October 2026 • ScholarBridge Pakistan
        </p>

        <div className="card" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px", lineHeight: "1.7", fontSize: "14.5px", color: "var(--color-text-muted)" }}>
          <section>
            <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", marginBottom: "8px" }}>
              1. Informational & Simulation Purpose
            </h2>
            <p>
              This platform is provided as an interactive software demonstration. The scholarships, requirements, and institutions listed are synthetic samples for testing user flows. No government partnership with the Higher Education Commission (HEC) or provincial ministries is implied or claimed.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", marginBottom: "8px" }}>
              2. Student Integrity & Authentic Submissions
            </h2>
            <p>
              Applicants using a production deployment of ScholarBridge agree to submit only truthful, verifiable academic credentials and valid domicile certificates. Deliberately uploading fabricated salary slips or forged result cards will result in permanent disqualification across all partner scholarship trusts.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", marginBottom: "8px" }}>
              3. Distinction: Approved vs. Awarded
            </h2>
            <p>
              An application status of <strong>'Approved'</strong> denotes that an applicant's credentials and eligibility have met verification standards. Final <strong>'Awarded / Disbursed'</strong> status is subject to institutional quota availability and fund release from the sponsoring endowment.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", marginBottom: "8px" }}>
              4. Non-Affiliation Notice
            </h2>
            <p>
              ScholarBridge Pakistan does not endorse any specific private university or trust. Sponsoring organizations retain autonomous decision-making over final award recipient lists.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
