import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { formatPKR, formatDate, getDeadlineStatus } from "../../utils/formatters";
import { checkEligibility } from "../../utils/eligibility";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaFileAlt,
  FaCheckCircle,
  FaQuestionCircle,
  FaBookmark,
  FaRegBookmark,
  FaExclamationTriangle,
  FaBalanceScale,
  FaInfoCircle,
  FaArrowLeft,
} from "react-icons/fa";

export const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scholarships, savedIds, toggleSaveScholarship } = useData();
  const { currentUser, isStudent, isAuthenticated } = useAuth();

  const scholarship = scholarships.find(s => s.id === id);

  // Interactive guest checker state
  const [guestAge, setGuestAge] = useState(20);
  const [guestLevel, setGuestLevel] = useState("Undergraduate");
  const [guestMarks, setGuestMarks] = useState(78);
  const [guestDistrict, setGuestDistrict] = useState("Dera Ismail Khan");
  const [guestResult, setGuestResult] = useState(null);

  if (!scholarship) {
    return (
      <div className="container" style={{ padding: "64px 16px", textAlign: "center" }}>
        <h2>Scholarship Not Found</h2>
        <p style={{ color: "var(--color-text-subtle)", marginBottom: "20px" }}>
          The requested scholarship identifier does not exist or has been archived.
        </p>
        <Link to="/scholarships" className="btn btn-primary">
          Back to Scholarships Catalog
        </Link>
      </div>
    );
  }

  const isSaved = savedIds.includes(scholarship.id);
  const deadlineInfo = getDeadlineStatus(scholarship.deadline);
  const isFree = Number(scholarship.applicationFee) === 0;

  // Profile-based eligibility
  const profileEligibility = isStudent ? checkEligibility(currentUser, scholarship) : null;

  // Run guest check
  const handleCheckGuestEligibility = (e) => {
    e.preventDefault();
    const mockStudent = {
      dob: `${new Date().getFullYear() - guestAge}-01-01`,
      currentEducation: { level: guestLevel, cgpa: 3.2 },
      educationHistory: [{ percentage: parseFloat(guestMarks) }],
      district: guestDistrict,
      domicile: guestDistrict,
      profileCompletedPercent: 100,
    };
    const res = checkEligibility(mockStudent, scholarship);
    setGuestResult(res);
  };

  return (
    <div className="page-scholarship-details" style={{ padding: "36px 0 64px" }}>
      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: "20px" }}>
          <Link to="/scholarships" style={{ color: "var(--color-text-muted)", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <FaArrowLeft size={12} /> Back to Scholarships
          </Link>
        </div>

        {/* Header Hero Box */}
        <div
          className="card details-header-card"
          style={{
            padding: "32px",
            marginBottom: "32px",
            backgroundColor: "#FFFFFF",
            borderTop: "4px solid var(--color-primary)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
              <Badge variant="sample">Sample Data – Not Official</Badge>
              <Badge variant="primary">{scholarship.category}</Badge>
              {isFree ? (
                <Badge variant="success">No Application Fee (Free)</Badge>
              ) : (
                <Badge variant="warning">Fee: {formatPKR(scholarship.applicationFee)}</Badge>
              )}
              <Badge variant="neutral">Seats: {scholarship.seats || "Open"} Available</Badge>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => toggleSaveScholarship(scholarship.id)}
                className="btn btn-outline btn-sm"
                style={{ color: isSaved ? "var(--color-primary)" : "inherit" }}
              >
                {isSaved ? <FaBookmark /> : <FaRegBookmark />} {isSaved ? "Saved" : "Save"}
              </button>
              <Link to={`/compare?id1=${scholarship.id}`} className="btn btn-outline btn-sm">
                <FaBalanceScale /> Compare
              </Link>
            </div>
          </div>

          <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)", marginBottom: "10px", lineHeight: "1.25" }}>
            {scholarship.title}
          </h1>

          <div style={{ fontSize: "15px", color: "var(--color-text-subtle)", fontWeight: 500, marginBottom: "24px" }}>
            Sponsored by: <strong style={{ color: "var(--color-text-main)" }}>{scholarship.sponsor}</strong>
          </div>

          {/* Quick Stats Grid */}
          <div
            className="details-quick-stats"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "16px",
              padding: "20px",
              backgroundColor: "var(--color-bg-surface)",
              borderRadius: "8px",
            }}
          >
            <div>
              <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)", textTransform: "uppercase" }}>Financial Coverage</div>
              <div style={{ fontSize: "15px", fontWeight: "bold", color: "var(--color-primary-dark)", marginTop: "2px" }}>
                {scholarship.financialCoverage}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)", textTransform: "uppercase" }}>Application Deadline</div>
              <div style={{ fontSize: "15px", fontWeight: "bold", color: deadlineInfo.isUrgent ? "var(--color-danger)" : "var(--color-text-main)", marginTop: "2px" }}>
                {formatDate(scholarship.deadline)} ({deadlineInfo.label})
              </div>
            </div>

            <div>
              <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)", textTransform: "uppercase" }}>Target Education Level</div>
              <div style={{ fontSize: "15px", fontWeight: "bold", color: "var(--color-text-main)", marginTop: "2px" }}>
                {scholarship.educationLevel?.join(", ") || "All Levels"}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)", textTransform: "uppercase" }}>Primary Region</div>
              <div style={{ fontSize: "15px", fontWeight: "bold", color: "var(--color-text-main)", marginTop: "2px" }}>
                {scholarship.eligibility?.eligibleDistricts?.[0] || "Pakistan Wide"}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="details-two-col-layout">
          {/* Main Details Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Detailed Instructions & Overview */}
            <section className="card" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px" }}>
                Scheme Instructions & Objectives
              </h2>
              <p style={{ fontSize: "14.5px", lineHeight: "1.7", color: "var(--color-text-muted)" }}>
                {scholarship.instructions || "This scholarship provides direct financial assistance to academically motivated and deserving students. Award distributions are made semester-wise subject to continuous academic verification."}
              </p>
            </section>

            {/* Eligibility Criteria Details */}
            <section className="card" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "1.35rem", marginBottom: "16px", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px" }}>
                Detailed Eligibility Criteria
              </h2>
              <div className="details-eligibility-grid">
                <div>
                  <strong style={{ color: "var(--color-text-muted)" }}>Minimum Marks / Merit:</strong>
                  <div style={{ marginTop: "2px" }}>
                    {scholarship.eligibility?.minMarksPercent ? `${scholarship.eligibility.minMarksPercent}% Marks in prerequisite examination` : "No strict minimum percentage"}
                    {scholarship.eligibility?.minCGPA && ` (or ${scholarship.eligibility.minCGPA} CGPA)`}
                  </div>
                </div>

                <div>
                  <strong style={{ color: "var(--color-text-muted)" }}>Age Limit:</strong>
                  <div style={{ marginTop: "2px" }}>
                    {scholarship.eligibility?.ageMin && scholarship.eligibility?.ageMax
                      ? `${scholarship.eligibility.ageMin} – ${scholarship.eligibility.ageMax} Years`
                      : "No age restrictions"}
                  </div>
                </div>

                <div>
                  <strong style={{ color: "var(--color-text-muted)" }}>Eligible Districts / Domicile:</strong>
                  <div style={{ marginTop: "2px" }}>
                    {scholarship.eligibility?.eligibleDistricts?.join(", ") || "All Pakistan"}
                  </div>
                </div>

                <div>
                  <strong style={{ color: "var(--color-text-muted)" }}>Family Income Ceiling:</strong>
                  <div style={{ marginTop: "2px" }}>
                    {scholarship.eligibility?.incomeCeilingPKR
                      ? `Up to PKR ${scholarship.eligibility.incomeCeilingPKR.toLocaleString()}/month`
                      : "No income ceiling (Merit only)"}
                  </div>
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <strong style={{ color: "var(--color-text-muted)" }}>Eligible Institutions:</strong>
                  <div style={{ marginTop: "2px" }}>
                    {scholarship.eligibility?.eligibleInstitutions?.join(", ") || "All recognized public colleges & universities"}
                  </div>
                </div>
              </div>
            </section>

            {/* Required Supporting Documents Checklist */}
            <section className="card" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px" }}>
                Required Supporting Documents
              </h2>
              <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "16px" }}>
                Make sure you have scanned copies (JPG, PNG, or PDF, maximum 2MB each) ready before starting the wizard.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {scholarship.requiredDocuments?.map((doc, idx) => (
                  <div
                    key={doc.key || idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      backgroundColor: "var(--color-bg-surface)",
                      borderRadius: "6px",
                      fontSize: "13.5px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <FaFileAlt color="var(--color-primary)" />
                      <span>{doc.name}</span>
                    </div>
                    {doc.required ? (
                      <Badge variant="primary">Required</Badge>
                    ) : (
                      <Badge variant="neutral">Optional</Badge>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Application Fee & Transparent Policy */}
            <section className="card" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px" }}>
                Application Fee & Transparent Policy
              </h2>
              <div
                style={{
                  backgroundColor: isFree ? "var(--color-success-bg)" : "var(--color-warning-bg)",
                  border: `1px solid ${isFree ? "var(--color-success-border)" : "var(--color-warning-border)"}`,
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: "bold", color: isFree ? "var(--color-success)" : "var(--color-warning)", marginBottom: "4px" }}>
                  Payable Fee: {formatPKR(scholarship.applicationFee)}
                </div>
                <div style={{ fontSize: "13.5px", color: "var(--color-text-main)" }}>
                  <strong>Fee Purpose:</strong> {scholarship.feePurpose}
                </div>
                <div style={{ fontSize: "12.5px", color: "var(--color-text-subtle)", marginTop: "6px" }}>
                  <strong>Refund Policy:</strong> {scholarship.refundPolicy}
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "var(--color-text-subtle)", margin: 0 }}>
                Notice: Application fees (if any) are set solely by the sponsoring trust to cover localized verification field checks. It is NOT an official government or HEC charge.
              </p>
            </section>

            {/* Terms and Conditions */}
            <section className="card" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px" }}>
                Terms, Conditions & Renewal Guidelines
              </h2>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--color-text-muted)" }}>
                {scholarship.termsAndConditions || "Beneficiaries must maintain satisfactory academic progress and adhere to institutional codes of conduct. Any falsification of submitted transcripts or domicile results in permanent disqualification."}
              </p>
            </section>

            {/* FAQs */}
            {scholarship.faqs && scholarship.faqs.length > 0 && (
              <section className="card" style={{ padding: "24px" }}>
                <h2 style={{ fontSize: "1.35rem", marginBottom: "16px", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px" }}>
                  Frequently Asked Questions
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {scholarship.faqs.map((faq, i) => (
                    <div key={i} style={{ backgroundColor: "var(--color-bg-surface)", padding: "14px", borderRadius: "6px" }}>
                      <h4 style={{ fontSize: "14px", margin: "0 0 6px", color: "var(--color-text-main)" }}>
                        Q: {faq.q}
                      </h4>
                      <p style={{ fontSize: "13.5px", margin: 0, color: "var(--color-text-muted)", lineHeight: "1.5" }}>
                        A: {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar: Action & Eligibility Checker Widget */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Apply Action Card */}
            <div className="card details-sticky-sidebar" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "16px" }}>Take Action</h3>

              {deadlineInfo.isClosed ? (
                <div
                  style={{
                    backgroundColor: "var(--color-bg-surface)",
                    padding: "16px",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginBottom: "16px",
                  }}
                >
                  <FaExclamationTriangle color="var(--color-danger)" size={24} style={{ marginBottom: "8px" }} />
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>Application Cycle Closed</div>
                  <div style={{ fontSize: "12px", color: "var(--color-text-subtle)", marginTop: "4px" }}>
                    The deadline for this scheme has passed. Watch for next cycle announcements.
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: "20px" }}>
                  <Link
                    to={isStudent ? `/student/apply/${scholarship.id}` : `/student/login?redirect=/student/apply/${scholarship.id}`}
                    className="btn btn-primary"
                    style={{ width: "100%", padding: "12px", fontSize: "15px" }}
                  >
                    Start Online Application →
                  </Link>
                  <p style={{ fontSize: "11.5px", color: "var(--color-text-subtle)", textAlign: "center", marginTop: "8px", margin: 0 }}>
                    Step-by-step guided wizard • Save draft anytime
                  </p>
                </div>
              )}

              {/* Live Profile Match State if Student */}
              {isStudent && profileEligibility && (
                <div
                  style={{
                    border: `1px solid ${profileEligibility.eligible ? "var(--color-success-border)" : "var(--color-warning-border)"}`,
                    backgroundColor: profileEligibility.eligible ? "var(--color-success-bg)" : "var(--color-warning-bg)",
                    padding: "14px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "13.5px", color: profileEligibility.eligible ? "var(--color-success)" : "var(--color-warning)", marginBottom: "4px" }}>
                    {profileEligibility.label}
                  </div>
                  <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "12px", color: "var(--color-text-main)", lineHeight: "1.4" }}>
                    {profileEligibility.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  {profileEligibility.warnings.length > 0 && (
                    <div style={{ marginTop: "8px", fontSize: "11.5px", color: "var(--color-text-subtle)" }}>
                      Note: {profileEligibility.warnings.join(" ")}
                    </div>
                  )}
                </div>
              )}

              {/* Guest Eligibility Interactive Calculator */}
              {!isStudent && (
                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "16px" }}>
                  <h4 style={{ fontSize: "14px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FaCheckCircle color="var(--color-secondary)" /> Instant Eligibility Check
                  </h4>
                  <p style={{ fontSize: "12px", color: "var(--color-text-subtle)", marginBottom: "12px" }}>
                    Test your parameters against this scholarship without logging in:
                  </p>

                  <form onSubmit={handleCheckGuestEligibility} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: "bold" }}>Your Age</label>
                      <input
                        type="number"
                        className="form-input"
                        value={guestAge}
                        onChange={(e) => setGuestAge(e.target.value)}
                        min={12}
                        max={45}
                        style={{ padding: "6px 8px", fontSize: "12px" }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "11px", fontWeight: "bold" }}>Current Education</label>
                      <select
                        className="form-select"
                        value={guestLevel}
                        onChange={(e) => setGuestLevel(e.target.value)}
                        style={{ padding: "6px 8px", fontSize: "12px" }}
                      >
                        <option value="Undergraduate">Undergraduate / BS</option>
                        <option value="Intermediate">Intermediate / FA / FSc</option>
                        <option value="Matric">Matric / SSC</option>
                        <option value="Master's">Master's / MS</option>
                        <option value="Doctoral">PhD / Doctoral</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: "11px", fontWeight: "bold" }}>Marks Percentage (%)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={guestMarks}
                        onChange={(e) => setGuestMarks(e.target.value)}
                        min={30}
                        max={100}
                        style={{ padding: "6px 8px", fontSize: "12px" }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "11px", fontWeight: "bold" }}>Domicile District</label>
                      <input
                        type="text"
                        className="form-input"
                        value={guestDistrict}
                        onChange={(e) => setGuestDistrict(e.target.value)}
                        style={{ padding: "6px 8px", fontSize: "12px" }}
                      />
                    </div>

                    <Button type="submit" variant="secondary" size="sm" style={{ marginTop: "4px" }}>
                      Evaluate Eligibility
                    </Button>
                  </form>

                  {guestResult && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        backgroundColor: guestResult.eligible ? "var(--color-success-bg)" : "var(--color-danger-bg)",
                        color: guestResult.eligible ? "var(--color-success)" : "var(--color-danger)",
                        fontWeight: 600,
                      }}
                    >
                      <div>{guestResult.label}</div>
                      <div style={{ fontSize: "11px", fontWeight: "normal", marginTop: "4px" }}>
                        {guestResult.reasons[0]}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
