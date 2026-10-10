import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import { API_CONFIG } from "../../config/apiConfig";
import { BRAND } from "../../config/brand";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { FaSlidersH, FaRedo, FaServer, FaShieldAlt, FaKey } from "react-icons/fa";

export const AdminSettings = () => {
  const { resetDemoData } = useData();
  const { showSuccess } = useToast();

  const [confirmReset, setConfirmReset] = useState(false);
  const [showEndpoints, setShowEndpoints] = useState(true);

  const handlePerformReset = () => {
    resetDemoData();
    setConfirmReset(false);
    showSuccess("All database tables and seed records restored to initial state.");
  };

  return (
    <div className="page-admin-settings" style={{ maxWidth: "860px", margin: "0 auto", paddingBottom: "64px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0284C7", textTransform: "uppercase" }}>
          System Administration
        </span>
        <h1 style={{ fontSize: "1.85rem", margin: "4px 0" }}>
          Platform Settings & System State
        </h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
          Manage local demo cache, inspect future REST API endpoints, and view integration architecture.
        </p>
      </div>

      {/* Demo Reset Card */}
      <div className="card" style={{ padding: "28px", marginBottom: "24px", border: "1px solid var(--color-warning-border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", margin: "0 0 6px", color: "var(--color-text-main)" }}>
              Reset Prototype Database State
            </h2>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", margin: 0, maxWidth: "560px", lineHeight: "1.5" }}>
              Clears all locally added test applications, simulated payment receipts, and uploaded documents, restoring the pristine default seed datasets (11 scholarships, demo candidate Ahmad Khan, audit trails).
            </p>
          </div>

          <Button
            variant="danger"
            onClick={() => setConfirmReset(true)}
            icon={<FaRedo />}
          >
            Reset All Demo Data
          </Button>
        </div>
      </div>

      {/* Production Readiness Architecture Card */}
      <div className="card" style={{ padding: "28px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
          <FaShieldAlt color="#0284C7" /> Production Security Guidance
        </h2>
        <div style={{ backgroundColor: "#F8FAFC", padding: "16px", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "13px", lineHeight: "1.6", color: "var(--color-text-muted)" }}>
          <p style={{ margin: "0 0 8px" }}>
            <strong>CRITICAL ARCHITECTURE NOTICE:</strong> Frontend browser storage (localStorage) is intended strictly for rapid prototyping and demonstration of UI workflows. It is <strong>NOT suitable for confidential production personal data</strong>.
          </p>
          <p style={{ margin: 0 }}>
            In a production release, all services in <code>src/services/</code> must be switched to invoke secure HTTP REST APIs communicating with an authenticated backend with JWT verification, AES-256 encrypted file vaults, and role-based permissions.
          </p>
        </div>
      </div>

      {/* Future API Endpoints Map Card */}
      <div className="card" style={{ padding: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <FaServer color="var(--color-secondary)" /> Future REST Endpoints Contract
          </h2>
          <button
            onClick={() => setShowEndpoints(!showEndpoints)}
            className="btn btn-outline btn-sm"
          >
            {showEndpoints ? "Hide Endpoints" : "Show Endpoints"}
          </button>
        </div>

        {showEndpoints && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12.5px", fontFamily: "var(--font-mono)" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--color-bg-surface)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
                  <th style={{ padding: "8px 12px" }}>Contract Key</th>
                  <th style={{ padding: "8px 12px" }}>Target Endpoint Route</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(API_CONFIG.ENDPOINTS).map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "8px 12px", color: "var(--color-primary-dark)", fontWeight: "bold" }}>
                      {k}
                    </td>
                    <td style={{ padding: "8px 12px", color: "#475569" }}>
                      {API_CONFIG.BASE_URL}{v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmReset}
        onClose={() => setConfirmReset(false)}
        onConfirm={handlePerformReset}
        title="Confirm Prototype Data Reset"
        message="This will overwrite all active applications, simulated transactions, and newly uploaded documents with the initial seed state. This action cannot be undone."
        confirmText="Yes, Reset Everything"
        isDanger={true}
      />
    </div>
  );
};

export default AdminSettings;
