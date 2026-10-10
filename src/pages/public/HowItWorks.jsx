import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { FaUserPlus, FaSearch, FaFileUpload, FaTasks, FaAward, FaPrint } from "react-icons/fa";

export const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Register & Build Your Academic Profile",
      desc: "Sign up with your synthetic demo email and enter your basic education history (Matric, Intermediate, or Undergraduate degree). The system calculates your eligibility percentage and ensures you don't enter repetitive information for multiple grants.",
      icon: <FaUserPlus size={24} color="var(--color-primary)" />,
    },
    {
      num: "02",
      title: "Discover Matching Opportunities",
      desc: "Use comprehensive search filters by category (Merit, Need, Government, Corporate), education tier, and district domicile (such as Dera Ismail Khan, KP). Each card shows live eligibility tags so you only apply where you qualify.",
      icon: <FaSearch size={24} color="var(--color-secondary)" />,
    },
    {
      num: "03",
      title: "Complete the Guided Application Wizard",
      desc: "Navigate our 9-step wizard with prefilled profile data. Answer scholarship-specific essay prompts, review required documents, and submit your application with a unique tracking reference (SBP-2026-XXXXXX).",
      icon: <FaFileUpload size={24} color="var(--color-accent)" />,
    },
    {
      num: "04",
      title: "Document Verification & Corrections Desk",
      desc: "Desk officers review your marks sheets and domicile. If an image is blurry or missing a required stamp, you receive an instant in-app notification with a correction deadline to re-upload without penalty.",
      icon: <FaTasks size={24} color="#0284C7" />,
    },
    {
      num: "05",
      title: "Approval, Award Disbursement & Printable Receipts",
      desc: "Track status milestones from 'Submitted' to 'Approved' and 'Awarded'. Generate printable e-receipts and application summaries complete with transaction audit details.",
      icon: <FaAward size={24} color="var(--color-success)" />,
    },
  ];

  return (
    <div className="page-how-it-works" style={{ padding: "48px 0 72px" }}>
      <div className="container container-narrow">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "13px", fontWeight: "bold", color: "var(--color-secondary)", textTransform: "uppercase" }}>
            Step-by-Step Workflow
          </div>
          <h1 style={{ fontSize: "2.4rem", margin: "8px 0 16px" }}>
            How ScholarBridge Operates
          </h1>
          <p style={{ fontSize: "16px", color: "var(--color-text-subtle)", maxWidth: "600px", margin: "0 auto" }}>
            A transparent and accessible path from scholarship discovery to official institutional award disbursement.
          </p>
        </div>

        {/* Steps List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "48px" }}>
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: "28px",
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "12px",
                  backgroundColor: "var(--color-bg-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "var(--color-primary-dark)",
                }}
              >
                {s.icon}
              </div>

              <div>
                <div style={{ fontSize: "12px", fontWeight: "bold", color: "var(--color-secondary)", textTransform: "uppercase" }}>
                  Step {s.num}
                </div>
                <h3 style={{ fontSize: "1.25rem", margin: "4px 0 8px", color: "var(--color-text-main)" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--color-text-muted)", margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div
          style={{
            backgroundColor: "var(--color-primary-50)",
            border: "1px solid var(--color-primary-100)",
            borderRadius: "var(--radius-xl)",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "1.4rem", marginBottom: "10px", color: "var(--color-primary-dark)" }}>
            Ready to test the application flow?
          </h3>
          <p style={{ fontSize: "14px", color: "var(--color-text-muted)", marginBottom: "20px" }}>
            You can log in directly as our pre-configured demo student Ahmad Khan to see pre-filled profiles and submitted applications.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/scholarships" className="btn btn-primary">
              Browse Scholarships Catalog
            </Link>
            <Link to="/student/dashboard" className="btn btn-outline">
              Open Student Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
