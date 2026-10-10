import React from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../../config/brand";
import { FaGraduationCap, FaHandsHelping, FaUniversity, FaShieldAlt } from "react-icons/fa";

export const About = () => {
  return (
    <div className="page-about" style={{ padding: "48px 0 72px" }}>
      <div className="container container-narrow">
        {/* Banner */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "13px", fontWeight: "bold", color: "var(--color-secondary)", textTransform: "uppercase" }}>
            About the Initiative
          </div>
          <h1 style={{ fontSize: "2.4rem", margin: "8px 0 16px" }}>
            Bridging Potential with Opportunity
          </h1>
          <p style={{ fontSize: "16px", color: "var(--color-text-subtle)", lineHeight: "1.6" }}>
            ScholarBridge Pakistan is an academic portal prototype designed to solve the informational fragmentation and manual bottlenecks facing students seeking higher education financial support.
          </p>
        </div>

        {/* Regional Pilot Context */}
        <div className="card" style={{ padding: "32px", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "12px", color: "var(--color-primary-dark)" }}>
            Initial Focus: Dera Ismail Khan & Southern Khyber Pakhtunkhwa
          </h2>
          <p style={{ fontSize: "14.5px", lineHeight: "1.7", color: "var(--color-text-muted)" }}>
            Thousands of talented young scholars in Dera Ismail Khan, Tank, South Waziristan, and neighboring districts qualify for philanthropic, corporate CSR, and board-level talent scholarships every year. However, announcement cycles often circulate on physical notice boards or scattered Facebook groups, leading to missed deadlines and untracked submissions.
          </p>
          <p style={{ fontSize: "14.5px", lineHeight: "1.7", color: "var(--color-text-muted)", margin: 0 }}>
            ScholarBridge provides a centralized digital gateway where institutional requirements are transparent, document verification is auditable, and students receive real-time status milestones.
          </p>
        </div>

        {/* Three Core Pillars */}
        <div className="grid-3" style={{ marginBottom: "36px" }}>
          <div className="card" style={{ padding: "24px" }}>
            <FaHandsHelping size={28} color="var(--color-primary)" style={{ marginBottom: "12px" }} />
            <h3 style={{ fontSize: "1.15rem", marginBottom: "8px" }}>Equal Access</h3>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: "1.5", margin: 0 }}>
              Merit-based and need-based schemes with no geographic or informational discrimination.
            </p>
          </div>

          <div className="card" style={{ padding: "24px" }}>
            <FaShieldAlt size={28} color="var(--color-secondary)" style={{ marginBottom: "12px" }} />
            <h3 style={{ fontSize: "1.15rem", marginBottom: "8px" }}>Privacy & Trust</h3>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: "1.5", margin: 0 }}>
              CNIC numbers are masked, uploaded documents are restricted to authenticated review desks, and zero sensitive financial data is sold.
            </p>
          </div>

          <div className="card" style={{ padding: "24px" }}>
            <FaUniversity size={28} color="var(--color-accent)" style={{ marginBottom: "12px" }} />
            <h3 style={{ fontSize: "1.15rem", marginBottom: "8px" }}>Audit Integrity</h3>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: "1.5", margin: 0 }}>
              Every verification decision, document correction, and disbursement milestone is recorded with timestamps.
            </p>
          </div>
        </div>

        {/* Demo Notice Callout */}
        <div
          style={{
            backgroundColor: "#FEF3C7",
            border: "1px solid #F59E0B",
            borderRadius: "8px",
            padding: "20px",
            fontSize: "13px",
            lineHeight: "1.6",
            color: "#92400E",
            textAlign: "center",
          }}
        >
          <strong>Prototype Disclaimer:</strong> {BRAND.disclaimers.demoNotice}
        </div>
      </div>
    </div>
  );
};

export default About;
