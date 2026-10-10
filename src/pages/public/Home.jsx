import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { BRAND } from "../../config/brand";
import HeroSlider from "../../components/home/HeroSlider";
import ScholarshipCard from "../../components/domain/ScholarshipCard";
import Button from "../../components/ui/Button";
import {
  LuGraduationCap,
  LuSparkles,
  LuShieldCheck,
  LuArrowRight,
  LuClock,
  LuMapPin,
  LuAward,
  LuCircleCheck,
  LuCalculator,
  LuFileText,
  LuCircleHelp,
  LuChevronDown,
  LuLock,
  LuSearch,
  LuBookOpen,
} from "react-icons/lu";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Home = () => {
  const { scholarships } = useData();
  const { isStudent } = useAuth();
  const [openFaq, setOpenFaq] = useState(0);

  const homeRef = useRef(null);
  const statsRef = useRef(null);

  // GSAP ScrollTrigger for section animations
  useEffect(() => {
    if (!homeRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Reveal sections on scroll
      gsap.utils.toArray(".scroll-reveal-section").forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, homeRef);

    return () => ctx.revert();
  }, []);

  const featured = scholarships.slice(0, 3);
  const openCount = scholarships.filter((s) => s.status === "Published").length;

  const faqs = [
    {
      q: "Is ScholarBridge Pakistan affiliated with HEC or any government ministry?",
      a: "No. ScholarBridge Pakistan is strictly an independent frontend educational prototype. All scholarships and grants shown in this system are synthetic sample data for demonstration purposes.",
    },
    {
      q: "Are there any application or processing fees?",
      a: "No. Applying through this platform prototype is 100% free of charge. We do not charge students for scholarship discovery or application submissions.",
    },
    {
      q: "How does the Dera Ismail Khan (D.I. Khan) regional quota work?",
      a: "Scholarships designated with D.I. Khan or Southern KP eligibility give preference to students domiciled in Dera Ismail Khan, Tank, Bannu, and Lakki Marwat to uplift underprivileged regional talent.",
    },
    {
      q: "Where are my uploaded CNIC and academic documents stored?",
      a: "In this prototype demo, your uploaded documents are processed entirely in your browser using in-memory object previews. Sensitive national identity cards (CNIC) or financial records are never saved to remote cloud servers.",
    },
    {
      q: "Can I apply for multiple scholarships at once?",
      a: "Yes. Students can apply to all scholarship cycles for which they fulfill the minimum academic CGPA and domicile criteria.",
    },
  ];

  const educationLevels = [
    { title: "Matric / SSC", desc: "Grade 9 & 10 secondary school merit & assistance schemes", level: "Matric", count: "3 Grants" },
    { title: "Intermediate", desc: "FSc Pre-Medical, Pre-Eng, ICS & General Science students", level: "Intermediate", count: "4 Grants" },
    { title: "Undergraduate / BS", desc: "4-Year Bachelor degree programs in universities across Pakistan", level: "Undergraduate", count: "6 Grants" },
    { title: "Master / MS", desc: "Postgraduate master's degree and MPhil funding cycles", level: "Master", count: "3 Grants" },
    { title: "PhD / Doctoral", desc: "Advanced doctoral research Fellowships and living allowances", level: "PhD", count: "2 Grants" },
  ];

  const fieldsOfStudy = [
    { name: "Engineering & Tech", icon: "⚙️", query: "Engineering" },
    { name: "Medical & Health", icon: "🩺", query: "Medical" },
    { name: "Computer Science & IT", icon: "💻", query: "Computer" },
    { name: "Agriculture & Food", icon: "🌾", query: "Agriculture" },
    { name: "Business & Commerce", icon: "📊", query: "Business" },
    { name: "Social Sciences & Law", icon: "⚖️", query: "Social" },
  ];

  const districts = [
    { name: "Dera Ismail Khan", role: "Primary Pilot Region", count: "8 Schemes", featured: true },
    { name: "Peshawar", role: "Provincial Capital", count: "6 Schemes", featured: false },
    { name: "Bannu", role: "Southern KP", count: "5 Schemes", featured: false },
    { name: "Tank", role: "Neighboring District", count: "4 Schemes", featured: false },
    { name: "Lakki Marwat", role: "Southern Belt", count: "4 Schemes", featured: false },
  ];

  return (
    <div ref={homeRef} className="page-home" style={{ overflow: "hidden" }}>
      {/* 1. Full Ken-Burns Photo Hero Slider with Search & Floating Metrics */}
      <HeroSlider />

      {/* 2. Section 1: Animated Stats Counter Strip */}
      <section
        ref={statsRef}
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid var(--color-border)",
          padding: "36px 0",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="container">
          <div
            className="home-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "16px",
              textAlign: "center",
            }}
          >
            <div className="stat-card">
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--color-primary-dark)", lineHeight: 1.1 }}>
                {scholarships.length || 12}+
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-subtle)", marginTop: "4px" }}>
                Active Scholarship Schemes
              </div>
            </div>

            <div className="stat-card">
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--color-secondary)", lineHeight: 1.1 }}>
                PKR 45M+
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-subtle)", marginTop: "4px" }}>
                Total Tracked Grant Pool
              </div>
            </div>

            <div className="stat-card">
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--color-primary)", lineHeight: 1.1 }}>
                5 KP
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-subtle)", marginTop: "4px" }}>
                Target Pilot Districts
              </div>
            </div>

            <div className="stat-card">
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--color-accent)", lineHeight: 1.1 }}>
                1,200+
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-subtle)", marginTop: "4px" }}>
                Verified Student Profiles
              </div>
            </div>

            <div className="stat-card">
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--color-success)", lineHeight: 1.1 }}>
                100% Free
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-subtle)", marginTop: "4px" }}>
                Zero Intermediary Fees
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section 2: Education Level Pathways */}
      <section className="scroll-reveal-section" style={{ padding: "80px 0", backgroundColor: "var(--color-bg-surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)", fontWeight: 800, color: "var(--color-primary-dark)", marginBottom: "12px" }}>
              Explore Scholarships by Education Level
            </h2>
            <p style={{ fontSize: "15.5px", color: "var(--color-text-muted)", margin: 0 }}>
              Tailored grant options from secondary matriculation through doctoral research cycles.
            </p>
          </div>

          <div
            className="home-pathways-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "16px",
            }}
          >
            {educationLevels.map((lvl) => (
              <Link
                key={lvl.level}
                to={`/scholarships?level=${lvl.level}`}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "var(--radius-xl)",
                  padding: "22px 16px",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-fast)",
                }}
                className="pathway-card"
              >
                <div>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: "rgba(13, 71, 161, 0.08)",
                      color: "var(--color-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      marginBottom: "14px",
                    }}
                  >
                    <LuGraduationCap />
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-text-main)", marginBottom: "6px" }}>
                    {lvl.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "var(--color-text-subtle)", lineHeight: 1.5, marginBottom: "14px" }}>
                    {lvl.desc}
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid var(--color-border-subtle)" }}>
                  <span style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--color-primary)" }}>
                    {lvl.count}
                  </span>
                  <LuArrowRight style={{ color: "var(--color-primary)", fontSize: "14px" }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section 3: Featured Grants Carousel / Cards */}
      <section className="scroll-reveal-section" style={{ padding: "80px 0", backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)", fontWeight: 800, color: "var(--color-primary-dark)", marginBottom: "8px" }}>
                Featured & Priority Scholarship Cycles
              </h2>
              <p style={{ fontSize: "15px", color: "var(--color-text-muted)", margin: 0 }}>
                High-impact financial grants currently accepting online applications.
              </p>
            </div>
            <Link to="/scholarships" className="btn btn-outline" style={{ borderRadius: "var(--radius-full)" }}>
              View All {scholarships.length} Scholarships <LuArrowRight />
            </Link>
          </div>

          <div
            className="home-featured-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {featured.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section 4: Browse by Field of Study */}
      <section className="scroll-reveal-section" style={{ padding: "80px 0", backgroundColor: "var(--color-bg-surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 44px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)", fontWeight: 800, color: "var(--color-primary-dark)", marginBottom: "12px" }}>
              Target Grants by Discipline
            </h2>
            <p style={{ fontSize: "15.5px", color: "var(--color-text-muted)", margin: 0 }}>
              Specialized endowment programs available for technical, medical, and social sciences.
            </p>
          </div>

          <div
            className="home-fields-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "14px",
            }}
          >
            {fieldsOfStudy.map((f) => (
              <Link
                key={f.name}
                to={`/scholarships?search=${encodeURIComponent(f.query)}`}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "var(--radius-xl)",
                  padding: "20px 14px",
                  border: "1px solid var(--color-border)",
                  textAlign: "center",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all var(--transition-fast)",
                }}
                className="field-card"
              >
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>{f.icon}</div>
                <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--color-text-main)", marginBottom: "4px" }}>
                  {f.name}
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-primary)", fontWeight: 600 }}>
                  Explore Programs →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Section 5: Regional Focus - D.I. Khan & KP */}
      <section className="scroll-reveal-section" style={{ padding: "80px 0", backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div
            className="home-regional-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "32px",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "rgba(13, 71, 161, 0.08)",
                  color: "var(--color-primary)",
                  fontSize: "12px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                <LuMapPin /> REGIONAL INCLUSIVITY
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)", fontWeight: 800, color: "var(--color-primary-dark)", lineHeight: 1.25, marginBottom: "16px" }}>
                Dedicated Support for Dera Ismail Khan & Southern KP
              </h2>
              <p style={{ fontSize: "15.5px", color: "var(--color-text-muted)", lineHeight: 1.65, marginBottom: "24px" }}>
                Southern Khyber Pakhtunkhwa faces unique educational financing challenges. ScholarBridge Pakistan features special reserved quota filtering to ensure students from D.I. Khan, Tank, Bannu, and Lakki Marwat receive equal notice of provincial endowments and national scholarships.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link to="/scholarships?district=Dera+Ismail+Khan" className="btn btn-primary">
                  View D.I. Khan Scholarships
                </Link>
                <Link to="/eligibility-guide" className="btn btn-outline">
                  Check Quota Eligibility
                </Link>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "12px",
              }}
            >
              {districts.map((d) => (
                <Link
                  key={d.name}
                  to={`/scholarships?district=${encodeURIComponent(d.name)}`}
                  style={{
                    backgroundColor: d.featured ? "rgba(13, 71, 161, 0.04)" : "var(--color-bg-card)",
                    border: d.featured ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ fontSize: "20px", color: d.featured ? "var(--color-primary)" : "var(--color-secondary)" }}>
                      <LuMapPin />
                    </div>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-main)" }}>
                        {d.name} {d.featured && <span style={{ fontSize: "11px", color: "var(--color-primary)", marginLeft: "4px" }}>★ Primary Pilot</span>}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--color-text-subtle)" }}>
                        {d.role}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-primary)" }}>
                    {d.count} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Section 6: How ScholarBridge Works (4 Steps) */}
      <section className="scroll-reveal-section" style={{ padding: "80px 0", backgroundColor: "var(--color-bg-surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)", fontWeight: 800, color: "var(--color-primary-dark)", marginBottom: "12px" }}>
              How ScholarBridge Works
            </h2>
            <p style={{ fontSize: "15.5px", color: "var(--color-text-muted)", margin: 0 }}>
              A 4-step transparent digital pathway from scholarship discovery to official award.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
              position: "relative",
            }}
          >
            {[
              { num: "01", title: "Discover & Check Match", desc: "Filter active schemes by your GPA, province, district domicile, and household income bracket." },
              { num: "02", title: "Complete Application", desc: "Fill in standardized educational records and upload in-memory document previews." },
              { num: "03", title: "Simulated Verification", desc: "Track desk review milestones with reference tracking IDs (e.g. SBP-2026-XXXXXX)." },
              { num: "04", title: "Grant Award & Receipt", desc: "Receive transparent status updates and access printable simulated fee receipts." },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "var(--radius-xl)",
                  padding: "32px 24px",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: "2.4rem",
                    fontWeight: 900,
                    color: "rgba(13, 71, 161, 0.12)",
                    marginBottom: "12px",
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-text-main)", marginBottom: "8px" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "13.5px", color: "var(--color-text-subtle)", lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section 7: Trust, Privacy & Data Security */}
      <section className="scroll-reveal-section" style={{ padding: "80px 0", backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div
            className="trust-card-box"
            style={{
              backgroundColor: "linear-gradient(135deg, #0A192F 0%, #153E75 100%)",
              background: "linear-gradient(135deg, #0A192F 0%, #0F3E3B 100%)",
              color: "#FFFFFF",
              borderRadius: "var(--radius-2xl)",
              padding: "48px 40px",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  color: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  margin: "0 auto 20px",
                }}
              >
                <LuShieldCheck />
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: "16px" }}>
                Built on Data Safety & Prototype Transparency
              </h2>
              <p style={{ fontSize: "15.5px", color: "#CBD5E1", lineHeight: 1.65, marginBottom: "32px" }}>
                ScholarBridge Pakistan operates as an educational technical prototype. We do not store real National Identity Cards (CNIC) or bank statements on remote cloud servers. All uploads remain in client-side preview storage.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "20px",
                  textAlign: "left",
                }}
              >
                <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "18px", borderRadius: "var(--radius-lg)" }}>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-accent)", marginBottom: "6px" }}>
                    ✓ In-Memory Document Preview
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#E2E8F0" }}>
                    Mock documents exist only in session memory or synthetic placeholders.
                  </div>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "18px", borderRadius: "var(--radius-lg)" }}>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-accent)", marginBottom: "6px" }}>
                    ✓ Non-Affiliation Guarantee
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#E2E8F0" }}>
                    No fake government claims; explicitly labeled sample listings.
                  </div>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "18px", borderRadius: "var(--radius-lg)" }}>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-accent)", marginBottom: "6px" }}>
                    ✓ Zero Intermediary Cost
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#E2E8F0" }}>
                    No payment gateway or agent fee charged to deserving applicants.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Section 8: Live Student Tools Interactive Showcase */}
      <section className="scroll-reveal-section" style={{ padding: "80px 0", backgroundColor: "var(--color-bg-surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)", fontWeight: 800, color: "var(--color-primary-dark)", marginBottom: "12px" }}>
              Student Decision & Calculation Tools
            </h2>
            <p style={{ fontSize: "15.5px", color: "var(--color-text-muted)", margin: 0 }}>
              Practical utilities designed to help students evaluate marks, CGPA, and document requirements.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            <div className="tool-showcase-card">
              <div className="tool-icon-circle"><LuSparkles /></div>
              <h3>Eligibility Checker</h3>
              <p>Compare your academic percentages and district domicile against live scholarship criteria.</p>
              <Link to="/eligibility-guide" className="btn btn-outline btn-sm">Launch Tool →</Link>
            </div>

            <div className="tool-showcase-card">
              <div className="tool-icon-circle"><LuCalculator /></div>
              <h3>CGPA to Percentage</h3>
              <p>Convert your university semester CGPA into standard percentage according to HEC scale.</p>
              <Link to="/tools/cgpa-calculator" className="btn btn-outline btn-sm">Launch Tool →</Link>
            </div>

            <div className="tool-showcase-card">
              <div className="tool-icon-circle"><LuFileText /></div>
              <h3>Document Checklist</h3>
              <p>Track essential documents like Domicile, Father Income Certificate, and DMC marksheets.</p>
              <Link to="/tools/document-checklist" className="btn btn-outline btn-sm">Launch Tool →</Link>
            </div>

            <div className="tool-showcase-card">
              <div className="tool-icon-circle"><LuClock /></div>
              <h3>Deadline Calendar</h3>
              <p>View upcoming closing dates and time-sensitive scholarship deadlines.</p>
              <Link to="/tools/deadline-calendar" className="btn btn-outline btn-sm">Launch Tool →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Section 9: FAQ Accordion */}
      <section className="scroll-reveal-section" style={{ padding: "80px 0", backgroundColor: "#FFFFFF" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)", fontWeight: 800, color: "var(--color-primary-dark)", marginBottom: "12px" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: "15.5px", color: "var(--color-text-muted)", margin: 0 }}>
              Clear answers regarding scholarship applications, eligibility, and platform usage.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                    overflow: "hidden",
                    transition: "border-color var(--transition-fast)",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      background: "none",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-main)" }}>
                      {faq.q}
                    </span>
                    <LuChevronDown
                      style={{
                        fontSize: "20px",
                        color: "var(--color-text-subtle)",
                        transition: "transform 0.25s ease",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: "0 24px 22px",
                        fontSize: "14.5px",
                        lineHeight: 1.6,
                        color: "var(--color-text-muted)",
                        borderTop: "1px solid var(--color-border-subtle)",
                        paddingTop: "14px",
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Section 10: Parallax Call to Action */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--color-primary-dark) 0%, #153E75 100%)",
          color: "#FFFFFF",
          padding: "96px 0",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "760px" }}>
          <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 2.8rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: "18px" }}>
            Ready to Discover Your Educational Funding?
          </h2>
          <p style={{ fontSize: "16.5px", color: "#CBD5E1", lineHeight: 1.6, marginBottom: "32px" }}>
            Join over 1,200 Pakistani students navigating verified merit and need-based scholarships with confidence.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/scholarships" className="btn btn-accent btn-lg" style={{ borderRadius: "var(--radius-full)", padding: "14px 32px" }}>
              Explore All Scholarships <LuArrowRight />
            </Link>
            {!isStudent && (
              <Link to="/student/register" className="btn btn-outline btn-lg" style={{ borderRadius: "var(--radius-full)", color: "#FFFFFF", borderColor: "#FFFFFF", padding: "14px 32px" }}>
                Create Student Account
              </Link>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .pathway-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-primary);
        }
        .field-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary);
        }
        .tool-showcase-card {
          background-color: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 28px 24px;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        .tool-showcase-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .tool-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-lg);
          background-color: rgba(13, 71, 161, 0.08);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justifyContent: center;
          font-size: 20px;
          margin-bottom: 16px;
        }
        .tool-showcase-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-text-main);
          margin-bottom: 8px;
        }
        .tool-showcase-card p {
          font-size: 13px;
          color: var(--color-text-subtle);
          line-height: 1.5;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .scroll-reveal-section {
            padding: 48px 0 !important;
          }
          .trust-card-box {
            padding: 28px 16px !important;
          }
          .pathway-card {
            padding: 16px 14px !important;
          }
          .tool-showcase-card {
            padding: 20px 16px !important;
          }
        }
        @media (max-width: 480px) {
          .scroll-reveal-section {
            padding: 36px 0 !important;
          }
          .home-stats-grid {
            gap: 12px !important;
          }
          .home-pathways-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
          .home-fields-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
        }
        @media (max-width: 340px) {
          .home-pathways-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
