import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../../config/brand";
import { useToast } from "../../context/ToastContext";
import {
  LuArrowUp,
  LuMail,
  LuShieldAlert,
  LuExternalLink,
  LuHeart,
  LuCheck,
} from "react-icons/lu";

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { showSuccess } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    showSuccess("Subscribed to scholarship alerts demo!");
    setNewsletterEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="site-footer"
      style={{
        backgroundColor: "#0B1528",
        color: "#94A3B8",
        borderTop: "1px solid #1E293B",
        paddingTop: "64px",
        paddingBottom: "32px",
        position: "relative",
      }}
    >
      <div className="container">
        {/* 4 Columns Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Col 1: Brand Identity */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                🎓
              </div>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.5px",
                }}
              >
                {BRAND.name}
              </span>
            </div>

            <p style={{ fontSize: "13.5px", lineHeight: "1.65", color: "#94A3B8", marginBottom: "16px" }}>
              {BRAND.tagline} Empowering deserving students across Dera Ismail Khan and Khyber Pakhtunkhwa with transparent financial aid access.
            </p>

            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "rgba(255,255,255,0.06)",
                fontSize: "12px",
                color: "#CBD5E1",
              }}
            >
              📍 Regional Pilot: <strong style={{ color: "var(--color-accent)" }}>{BRAND.initialRegion}</strong>
            </div>
          </div>

          {/* Col 2: Scholarship Categories */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: "18px",
              }}
            >
              Scholarships Directory
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px" }}>
              <li>
                <Link to="/scholarships?sort=deadline_asc" className="footer-link">Latest Announcements</Link>
              </li>
              <li>
                <Link to="/scholarships?category=Need-based" className="footer-link">Need-Based Financial Grants</Link>
              </li>
              <li>
                <Link to="/scholarships?category=Merit-based" className="footer-link">Academic Merit Scholarships</Link>
              </li>
              <li>
                <Link to="/scholarships?level=Undergraduate" className="footer-link">Undergraduate / BS Programs</Link>
              </li>
              <li>
                <Link to="/scholarships?district=Dera+Ismail+Khan" className="footer-link">D.I. Khan Quota Schemes</Link>
              </li>
              <li>
                <Link to="/scholarships" className="footer-link">Browse Full Directory</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Tools */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: "18px",
              }}
            >
              Student Tools
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px" }}>
              <li>
                <Link to="/eligibility-guide" className="footer-link">Eligibility Match Calculator</Link>
              </li>
              <li>
                <Link to="/tools/cgpa-calculator" className="footer-link">CGPA to Percentage Converter</Link>
              </li>
              <li>
                <Link to="/tools/percentage-calculator" className="footer-link">Marks Percentage Tool</Link>
              </li>
              <li>
                <Link to="/tools/document-checklist" className="footer-link">Document Preparation Checklist</Link>
              </li>
              <li>
                <Link to="/tools/deadline-calendar" className="footer-link">Deadline Calendar</Link>
              </li>
              <li>
                <Link to="/compare" className="footer-link">Compare Scholarship Schemes</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Disclaimer */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: "18px",
              }}
            >
              Alerts & Prototype Note
            </h4>

            {/* Newsletter input */}
            <form onSubmit={handleSubscribe} style={{ marginBottom: "18px" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter student email..."
                  required
                  style={{
                    width: "100%",
                    padding: "11px 40px 11px 14px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe to demo newsletter"
                  style={{
                    position: "absolute",
                    right: "6px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "var(--color-primary)",
                    border: "none",
                    color: "#FFFFFF",
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {subscribed ? <LuCheck /> : <LuMail />}
                </button>
              </div>
            </form>

            {/* Demo Notice Box */}
            <div
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.08)",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                padding: "12px",
                borderRadius: "var(--radius-md)",
                fontSize: "12px",
                lineHeight: "1.5",
                color: "#FCD34D",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, marginBottom: "4px" }}>
                <LuShieldAlert /> Demo Mode Simulation
              </div>
              {BRAND.disclaimers.demoNotice}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid #1E293B",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "12.5px",
            color: "#64748B",
          }}
        >
          <div>
            © 2026 {BRAND.name}. Educational frontend prototype. All scholarships are synthetic sample listings.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link to="/privacy-policy" style={{ color: "#94A3B8", textDecoration: "none" }}>Privacy Policy</Link>
            <Link to="/terms-and-conditions" style={{ color: "#94A3B8", textDecoration: "none" }}>Terms of Use</Link>
            <Link to="/payment-and-refund-policy" style={{ color: "#94A3B8", textDecoration: "none" }}>Refund Policy</Link>
            <Link to="/admin/login" style={{ color: "var(--color-secondary)", textDecoration: "none" }}>Admin Demo Desk</Link>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "none",
                color: "#FFFFFF",
                padding: "6px 12px",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
                transition: "background var(--transition-fast)",
              }}
            >
              <LuArrowUp /> Top
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: #94A3B8;
          text-decoration: none;
          transition: color 0.15s ease, transform 0.15s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: #FFFFFF;
          transform: translateX(3px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
