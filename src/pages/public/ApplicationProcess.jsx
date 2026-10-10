import React from "react";
import { Link } from "react-router-dom";
import { FaClipboardList, FaFileSignature, FaMoneyCheck, FaCheckDouble, FaPrint } from "react-icons/fa";

export const ApplicationProcess = () => {
  return (
    <div className="page-app-process" style={{ padding: "48px 0 72px" }}>
      <div className="container container-narrow">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "13px", fontWeight: "bold", color: "var(--color-secondary)", textTransform: "uppercase" }}>
            Candidate Instructions
          </div>
          <h1 style={{ fontSize: "2.4rem", margin: "8px 0 16px" }}>
            The 9-Step Application Wizard
          </h1>
          <p style={{ fontSize: "16px", color: "var(--color-text-subtle)", lineHeight: "1.6" }}>
            How our online application wizard works, what information is required, and how to track your submission.
          </p>
        </div>

        <div className="card" style={{ padding: "32px", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "16px", color: "var(--color-primary-dark)" }}>
            Wizard Steps Overview
          </h2>
          <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "14px", fontSize: "14.5px", color: "var(--color-text-main)" }}>
            <li>
              <strong>Step 1: Personal Information</strong> — Full name, guardian name, date of birth, masked CNIC, and phone. Auto-prefilled from your student profile.
            </li>
            <li>
              <strong>Step 2: Family & Financial Details</strong> — Guardian occupation, monthly household earnings, and number of dependent schooling siblings (only requested when the specific scholarship has an income rule).
            </li>
            <li>
              <strong>Step 3: Education History</strong> — Matric, Intermediate, and current university degree credentials with auto-calculated percentage/CGPA.
            </li>
            <li>
              <strong>Step 4: Scholarship-Specific Questions</strong> — Custom essays, research statements, or extracurricular questions tailored to the scholarship scheme.
            </li>
            <li>
              <strong>Step 5: Supporting Documents</strong> — Upload scanned photographs, attested result cards, and domicile (JPG, PNG, or PDF, maximum 2MB).
            </li>
            <li>
              <strong>Step 6: Eligibility Checklist</strong> — Final automated rule evaluation check confirming that your qualifications meet the minimum thresholds.
            </li>
            <li>
              <strong>Step 7: Application Review</strong> — Comprehensive summary of all entered information with inline 'Edit' links for quick corrections.
            </li>
            <li>
              <strong>Step 8: Fee Information & Demo Payment</strong> — Shown only if the scholarship requires an administrative fee. Choose Easypaisa, JazzCash, or Bank Transfer.
            </li>
            <li>
              <strong>Step 9: Final Submission Confirmation</strong> — System issues your unique tracking code (e.g. SBP-2026-894102) and printable application summary.
            </li>
          </ol>
        </div>

        <div className="card" style={{ padding: "28px", marginBottom: "32px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "var(--color-secondary-dark)" }}>
            Preventing Duplicate Submissions
          </h3>
          <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--color-text-muted)", margin: 0 }}>
            To protect platform integrity and fairness, the system checks whether you have already submitted an active application for the chosen scholarship. If an active submission exists, the submission button is disabled and a duplicate warning banner is displayed.
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link to="/scholarships" className="btn btn-primary btn-lg">
            Explore Open Scholarships to Apply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProcess;
