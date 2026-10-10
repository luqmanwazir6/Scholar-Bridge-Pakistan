import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { formatPKR, formatDate, getDeadlineStatus } from "../../utils/formatters";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { FaBalanceScale, FaTimes, FaPlus } from "react-icons/fa";

export const CompareScholarships = () => {
  const { scholarships } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const id1 = searchParams.get("id1") || scholarships[0]?.id || "";
  const id2 = searchParams.get("id2") || scholarships[1]?.id || "";
  const id3 = searchParams.get("id3") || "";

  const [selectedIds, setSelectedIds] = useState([id1, id2, id3].filter(Boolean));

  useEffect(() => {
    const params = {};
    if (selectedIds[0]) params.id1 = selectedIds[0];
    if (selectedIds[1]) params.id2 = selectedIds[1];
    if (selectedIds[2]) params.id3 = selectedIds[2];
    setSearchParams(params);
  }, [selectedIds, setSearchParams]);

  const selectedScholarships = selectedIds.map(id => scholarships.find(s => s.id === id)).filter(Boolean);

  const handleSelect = (index, newId) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);
  };

  const handleRemove = (index) => {
    setSelectedIds(selectedIds.filter((_, i) => i !== index));
  };

  const handleAddSlot = () => {
    if (selectedIds.length < 3) {
      const unused = scholarships.find(s => !selectedIds.includes(s.id));
      if (unused) {
        setSelectedIds([...selectedIds, unused.id]);
      }
    }
  };

  return (
    <div className="page-compare" style={{ padding: "40px 0 72px" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "bold", color: "var(--color-secondary)", textTransform: "uppercase" }}>
              Evaluation Matrix
            </div>
            <h1 style={{ fontSize: "2.2rem", margin: "4px 0" }}>
              Compare Scholarships
            </h1>
            <p style={{ color: "var(--color-text-subtle)", margin: 0, fontSize: "14.5px" }}>
              Evaluate up to 3 scholarship schemes side by side across coverage, criteria, and deadlines.
            </p>
          </div>

          {selectedIds.length < 3 && (
            <Button variant="outline" size="sm" onClick={handleAddSlot} icon={<FaPlus />}>
              Add 3rd Scholarship to Compare
            </Button>
          )}
        </div>

        {/* Comparison Selectors Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {selectedScholarships.map((sch, idx) => (
            <div key={idx} className="card" style={{ padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: "bold", color: "var(--color-text-subtle)" }}>
                  Slot {idx + 1}
                </span>
                {selectedScholarships.length > 1 && (
                  <button
                    onClick={() => handleRemove(idx)}
                    style={{ background: "none", border: "none", color: "var(--color-danger)", cursor: "pointer", padding: "4px" }}
                    title="Remove from comparison"
                  >
                    <FaTimes size={13} />
                  </button>
                )}
              </div>

              <select
                className="form-select"
                value={sch.id}
                onChange={(e) => handleSelect(idx, e.target.value)}
                style={{ fontSize: "13px" }}
              >
                {scholarships.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Matrix Table */}
        <div
          className="card table-responsive"
          style={{
            overflowX: "auto",
            backgroundColor: "#FFFFFF",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <table style={{ width: "100%", minWidth: "560px", borderCollapse: "collapse", fontSize: "13.5px" }}>
            <tbody>
              {/* Category */}
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "14px 18px", width: "220px", backgroundColor: "var(--color-bg-surface)", color: "var(--color-text-subtle)", textAlign: "left" }}>
                  Category & Sponsor
                </th>
                {selectedScholarships.map(s => (
                  <td key={s.id} style={{ padding: "14px 18px", verticalAlign: "top" }}>
                    <Badge variant="primary" style={{ marginBottom: "6px" }}>{s.category}</Badge>
                    <div style={{ fontWeight: 600, color: "var(--color-text-main)" }}>{s.sponsor}</div>
                  </td>
                ))}
              </tr>

              {/* Coverage */}
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "14px 18px", backgroundColor: "var(--color-bg-surface)", color: "var(--color-text-subtle)", textAlign: "left" }}>
                  Financial Coverage
                </th>
                {selectedScholarships.map(s => (
                  <td key={s.id} style={{ padding: "14px 18px", fontWeight: "bold", color: "var(--color-primary-dark)", verticalAlign: "top" }}>
                    {s.financialCoverage}
                  </td>
                ))}
              </tr>

              {/* Academic Cutoff */}
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "14px 18px", backgroundColor: "var(--color-bg-surface)", color: "var(--color-text-subtle)", textAlign: "left" }}>
                  Academic Requirement
                </th>
                {selectedScholarships.map(s => (
                  <td key={s.id} style={{ padding: "14px 18px", verticalAlign: "top" }}>
                    {s.eligibility?.minMarksPercent ? `${s.eligibility.minMarksPercent}% Marks` : "Open"}
                    {s.eligibility?.minCGPA ? ` (or ${s.eligibility.minCGPA} CGPA)` : ""}
                  </td>
                ))}
              </tr>

              {/* Age Limits */}
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "14px 18px", backgroundColor: "var(--color-bg-surface)", color: "var(--color-text-subtle)", textAlign: "left" }}>
                  Age Range
                </th>
                {selectedScholarships.map(s => (
                  <td key={s.id} style={{ padding: "14px 18px", verticalAlign: "top" }}>
                    {s.eligibility?.ageMin ? `${s.eligibility.ageMin} – ${s.eligibility.ageMax} Years` : "No limit"}
                  </td>
                ))}
              </tr>

              {/* District */}
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "14px 18px", backgroundColor: "var(--color-bg-surface)", color: "var(--color-text-subtle)", textAlign: "left" }}>
                  Eligible Domicile
                </th>
                {selectedScholarships.map(s => (
                  <td key={s.id} style={{ padding: "14px 18px", verticalAlign: "top" }}>
                    {s.eligibility?.eligibleDistricts?.join(", ") || "All Pakistan"}
                  </td>
                ))}
              </tr>

              {/* Income Ceiling */}
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "14px 18px", backgroundColor: "var(--color-bg-surface)", color: "var(--color-text-subtle)", textAlign: "left" }}>
                  Income Ceiling
                </th>
                {selectedScholarships.map(s => (
                  <td key={s.id} style={{ padding: "14px 18px", verticalAlign: "top" }}>
                    {s.eligibility?.incomeCeilingPKR ? `Up to PKR ${s.eligibility.incomeCeilingPKR.toLocaleString()}/mo` : "None (Merit)"}
                  </td>
                ))}
              </tr>

              {/* Application Fee */}
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "14px 18px", backgroundColor: "var(--color-bg-surface)", color: "var(--color-text-subtle)", textAlign: "left" }}>
                  Application Fee
                </th>
                {selectedScholarships.map(s => (
                  <td key={s.id} style={{ padding: "14px 18px", verticalAlign: "top" }}>
                    {Number(s.applicationFee) === 0 ? (
                      <Badge variant="success">Free (PKR 0)</Badge>
                    ) : (
                      <Badge variant="warning">{formatPKR(s.applicationFee)}</Badge>
                    )}
                  </td>
                ))}
              </tr>

              {/* Deadline */}
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "14px 18px", backgroundColor: "var(--color-bg-surface)", color: "var(--color-text-subtle)", textAlign: "left" }}>
                  Deadline & Status
                </th>
                {selectedScholarships.map(s => {
                  const dl = getDeadlineStatus(s.deadline);
                  return (
                    <td key={s.id} style={{ padding: "14px 18px", verticalAlign: "top" }}>
                      <div>{formatDate(s.deadline)}</div>
                      <span style={{ fontSize: "12px", color: dl.isUrgent ? "var(--color-danger)" : "var(--color-text-subtle)", fontWeight: "bold" }}>
                        ({dl.label})
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Action row */}
              <tr>
                <th style={{ padding: "14px 18px", backgroundColor: "var(--color-bg-surface)", color: "var(--color-text-subtle)", textAlign: "left" }}>
                  Action
                </th>
                {selectedScholarships.map(s => (
                  <td key={s.id} style={{ padding: "14px 18px", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link to={`/scholarships/${s.id}`} className="btn btn-outline btn-sm">
                        Details
                      </Link>
                      <Link to={`/student/apply/${s.id}`} className="btn btn-primary btn-sm">
                        Apply Now
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareScholarships;
