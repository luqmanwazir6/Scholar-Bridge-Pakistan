import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import applicationService from "../../services/applicationService";
import StatusBadge from "../../components/domain/StatusBadge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import { formatPKR, formatDate } from "../../utils/formatters";
import { FaAward, FaGift, FaCheckCircle } from "react-icons/fa";

export const AwardManagement = () => {
  const { applications, reloadAll } = useData();
  const { showSuccess, showError } = useToast();

  const [selectedApp, setSelectedApp] = useState(null);
  const [awardForm, setAwardForm] = useState({
    awardAmountPKR: 85000,
    equipmentGranted: "Dell Latitude Core i5 Laptop Grant Voucher #STEM-KP-042",
    disbursementDate: new Date().toISOString().split("T")[0],
    disbursementMethod: "Direct Institutional Bank Voucher to University Treasurer",
    academicYear: "2026-2027",
  });
  const [loading, setLoading] = useState(false);

  // Filter approved or already awarded applications
  const awardList = applications.filter(a => a.status === "Approved" || a.status === "Awarded");

  const handleOpenDisburse = (app) => {
    setSelectedApp(app);
    setAwardForm({
      awardAmountPKR: 85000,
      equipmentGranted: "Higher Education Laptop Voucher #SBP-VOUCH-01",
      disbursementDate: new Date().toISOString().split("T")[0],
      disbursementMethod: "Direct Institutional Bank Voucher to University Treasurer",
      academicYear: "2026-2027",
    });
  };

  const handleDisburseSubmit = async (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    setLoading(true);
    try {
      await applicationService.awardScholarship(selectedApp.id, {
        awardAmountPKR: parseInt(awardForm.awardAmountPKR, 10),
        equipmentGranted: awardForm.equipmentGranted,
        disbursementDate: awardForm.disbursementDate,
        disbursementMethod: awardForm.disbursementMethod,
        academicYear: awardForm.academicYear,
      });

      await reloadAll();
      showSuccess(`Award disbursed to candidate #${selectedApp.referenceNumber}! Status changed to 'Awarded'.`);
      setSelectedApp(null);
    } catch (err) {
      showError("Failed to disburse award.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-admin-awards">
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0284C7", textTransform: "uppercase" }}>
          Endowment Grant Release
        </span>
        <h1 style={{ fontSize: "1.85rem", margin: "4px 0" }}>
          Award Distribution & Grant Release
        </h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
          Manage fund disbursement vouchers and finalize awards for verified candidate applications.
        </p>
      </div>

      {/* Explanatory Notice */}
      <div
        style={{
          backgroundColor: "#EFF6FF",
          border: "1px solid #BFDBFE",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
          fontSize: "13px",
          lineHeight: "1.5",
          color: "#1E40AF",
        }}
      >
        <strong>Workflow Distinction:</strong> 'Approved' marks that candidate credentials meet all regulations. Use this workspace to record the final release of funds, tuition vouchers, or hardware equipment grants to officially transition an application to <strong>'Awarded / Disbursed'</strong>.
      </div>

      {/* Table */}
      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--color-bg-surface)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Reference</th>
              <th style={{ padding: "12px 16px" }}>Candidate & Scheme</th>
              <th style={{ padding: "12px 16px" }}>Approved Date</th>
              <th style={{ padding: "12px 16px" }}>Current Status</th>
              <th style={{ padding: "12px 16px" }}>Award Particulars</th>
              <th style={{ padding: "12px 16px", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {awardList.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "36px", textAlign: "center", color: "var(--color-text-subtle)" }}>
                  No approved or awarded applications currently on record. Approve candidate applications in the Review Desk first.
                </td>
              </tr>
            ) : (
              awardList.map((app) => (
                <tr key={app.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                    {app.referenceNumber}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: 600 }}>{app.scholarshipTitle}</div>
                    <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)" }}>Candidate: {app.studentId}</div>
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--color-text-subtle)" }}>
                    {formatDate(app.updatedAt)}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <StatusBadge status={app.status} />
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {app.awardDetails ? (
                      <div>
                        <strong style={{ color: "var(--color-success)" }}>{formatPKR(app.awardDetails.awardAmountPKR)}</strong>
                        <div style={{ fontSize: "11px", color: "var(--color-text-subtle)" }}>{app.awardDetails.disbursementMethod}</div>
                      </div>
                    ) : (
                      <span style={{ color: "var(--color-text-subtle)", fontSize: "12px" }}>Awaiting disbursement details</span>
                    )}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    {app.status === "Approved" ? (
                      <button
                        onClick={() => handleOpenDisburse(app)}
                        className="btn btn-primary btn-sm"
                        style={{ backgroundColor: "#0284C7" }}
                      >
                        <FaGift /> Disburse Award
                      </button>
                    ) : (
                      <span style={{ fontSize: "12px", color: "var(--color-success)", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <FaCheckCircle /> Disbursed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Disburse Award Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Disburse Award: ${selectedApp.referenceNumber}`}
          maxWidth="600px"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setSelectedApp(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleDisburseSubmit} loading={loading}>
                Confirm Grant Release & Notify Student
              </Button>
            </>
          }
        >
          <form onSubmit={handleDisburseSubmit}>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px" }}>
              Scheme: {selectedApp.scholarshipTitle}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Input
                label="Grant Amount (PKR)"
                type="number"
                value={awardForm.awardAmountPKR}
                onChange={(e) => setAwardForm({ ...awardForm, awardAmountPKR: e.target.value })}
                required
              />

              <Input
                label="Academic Year Cycle"
                value={awardForm.academicYear}
                onChange={(e) => setAwardForm({ ...awardForm, academicYear: e.target.value })}
                required
              />
            </div>

            <Input
              label="Hardware / Equipment Grant (Optional)"
              value={awardForm.equipmentGranted}
              onChange={(e) => setAwardForm({ ...awardForm, equipmentGranted: e.target.value })}
              placeholder="e.g. Laptop Grant Voucher #STEM-KP-042"
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "16px" }}>
              <Input
                label="Release Date"
                type="date"
                value={awardForm.disbursementDate}
                onChange={(e) => setAwardForm({ ...awardForm, disbursementDate: e.target.value })}
                required
              />

              <Input
                label="Disbursement Channel"
                value={awardForm.disbursementMethod}
                onChange={(e) => setAwardForm({ ...awardForm, disbursementMethod: e.target.value })}
                required
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AwardManagement;
