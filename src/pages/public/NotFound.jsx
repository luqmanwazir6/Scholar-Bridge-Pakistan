import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export const NotFound = () => {
  return (
    <div className="container" style={{ padding: "80px 16px", textAlign: "center" }}>
      <div style={{ fontSize: "72px", fontWeight: 800, color: "var(--color-primary)", lineHeight: 1, marginBottom: "16px" }}>
        404
      </div>
      <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>Page Not Found</h1>
      <p style={{ color: "var(--color-text-subtle)", maxWidth: "460px", margin: "0 auto 28px", fontSize: "15px" }}>
        The scholarship page, receipt reference, or portal URL you requested does not exist or may have been moved.
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
        <Link to="/scholarships" className="btn btn-outline">
          Browse All Scholarships
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
