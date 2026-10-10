import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { checkEligibility } from "../../utils/eligibility";
import Button from "../../components/ui/Button";
import { FaCalculator, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

export const EligibilityGuide = () => {
  const { scholarships } = useData();
  const { currentUser, isStudent } = useAuth();

  const [selectedSchId, setSelectedSchId] = useState(scholarships[0]?.id || "");
  const [testAge, setTestAge] = useState(21);
  const [testLevel, setTestLevel] = useState("Undergraduate");
  const [testMarks, setTestMarks] = useState(78);
  const [testCGPA, setTestCGPA] = useState(3.4);
  const [testDistrict, setTestDistrict] = useState("Dera Ismail Khan");
  const [testIncome, setTestIncome] = useState(55000);
  const [evalResult, setEvalResult] = useState(null);

  const selectedScholarship = scholarships.find(s => s.id === selectedSchId) || scholarships[0];

  const handleEvaluate = (e) => {
    e.preventDefault();
    if (!selectedScholarship) return;

    const mockProfile = {
      dob: `${new Date().getFullYear() - testAge}-05-15`,
      district: testDistrict,
      domicile: testDistrict,
      currentEducation: {
        level: testLevel,
        cgpa: parseFloat(testCGPA),
      },
      educationHistory: [
        { percentage: parseFloat(testMarks) }
      ],
      familyFinancial: {
        guardianMonthlyIncomePKR: parseInt(testIncome, 10),
      },
      profileCompletedPercent: 100,
    };

    const res = checkEligibility(mockProfile, selectedScholarship);
    setEvalResult(res);
  };

  const loadDemoStudentValues = () => {
    if (currentUser) {
      setTestAge(23);
      setTestLevel(currentUser.currentEducation?.level || "Undergraduate");
      setTestMarks(80);
      setTestCGPA(currentUser.currentEducation?.cgpa || 3.42);
      setTestDistrict(currentUser.district || "Dera Ismail Khan");
      setTestIncome(currentUser.familyFinancial?.guardianMonthlyIncomePKR || 55000);
    }
  };

  return (
    <div className="page-eligibility-guide" style={{ padding: "48px 0 72px" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
          <div style={{ fontSize: "13px", fontWeight: "bold", color: "var(--color-secondary)", textTransform: "uppercase" }}>
            Transparency & Rules
          </div>
          <h1 style={{ fontSize: "2.4rem", margin: "8px 0 16px" }}>
            Scholarship Eligibility Guide
          </h1>
          <p style={{ fontSize: "16px", color: "var(--color-text-subtle)", lineHeight: "1.6" }}>
            Understand the criteria, merit cut-offs, district domiciles, and income standards governing scholarship evaluations in Pakistan.
          </p>
        </div>

        {/* Two Column: Interactive Tool + Rules Explanation */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "36px", alignItems: "flex-start" }}>
          {/* Left Column: Interactive Calculator */}
          <div className="card" style={{ padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FaCalculator color="var(--color-primary)" size={20} />
                <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Interactive Eligibility Tester</h3>
              </div>
              {currentUser && (
                <button
                  type="button"
                  onClick={loadDemoStudentValues}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: "11px" }}
                >
                  Load My Profile
                </button>
              )}
            </div>

            <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "20px" }}>
              Test any set of qualifications against live scholarship rules in our database:
            </p>

            <form onSubmit={handleEvaluate} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>
                  Select Scholarship to Test
                </label>
                <select
                  className="form-select"
                  value={selectedSchId}
                  onChange={(e) => { setSelectedSchId(e.target.value); setEvalResult(null); }}
                >
                  {scholarships.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.category})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Applicant Age</label>
                  <input
                    type="number"
                    className="form-input"
                    value={testAge}
                    onChange={(e) => setTestAge(e.target.value)}
                    min={12}
                    max={45}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Current Level</label>
                  <select
                    className="form-select"
                    value={testLevel}
                    onChange={(e) => setTestLevel(e.target.value)}
                  >
                    <option value="Undergraduate">Undergraduate / BS</option>
                    <option value="Intermediate">Intermediate / FA / FSc</option>
                    <option value="Matric">Matric / SSC</option>
                    <option value="Master's">Master's / MS</option>
                    <option value="Doctoral">PhD / Doctoral</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Last Exam Marks (%)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={testMarks}
                    onChange={(e) => setTestMarks(e.target.value)}
                    min={30}
                    max={100}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Current CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    value={testCGPA}
                    onChange={(e) => setTestCGPA(e.target.value)}
                    min={1.0}
                    max={4.0}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Domicile District</label>
                  <input
                    type="text"
                    className="form-input"
                    value={testDistrict}
                    onChange={(e) => setTestDistrict(e.target.value)}
                    placeholder="e.g. Dera Ismail Khan"
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Family Income (PKR/mo)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={testIncome}
                    onChange={(e) => setTestIncome(e.target.value)}
                    step={5000}
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" style={{ marginTop: "6px" }}>
                Evaluate Rules Engine →
              </Button>
            </form>

            {/* Result Box */}
            {evalResult && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "16px",
                  borderRadius: "8px",
                  border: `1px solid ${evalResult.eligible ? "var(--color-success-border)" : "var(--color-danger-border)"}`,
                  backgroundColor: evalResult.eligible ? "var(--color-success-bg)" : "var(--color-danger-bg)",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "15px", color: evalResult.eligible ? "var(--color-success)" : "var(--color-danger)", display: "flex", alignItems: "center", gap: "8px" }}>
                  {evalResult.eligible ? <FaCheckCircle /> : <FaExclamationTriangle />}
                  <span>{evalResult.label}</span>
                </div>

                <div style={{ marginTop: "8px", fontSize: "13px", color: "var(--color-text-main)" }}>
                  <ul style={{ paddingLeft: "20px", margin: 0 }}>
                    {evalResult.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                {evalResult.warnings?.length > 0 && (
                  <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--color-text-subtle)" }}>
                    <strong>Note:</strong> {evalResult.warnings.join(" ")}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Educational Criteria Standards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "8px", color: "var(--color-primary-dark)" }}>
                1. Merit & Percentage Standards
              </h3>
              <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "var(--color-text-muted)" }}>
                Most pure merit scholarships require at least <strong>70% (Grade A)</strong> or <strong>3.0 CGPA</strong>. Top-performer awards require <strong>80%+ (Grade A1)</strong>. Need-based scholarships typically maintain a lower threshold of <strong>50%–60%</strong> to prioritize financial accessibility.
              </p>
            </div>

            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "8px", color: "var(--color-secondary-dark)" }}>
                2. District Quotas & Domicile Rules
              </h3>
              <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "var(--color-text-muted)" }}>
                Regional endowment schemes allocate specific quotas for <strong>Dera Ismail Khan, Tank, Lakki Marwat, and Bannu</strong>. Applicants must hold a genuine domicile certificate issued by the relevant Deputy Commissioner Office.
              </p>
            </div>

            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "8px", color: "var(--color-accent)" }}>
                3. Need-Based Means Assessment
              </h3>
              <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "var(--color-text-muted)" }}>
                Need-based grants evaluate monthly household income against family size. An income ceiling between <strong>PKR 45,000 to PKR 85,000/month</strong> is typical. Salary slips, UC affidavits, and utility bill verifications confirm financial eligibility.
              </p>
            </div>

            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "8px", color: "#0284C7" }}>
                4. Continuous Renewal Requirements
              </h3>
              <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "var(--color-text-muted)" }}>
                Multi-year grants require students to maintain a minimum semester CGPA (typically 2.50 to 3.00) and 75% attendance. Failure in any core course may place the grant in probationary review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityGuide;
