import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuCalculator, LuCircleCheck, LuArrowRight, LuSparkles } from "react-icons/lu";

export const PercentageCalculator = () => {
  const [obtainedMarks, setObtainedMarks] = useState("890");
  const [totalMarks, setTotalMarks] = useState("1100");

  const obtained = parseFloat(obtainedMarks) || 0;
  const total = parseFloat(totalMarks) || 1;

  const percentage = total > 0 ? Math.min(100, Math.max(0, (obtained / total) * 100)).toFixed(2) : 0;

  let grade = "F";
  let remark = "Need Improvement";
  let color = "var(--color-danger)";

  if (percentage >= 80) {
    grade = "A-1 (Exceptional)";
    remark = "Eligible for almost all High-Merit scholarships";
    color = "var(--color-success)";
  } else if (percentage >= 70) {
    grade = "A (Excellent)";
    remark = "Eligible for Merit and Provincial scholarships";
    color = "var(--color-success)";
  } else if (percentage >= 60) {
    grade = "B (First Division)";
    remark = "Meets standard minimum criteria for Need-based aid";
    color = "var(--color-primary)";
  } else if (percentage >= 50) {
    grade = "C (Second Division)";
    remark = "Eligible for select Special Assistance schemes";
    color = "var(--color-warning)";
  }

  return (
    <div className="container" style={{ padding: "48px 16px", maxWidth: "900px" }}>
      <div style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "16px" }}>
        <Link to="/" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Home</Link> / <span>Tools</span> / <span style={{ color: "var(--color-text-main)" }}>Percentage Calculator</span>
      </div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, marginBottom: "12px", color: "var(--color-primary-dark)" }}>
          Academic Percentage Calculator
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
          Calculate your exact marks percentage for Matric, Intermediate, DAE, or Board examinations in Pakistan.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "28px" }}>
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
            <LuCalculator color="var(--color-primary)" /> Enter Examination Marks
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13.5px", fontWeight: 600, marginBottom: "8px" }}>
              Obtained Marks
            </label>
            <input
              type="number"
              min="0"
              value={obtainedMarks}
              onChange={(e) => setObtainedMarks(e.target.value)}
              className="form-control"
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "18px",
                fontWeight: 700,
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
              }}
              placeholder="e.g. 890"
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13.5px", fontWeight: 600, marginBottom: "8px" }}>
              Total Marks (e.g. 1100, 850, 550)
            </label>
            <input
              type="number"
              min="1"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              className="form-control"
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "18px",
                fontWeight: 700,
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
              }}
              placeholder="e.g. 1100"
            />
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => { setObtainedMarks("920"); setTotalMarks("1100"); }}
              className="btn btn-outline btn-sm"
              style={{ borderRadius: "var(--radius-full)" }}
            >
              Matric / Inter (1100)
            </button>
            <button
              type="button"
              onClick={() => { setObtainedMarks("440"); setTotalMarks("550"); }}
              className="btn btn-outline btn-sm"
              style={{ borderRadius: "var(--radius-full)" }}
            >
              Part-I (550)
            </button>
            <button
              type="button"
              onClick={() => { setObtainedMarks("710"); setTotalMarks("850"); }}
              className="btn btn-outline btn-sm"
              style={{ borderRadius: "var(--radius-full)" }}
            >
              Old System (850)
            </button>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #0A2540 0%, #153E75 100%)",
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
              <LuSparkles /> Percentage Outcome
            </div>

            <div style={{ margin: "24px 0 16px" }}>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>Calculated Percentage</div>
              <div style={{ fontSize: "clamp(2.5rem, 4vw, 3.8rem)", fontWeight: 800, lineHeight: 1.1, color: "var(--color-accent)" }}>
                {percentage}%
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.1)", padding: "16px", borderRadius: "var(--radius-lg)" }}>
              <div style={{ fontSize: "11px", opacity: 0.8, textTransform: "uppercase" }}>Grade & Tier</div>
              <div style={{ fontSize: "17px", fontWeight: 700, margin: "4px 0" }}>{grade}</div>
              <div style={{ fontSize: "13px", opacity: 0.9 }}>{remark}</div>
            </div>
          </div>

          <div style={{ marginTop: "28px" }}>
            <Link
              to="/scholarships"
              className="btn btn-accent"
              style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
            >
              Browse Qualified Scholarships <LuArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculator;
