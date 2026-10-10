import React from "react";
import Button from "../ui/Button";
import { formatPKR, formatDate } from "../../utils/formatters";
import { BRAND } from "../../config/brand";
import { FaPrint, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export const ReceiptPreview = ({ payment }) => {
  if (!payment) return null;

  const handlePrint = () => {
    window.print();
  };

  const isSimulated = payment.isSimulated ?? true;
  const isVerified = payment.status?.includes("Successful") || payment.status === "Verified";

  return (
    <div className="printable-receipt-container" style={{ maxWidth: "680px", margin: "0 auto" }}>
      {/* Top action bar (hidden during print) */}
      <div
        className="no-print"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          gap: "12px",
        }}
      >
        <div style={{ fontSize: "13px", color: "var(--color-text-subtle)" }}>
          Official Prototype Payment Voucher & E-Receipt
        </div>
        <Button variant="outline" size="sm" onClick={handlePrint} icon={<FaPrint />}>
          Print / Save PDF Receipt
        </Button>
      </div>

      {/* Printable Receipt Card */}
      <div
        className="card printable-card"
        style={{
          padding: "36px",
          backgroundColor: "#FFFFFF",
          border: "2px solid #0f172a",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        {/* Simulation Watermark Banner */}
        <div
          style={{
            backgroundColor: "#FEF3C7",
            border: "1px solid #F59E0B",
            color: "#92400E",
            padding: "8px 12px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "12px",
            borderRadius: "6px",
            marginBottom: "24px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          DEMO RECEIPT — NOT A VALID FINANCIAL OR LEGAL TAX DOCUMENT
        </div>

        {/* Header Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderBottom: "2px solid var(--color-border)",
            paddingBottom: "20px",
            marginBottom: "24px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "28px" }}>{BRAND.logo.symbol}</span>
              <h2 style={{ fontSize: "1.4rem", margin: 0, color: "var(--color-primary-dark)" }}>
                {BRAND.name}
              </h2>
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-text-subtle)" }}>
              Scholarship Verification & Regional Desk (DI Khan, KP)
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-text-subtle)" }}>
              Email: {BRAND.contact.email} | Support: {BRAND.contact.phone}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "12px", color: "var(--color-text-subtle)", textTransform: "uppercase" }}>
              Receipt Number
            </div>
            <div style={{ fontSize: "18px", fontWeight: "bold", fontFamily: "var(--font-mono)", color: "var(--color-primary)" }}>
              {payment.receiptNumber}
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-text-subtle)", marginTop: "4px" }}>
              Date: {formatDate(payment.paidAt, true)}
            </div>
          </div>
        </div>

        {/* Status Callout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            backgroundColor: isVerified ? "var(--color-success-bg)" : "var(--color-warning-bg)",
            border: `1px solid ${isVerified ? "var(--color-success-border)" : "var(--color-warning-border)"}`,
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {isVerified ? <FaCheckCircle color="var(--color-success)" size={18} /> : <FaExclamationTriangle color="var(--color-warning)" size={18} />}
            <div>
              <div style={{ fontWeight: "bold", fontSize: "14px", color: isVerified ? "var(--color-success)" : "var(--color-warning)" }}>
                Status: {payment.status}
              </div>
              <div style={{ fontSize: "11px", color: "var(--color-text-subtle)" }}>
                {payment.remarks || "Payment simulated in local testing environment."}
              </div>
            </div>
          </div>

          <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--color-primary-dark)" }}>
            {formatPKR(payment.amountPKR)}
          </div>
        </div>

        {/* Transaction Particulars Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", marginBottom: "28px" }}>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "8px 0", color: "var(--color-text-subtle)", width: "38%" }}>Applicant Name:</td>
              <td style={{ padding: "8px 0", fontWeight: 600 }}>{payment.studentName}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "8px 0", color: "var(--color-text-subtle)" }}>Application Reference:</td>
              <td style={{ padding: "8px 0", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
                {payment.applicationReference}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "8px 0", color: "var(--color-text-subtle)" }}>Scholarship Scheme:</td>
              <td style={{ padding: "8px 0", fontWeight: 600 }}>{payment.scholarshipTitle}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "8px 0", color: "var(--color-text-subtle)" }}>Fee Purpose:</td>
              <td style={{ padding: "8px 0" }}>{payment.feePurpose}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "8px 0", color: "var(--color-text-subtle)" }}>Payment Method:</td>
              <td style={{ padding: "8px 0", fontWeight: 600 }}>{payment.paymentMethodName}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "8px 0", color: "var(--color-text-subtle)" }}>Transaction ID (TID):</td>
              <td style={{ padding: "8px 0", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
                {payment.transactionReference}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Footer notes */}
        <div
          style={{
            borderTop: "1px dashed var(--color-border-dark)",
            paddingTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "11px",
            color: "var(--color-text-subtle)",
          }}
        >
          <div style={{ maxWidth: "380px" }}>
            <p style={{ margin: 0, marginBottom: "4px" }}>
              <strong>Notice:</strong> Application fees are determined by the respective scholarship sponsor or trust and are non-refundable once administrative verification commences.
            </p>
            <p style={{ margin: 0 }}>
              Generated electronically via ScholarBridge Pakistan Demo Engine.
            </p>
          </div>

          {/* Synthetic Seal & Barcode Placeholder */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                border: "2px double #0d47a1",
                borderRadius: "50%",
                width: "64px",
                height: "64px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "8.5px",
                color: "#0d47a1",
                fontWeight: "bold",
                margin: "0 auto 4px",
              }}
            >
              <span>DEMO</span>
              <span>SBP-DESK</span>
              <span>VERIFIED</span>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px" }}>
              ||||| |||| |||||
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPreview;
