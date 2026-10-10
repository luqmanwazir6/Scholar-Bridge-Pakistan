import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import paymentService from "../../services/paymentService";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { formatPKR, formatDate } from "../../utils/formatters";
import { FaMoneyCheckAlt, FaCheck, FaUndo, FaEye, FaInfoCircle } from "react-icons/fa";

export const PaymentManagement = () => {
  const { payments, reloadAll } = useData();
  const { showSuccess, showError } = useToast();

  const [methodFilter, setMethodFilter] = useState("All");
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    paymentId: null,
    title: "",
    message: "",
    newStatus: "",
    isDanger: false,
  });

  const filtered = payments.filter(p => methodFilter === "All" || p.paymentMethod === methodFilter);

  const handleOpenAction = (payment, newStatus) => {
    let title = "Verify Bank Reconciliation";
    let message = `Are you sure you wish to mark payment Receipt #${payment.receiptNumber} (${formatPKR(payment.amountPKR)}) as verified?`;
    let isDanger = false;

    if (newStatus === "Refunded") {
      title = "Simulate Refund";
      message = `Simulate a full refund of ${formatPKR(payment.amountPKR)} for Receipt #${payment.receiptNumber}?`;
      isDanger = true;
    }

    setConfirmModal({
      isOpen: true,
      paymentId: payment.id,
      title,
      message,
      newStatus,
      isDanger,
    });
  };

  const handleConfirmAction = async () => {
    const { paymentId, newStatus } = confirmModal;
    setConfirmModal({ ...confirmModal, isOpen: false });

    try {
      await paymentService.updateStatus(
        paymentId,
        newStatus,
        newStatus === "Refunded" ? "Refund processed by admin desk." : "Bank slip reconciliation verified."
      );
      await reloadAll();
      showSuccess(`Payment status updated to '${newStatus}'.`);
    } catch (err) {
      showError("Failed to update payment status.");
    }
  };

  return (
    <div className="page-admin-payments">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0284C7", textTransform: "uppercase" }}>
            Financial Reconciliation
          </span>
          <h1 style={{ fontSize: "1.85rem", margin: "4px 0" }}>
            Payment & Bank Slip Reconciliation
          </h1>
          <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
            Inspect Easypaisa, JazzCash, and 1Link bank transfer simulated transactions.
          </p>
        </div>

        <div style={{ width: "200px" }}>
          <select
            className="form-select"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
          >
            <option value="All">All Payment Rails</option>
            <option value="easypaisa">Easypaisa</option>
            <option value="jazzcash">JazzCash</option>
            <option value="bank_transfer">Bank Transfer (1Link)</option>
          </select>
        </div>
      </div>

      {/* Backend Reconciliation Notice */}
      <div
        style={{
          backgroundColor: "#FEF3C7",
          border: "1px solid #F59E0B",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
          fontSize: "12.5px",
          lineHeight: "1.5",
          color: "#92400E",
          display: "flex",
          gap: "10px",
          alignItems: "flex-start",
        }}
      >
        <FaInfoCircle size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
        <div>
          <strong>Production Financial Integrity Notice:</strong> In this frontend prototype, payments are simulated. In a production backend, a payment is never marked verified based solely on user-entered transaction IDs or screenshot uploads. Real verification requires 1Link/Easypaisa IPN webhooks or direct bank statement reconciliation.
        </div>
      </div>

      {/* Table */}
      <div className="card table-responsive" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", minWidth: "650px", borderCollapse: "collapse", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--color-bg-surface)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Receipt No</th>
              <th style={{ padding: "12px 16px" }}>Candidate & Scheme</th>
              <th style={{ padding: "12px 16px" }}>Amount</th>
              <th style={{ padding: "12px 16px" }}>Rail & Mock TID</th>
              <th style={{ padding: "12px 16px" }}>Date</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
              <th style={{ padding: "12px 16px", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                  {p.receiptNumber}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ fontWeight: 600 }}>{p.studentName}</div>
                  <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)" }}>Ref: {p.applicationReference}</div>
                </td>
                <td style={{ padding: "12px 16px", fontWeight: "bold", color: "var(--color-primary-dark)" }}>
                  {formatPKR(p.amountPKR)}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ fontWeight: 500 }}>{p.paymentMethodName}</div>
                  <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--color-text-subtle)" }}>
                    {p.transactionReference}
                  </div>
                </td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-subtle)" }}>
                  {formatDate(p.paidAt, true)}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span
                    className={`badge ${
                      p.status.includes("Successful") || p.status === "Verified"
                        ? "badge-success"
                        : p.status === "Refunded"
                        ? "badge-danger"
                        : "badge-warning"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "6px" }}>
                    <Link to={`/student/payments/receipt/${p.id}`} className="btn btn-outline btn-sm" title="View printable receipt">
                      <FaEye /> Receipt
                    </Link>

                    {p.status === "Manual Verification Pending" && (
                      <button
                        onClick={() => handleOpenAction(p, "Verified")}
                        className="btn btn-secondary btn-sm"
                        title="Mark verified"
                      >
                        <FaCheck /> Verify
                      </button>
                    )}

                    {p.status !== "Refunded" && (
                      <button
                        onClick={() => handleOpenAction(p, "Refunded")}
                        className="btn btn-outline btn-sm"
                        style={{ color: "var(--color-danger)" }}
                        title="Simulate refund"
                      >
                        <FaUndo /> Refund
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={handleConfirmAction}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText="Confirm Transaction Action"
        isDanger={confirmModal.isDanger}
      />
    </div>
  );
};

export default PaymentManagement;
