import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import paymentService from "../../services/paymentService";
import applicationService from "../../services/applicationService";
import { PAYMENT_METHODS } from "../../config/paymentMethods";
import { formatPKR } from "../../utils/formatters";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { FaShieldAlt, FaInfoCircle, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

export const PaymentCheckout = () => {
  const { id } = useParams(); // application ID
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { applications, scholarships, reloadAll } = useData();
  const { showSuccess, showError } = useToast();

  const application = applications.find(a => a.id === id || a.referenceNumber === id);
  const scholarship = scholarships.find(s => s.id === application?.scholarshipId);

  const [selectedMethod, setSelectedMethod] = useState("easypaisa");
  const [txnId, setTxnId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!application) {
    return (
      <div className="container" style={{ padding: "64px 16px", textAlign: "center" }}>
        <h2>Application Not Found</h2>
        <Link to="/student/applications" className="btn btn-primary">Back to Applications</Link>
      </div>
    );
  }

  const feeAmount = scholarship?.applicationFee || 250;
  const currentMethodConfig = PAYMENT_METHODS.find(m => m.id === selectedMethod) || PAYMENT_METHODS[0];

  const handleSimulatePayment = async (e) => {
    e.preventDefault();
    if (!txnId.trim()) {
      setError("Please provide your simulated transaction ID (e.g. EP-8923471-MOCK).");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payment = await paymentService.createPayment({
        applicationId: application.id,
        applicationReference: application.referenceNumber,
        studentId: currentUser.id,
        studentName: currentUser.fullName,
        scholarshipTitle: application.scholarshipTitle,
        amountPKR: feeAmount,
        paymentMethod: selectedMethod,
        feePurpose: scholarship?.feePurpose || "Application processing token fee",
        userTxnId: txnId,
      });

      // Update application fee status to Paid
      await applicationService.updateStatus(
        application.id,
        application.status,
        `Payment of PKR ${feeAmount} recorded via ${currentMethodConfig.name}`
      );

      await reloadAll();
      showSuccess(`Payment simulated successfully! Receipt #${payment.receiptNumber} generated.`);
      navigate(`/student/payments/receipt/${payment.id}`);
    } catch (err) {
      setError(err.message || "Payment simulation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-checkout" style={{ maxWidth: "760px", margin: "0 auto", paddingBottom: "64px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to={`/student/applications/${application.id}`} style={{ color: "var(--color-text-muted)", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <FaArrowLeft size={12} /> Back to Application
        </Link>
      </div>

      <div className="card" style={{ padding: "32px", backgroundColor: "#FFFFFF" }}>
        <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "18px", marginBottom: "24px" }}>
          <span style={{ fontSize: "12px", color: "var(--color-text-subtle)", textTransform: "uppercase", fontWeight: "bold" }}>
            Application Fee Simulation
          </span>
          <h1 style={{ fontSize: "1.85rem", margin: "4px 0" }}>
            Secure Fee Checkout
          </h1>
          <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
            Application: <strong>{application.scholarshipTitle}</strong> (#{application.referenceNumber})
          </p>
        </div>

        {/* Amount & Purpose Notice */}
        <div
          style={{
            backgroundColor: "var(--color-primary-50)",
            border: "1px solid var(--color-primary-100)",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "28px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <div style={{ fontSize: "12px", color: "var(--color-primary-dark)", textTransform: "uppercase", fontWeight: "bold" }}>Total Payable</div>
              <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--color-primary-dark)" }}>
                {formatPKR(feeAmount)}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className="badge badge-warning">Simulated Sandbox</span>
            </div>
          </div>

          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(13, 71, 161, 0.15)", fontSize: "13px", color: "var(--color-text-muted)", lineHeight: "1.5" }}>
            <div><strong>Fee Purpose:</strong> {scholarship?.feePurpose || "Document verification and verification field-check token charge."}</div>
            <div style={{ marginTop: "4px" }}><strong>Refund Policy:</strong> {scholarship?.refundPolicy || "Non-refundable once verification desk review commences."}</div>
            <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)", marginTop: "6px" }}>
              Notice: This token fee is established by the scholarship sponsor. It is NOT an official government charge.
            </div>
          </div>
        </div>

        {/* Payment Rail Selectors */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", marginBottom: "12px" }}>
            Choose Payment Method:
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            {PAYMENT_METHODS.filter(m => m.active).map(m => (
              <div
                key={m.id}
                onClick={() => setSelectedMethod(m.id)}
                style={{
                  border: `2px solid ${selectedMethod === m.id ? "var(--color-primary)" : "var(--color-border)"}`,
                  backgroundColor: selectedMethod === m.id ? "var(--color-primary-50)" : "#FFFFFF",
                  borderRadius: "8px",
                  padding: "16px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "6px" }}>{m.icon}</div>
                <div style={{ fontWeight: "bold", fontSize: "14px", color: "var(--color-text-main)" }}>{m.name}</div>
                <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)", marginTop: "4px" }}>
                  {m.badgeText}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Method Instructions */}
        <div
          style={{
            backgroundColor: "var(--color-bg-surface)",
            padding: "18px",
            borderRadius: "8px",
            marginBottom: "24px",
            border: "1px solid var(--color-border)",
          }}
        >
          <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>
            {currentMethodConfig.name} Instructions
          </h4>
          <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: "1.5", marginBottom: "12px" }}>
            {currentMethodConfig.instructions}
          </p>
          <div style={{ fontSize: "13px", padding: "8px 12px", backgroundColor: "#FFFFFF", borderRadius: "6px", border: "1px dashed var(--color-border-dark)" }}>
            <strong>Account Number:</strong> <code>{currentMethodConfig.accountNumber}</code> ({currentMethodConfig.accountTitle})
          </div>
        </div>

        {/* Transaction ID input form */}
        <form onSubmit={handleSimulatePayment}>
          <Input
            label="Simulated Transaction ID (TID) / Deposit Slip No."
            placeholder="e.g. EP-8923471-MOCK"
            value={txnId}
            onChange={(e) => { setTxnId(e.target.value); setError(null); }}
            required
            error={error}
            hint="Enter any mock alphanumeric string to simulate payment confirmation."
          />

          <Button type="submit" variant="primary" loading={loading} style={{ width: "100%", padding: "12px", fontSize: "15px", marginTop: "12px" }}>
            Confirm Simulated Payment of {formatPKR(feeAmount)} →
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaymentCheckout;
