import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { FaCog, FaShieldAlt, FaKey, FaBell, FaTrashAlt } from "react-icons/fa";

export const AccountSettings = () => {
  const { currentUser } = useAuth();
  const { resetDemoData } = useData();
  const { showSuccess, showInfo } = useToast();

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [passChanged, setPassChanged] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!newPass.trim()) return;
    setPassChanged(true);
    showSuccess("Password simulated update complete.");
    setCurrentPass("");
    setNewPass("");
  };

  const handleWithdrawConsent = () => {
    setShowConsentModal(false);
    showInfo("Consent withdrawal simulated. In production, this pauses pending applications.");
  };

  return (
    <div className="page-settings" style={{ maxWidth: "760px", margin: "0 auto", paddingBottom: "64px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.85rem", marginBottom: "6px" }}>Candidate Account Settings</h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
          Manage your login preferences, notification thresholds, and privacy permissions.
        </p>
      </div>

      {/* Account Info Card */}
      <div className="card" style={{ padding: "28px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>Account Credentials</h2>
        <div style={{ fontSize: "13.5px", color: "var(--color-text-muted)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
          <div><strong>Candidate ID:</strong> {currentUser?.id}</div>
          <div><strong>Registered Email:</strong> {currentUser?.email}</div>
          <div><strong>Role:</strong> Student (Applicant)</div>
          <div><strong>Consent Timestamp:</strong> {currentUser?.consentDate ? new Date(currentUser.consentDate).toLocaleDateString() : "Active"}</div>
        </div>

        {/* Change Password Demo Form */}
        <form onSubmit={handlePasswordSubmit} style={{ borderTop: "1px solid var(--color-border)", paddingTop: "16px" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <FaKey /> Update Password (Demo Simulation)
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Input
              label="Current Password"
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              placeholder="••••••••"
            />
            <Input
              label="New Password"
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" variant="outline" size="sm">
            Save New Password
          </Button>
        </form>
      </div>

      {/* Privacy & Consent Management */}
      <div className="card" style={{ padding: "28px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
          <FaShieldAlt color="var(--color-secondary)" /> Privacy & Data Consent
        </h2>
        <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: "1.5", marginBottom: "16px" }}>
          You have provided explicit consent for your academic records and domicile certificates to be reviewed by authorized scholarship verification committees.
        </p>

        <Button variant="outline" size="sm" onClick={() => setShowConsentModal(true)} style={{ color: "var(--color-danger)" }}>
          Withdraw Verification Consent
        </Button>
      </div>

      {/* Reset Demo Data Card */}
      <div className="card" style={{ padding: "28px", border: "1px dashed var(--color-border-dark)" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "10px" }}>Restore Demo State</h2>
        <p style={{ fontSize: "13.5px", color: "var(--color-text-subtle)", marginBottom: "16px" }}>
          Restores all student profiles, test applications, and demo documents to their original seeded state.
        </p>
        <Button variant="danger" size="sm" onClick={resetDemoData}>
          Reset All Prototype Data
        </Button>
      </div>

      {/* Consent Withdrawal Confirmation Modal */}
      <ConfirmDialog
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onConfirm={handleWithdrawConsent}
        title="Withdraw Data Consent?"
        message="Withdrawing consent will remove your documents from active verification queues and pause all in-progress scholarship evaluations. Are you sure you wish to withdraw?"
        confirmText="Yes, Withdraw Consent"
        isDanger={true}
      />
    </div>
  );
};

export default AccountSettings;
