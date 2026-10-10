import React from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import ReceiptPreview from "../../components/domain/ReceiptPreview";
import { FaArrowLeft } from "react-icons/fa";

export const ReceiptDetails = () => {
  const { id } = useParams();
  const { payments } = useData();

  const payment = payments.find(p => p.id === id || p.receiptNumber === id || p.applicationId === id);

  if (!payment) {
    return (
      <div className="container" style={{ padding: "64px 16px", textAlign: "center" }}>
        <h2>Receipt Not Found</h2>
        <p style={{ color: "var(--color-text-subtle)", marginBottom: "20px" }}>
          The requested receipt could not be located in simulated transaction records.
        </p>
        <Link to="/student/applications" className="btn btn-primary">
          Back to Applications
        </Link>
      </div>
    );
  }

  return (
    <div className="page-receipt-details" style={{ padding: "20px 0 64px" }}>
      <div className="no-print" style={{ maxWidth: "680px", margin: "0 auto 16px" }}>
        <Link to="/student/applications" style={{ color: "var(--color-text-muted)", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <FaArrowLeft size={12} /> Back to My Applications
        </Link>
      </div>

      <ReceiptPreview payment={payment} />
    </div>
  );
};

export default ReceiptDetails;
