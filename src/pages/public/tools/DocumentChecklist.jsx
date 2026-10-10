import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuSquareCheck,
  LuSquare,
  LuFileText,
  LuDownload,
  LuPrinter,
  LuSparkles,
  LuShieldAlert,
} from "react-icons/lu";

const CHECKLIST_ITEMS = [
  { id: "cnic", title: "Applicant CNIC or NADRA B-Form", category: "identity", desc: "Original scanned or attested photocopy with visible 13-digit number.", required: true },
  { id: "parent_cnic", title: "Father / Guardian's CNIC", category: "identity", desc: "Valid CNIC front and back copy.", required: true },
  { id: "domicile", title: "District Domicile Certificate", category: "domicile", desc: "KP Domicile (e.g. Dera Ismail Khan, Bannu, Tank, etc.).", required: true },
  { id: "matric", title: "Matriculation (SSC) Sanad & DMC", category: "academic", desc: "Board verified Detailed Marks Certificate.", required: true },
  { id: "inter", title: "Intermediate (HSSC) Sanad & DMC", category: "academic", desc: "Pre-Engineering / Pre-Medical / ICS / FA DMC.", required: true },
  { id: "income", title: "Father / Guardian Salary Slip or Income Affidavit", category: "financial", desc: "From employer or Oath Commissioner on PKR 50/100 stamp paper.", required: true },
  { id: "bills", title: "Paid Electricity & Utility Bills (Last 3 Months)", category: "financial", desc: "Required for need-based verification and household assessment.", required: true },
  { id: "photos", title: "Passport Size Blue-Background Photographs", category: "identity", desc: "Recent formal photographs (un-edited, formal attire).", required: true },
  { id: "character", title: "Character Certificate from Last Attended College", category: "academic", desc: "Signed and stamped by Principal or Head of Institution.", required: false },
  { id: "death_cert", title: "Father's Death Certificate (If Orphan)", category: "financial", desc: "Issued by Union Council or NADRA (if applicable for orphan quotas).", required: false },
];

export const DocumentChecklist = () => {
  const [checkedIds, setCheckedIds] = useState(["cnic", "domicile", "matric"]);
  const [filterCat, setFilterCat] = useState("all");

  const toggleCheck = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredItems = filterCat === "all"
    ? CHECKLIST_ITEMS
    : CHECKLIST_ITEMS.filter((item) => item.category === filterCat);

  const progressPercent = Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="container" style={{ padding: "48px 16px", maxWidth: "960px" }}>
      <div style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "16px" }}>
        <Link to="/" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Home</Link> / <span>Tools</span> / <span style={{ color: "var(--color-text-main)" }}>Document Checklist</span>
      </div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, marginBottom: "12px", color: "var(--color-primary-dark)" }}>
          Scholarship Document Checklist
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "16px", maxWidth: "650px", margin: "0 auto" }}>
          Track and prepare all mandatory documents before applying to Pakistani merit and need-based scholarship schemes.
        </p>
      </div>

      {/* Progress Bar Header */}
      <div
        style={{
          background: "var(--color-bg-card)",
          padding: "24px 28px",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-sm)",
          marginBottom: "28px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <div style={{ flex: "1 1 300px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: 700, fontSize: "14px" }}>
            <span>Checklist Readiness</span>
            <span style={{ color: "var(--color-primary)" }}>{progressPercent}% Complete ({checkedIds.length}/{CHECKLIST_ITEMS.length})</span>
          </div>
          <div style={{ height: "10px", backgroundColor: "var(--color-bg-subtle)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progressPercent}%`,
                background: progressPercent === 100 ? "var(--color-success)" : "var(--color-primary)",
                borderRadius: "var(--radius-full)",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => window.print()}
            className="btn btn-outline btn-sm"
            style={{ borderRadius: "var(--radius-full)" }}
          >
            <LuPrinter /> Print Checklist
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {[
          { key: "all", label: "All Documents" },
          { key: "identity", label: "Identity & NADRA" },
          { key: "academic", label: "Academic Records" },
          { key: "financial", label: "Income & Financial" },
          { key: "domicile", label: "Domicile & Regional" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterCat(tab.key)}
            className={`btn btn-sm ${filterCat === tab.key ? "btn-primary" : "btn-ghost"}`}
            style={{ borderRadius: "var(--radius-full)" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredItems.map((item) => {
          const isDone = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "16px 20px",
                backgroundColor: isDone ? "rgba(13, 71, 161, 0.03)" : "var(--color-bg-card)",
                borderRadius: "var(--radius-lg)",
                border: isDone ? "1px solid rgba(13, 71, 161, 0.3)" : "1px solid var(--color-border)",
                cursor: "pointer",
                transition: "all var(--transition-fast)",
              }}
            >
              <div style={{ fontSize: "22px", color: isDone ? "var(--color-primary)" : "var(--color-text-subtle)", marginTop: "2px" }}>
                {isDone ? <LuSquareCheck /> : <LuSquare />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: isDone ? "var(--color-text-muted)" : "var(--color-text-main)",
                      textDecoration: isDone ? "line-through" : "none",
                    }}
                  >
                    {item.title}
                  </span>
                  {item.required && (
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-danger)", background: "rgba(239, 68, 68, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>
                      Mandatory
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "32px",
          padding: "16px",
          borderRadius: "var(--radius-md)",
          backgroundColor: "rgba(245, 158, 11, 0.08)",
          border: "1px solid rgba(245, 158, 11, 0.2)",
          fontSize: "12.5px",
          color: "var(--color-text-main)",
          display: "flex",
          gap: "10px",
        }}
      >
        <LuShieldAlert color="var(--color-warning)" style={{ fontSize: "20px", flexShrink: 0 }} />
        <div>
          <strong>Document Protection Notice:</strong> In this prototype demo, never upload real confidential CNICs or sensitive bank statements. The system operates locally and safely converts mock uploads into in-memory object previews only.
        </div>
      </div>
    </div>
  );
};

export default DocumentChecklist;
