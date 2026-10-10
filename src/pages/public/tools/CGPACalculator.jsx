import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuCalculator, LuCircleCheck, LuInfo, LuArrowRight, LuSparkles } from "react-icons/lu";

export const CGPACalculator = () => {
  const [cgpa, setCgpa] = useState("3.4");
  const [scale, setScale] = useState("4.0");

  const numCgpa = parseFloat(cgpa) || 0;
  const numScale = parseFloat(scale) || 4.0;

  // HEC standard formula approximation:
  // For 4.0 scale: Percentage = (CGPA / 4.0) * 100 or HEC equivalence guidelines
  // Typically: Percentage = (CGPA / Scale) * 100
  const percentage = numScale > 0 ? Math.min(100, Math.max(0, ((numCgpa / numScale) * 100))).toFixed(1) : 0;

  let division = "Pass";
  let gradeLetter = "C";
  if (percentage >= 80) {
    division = "First Division (Honours)";
    gradeLetter = "A+";
  } else if (percentage >= 70) {
    division = "First Division";
    gradeLetter = "A";
  } else if (percentage >= 60) {
    division = "First Division";
    gradeLetter = "B";
  } else if (percentage >= 50) {
    division = "Second Division";
    gradeLetter = "C";
  } else {
    division = "Third Division";
    gradeLetter = "D";
  }

  return (
    <div className="container" style={{ padding: "48px 16px", maxWidth: "900px" }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "16px" }}>
        <Link to="/" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Home</Link> / <span>Tools</span> / <span style={{ color: "var(--color-text-main)" }}>CGPA to Percentage Converter</span>
      </div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, marginBottom: "12px", color: "var(--color-primary-dark)" }}>
          CGPA to Percentage Calculator
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
          Convert your university GPA or CGPA into standard percentage for Pakistani scholarship and admission forms according to HEC general equivalence.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "28px" }}>
        {/* Calculator Input Box */}
        <div
          style={{
            background: "var(--color-bg-card)",
            padding: "32px",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <LuCalculator color="var(--color-primary)" /> Enter Academic Record
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13.5px", fontWeight: 600, marginBottom: "8px" }}>
              Total GPA Scale
            </label>
            <select
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              className="form-control"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}
            >
              <option value="4.0">4.0 Scale (Most Pakistani Universities / HEC)</option>
              <option value="5.0">5.0 Scale</option>
              <option value="10.0">10.0 Scale</option>
            </select>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13.5px", fontWeight: 600, marginBottom: "8px" }}>
              Your Obtained CGPA (e.g. 3.45)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max={scale}
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              className="form-control"
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "18px",
                fontWeight: 700,
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
              }}
              placeholder="3.50"
            />
          </div>

          <div
            style={{
              padding: "14px",
              backgroundColor: "rgba(13, 71, 161, 0.05)",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(13, 71, 161, 0.15)",
              fontSize: "12.5px",
              color: "var(--color-text-muted)",
              lineHeight: 1.5,
              display: "flex",
              gap: "8px",
            }}
          >
            <LuInfo style={{ flexShrink: 0, marginTop: "2px", color: "var(--color-primary)" }} />
            <span>
              <strong>Note:</strong> Some universities (e.g., UET, NUST) use specific internal conversion charts. Always verify with your university registrar if applying for official government records.
            </span>
          </div>
        </div>

        {/* Live Result Box */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--color-primary-dark) 0%, #153E75 100%)",
            color: "#FFFFFF",
            padding: "32px",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.85, fontSize: "13px", fontWeight: 600, textTransform: "uppercase" }}>
              <LuSparkles /> Conversion Result
            </div>

            <div style={{ margin: "24px 0 16px" }}>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>Equivalent Percentage</div>
              <div style={{ fontSize: "clamp(2.5rem, 4vw, 3.8rem)", fontWeight: 800, lineHeight: 1.1, color: "var(--color-accent)" }}>
                {percentage}%
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "rgba(255,255,255,0.1)", padding: "16px", borderRadius: "var(--radius-lg)" }}>
              <div>
                <div style={{ fontSize: "11px", opacity: 0.8 }}>Division / Standing</div>
                <div style={{ fontSize: "15px", fontWeight: 700 }}>{division}</div>
              </div>
              <div>
                <div style={{ fontSize: "11px", opacity: 0.8 }}>Equivalent Grade</div>
                <div style={{ fontSize: "15px", fontWeight: 700 }}>{gradeLetter}</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "28px" }}>
            <Link
              to="/scholarships"
              className="btn btn-accent"
              style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
            >
              Find Matching Scholarships <LuArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGPACalculator;
