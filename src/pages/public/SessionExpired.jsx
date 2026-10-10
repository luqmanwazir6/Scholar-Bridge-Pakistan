import React from "react";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export const SessionExpired = () => {
  const { loginAsDemoStudent } = useAuth();

  return (
    <div className="container" style={{ padding: "80px 16px", textAlign: "center" }}>
      <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "var(--color-warning-bg)", color: "var(--color-warning)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto 20px" }}>
        <FaClock />
      </div>

      <h1 style={{ fontSize: "2rem", marginBottom: "12px", color: "var(--color-text-main)" }}>
        Session Expired (Demo)
      </h1>

      <p style={{ color: "var(--color-text-subtle)", maxWidth: "480px", margin: "0 auto 24px", fontSize: "15px", lineHeight: "1.6" }}>
        Your simulated session has timed out due to inactivity. In a production backend, JWT refresh tokens would seamlessly refresh or prompt for re-authentication.
      </p>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button onClick={loginAsDemoStudent} className="btn btn-primary">
          Restore Demo Student Session
        </button>
        <Link to="/student/login" className="btn btn-outline">
          Go to Login Screen
        </Link>
      </div>
    </div>
  );
};

export default SessionExpired;
