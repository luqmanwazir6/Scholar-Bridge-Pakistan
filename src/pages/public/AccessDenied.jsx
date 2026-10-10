import React from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaUserGraduate, FaUserShield } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export const AccessDenied = () => {
  const { role, loginAsDemoStudent, loginAsDemoAdmin } = useAuth();

  return (
    <div className="container" style={{ padding: "80px 16px", textAlign: "center" }}>
      <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "var(--color-danger-bg)", color: "var(--color-danger)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto 20px" }}>
        <FaShieldAlt />
      </div>

      <h1 style={{ fontSize: "2rem", marginBottom: "12px", color: "var(--color-text-main)" }}>
        Access Restricted
      </h1>

      <p style={{ color: "var(--color-text-subtle)", maxWidth: "500px", margin: "0 auto 24px", fontSize: "15px", lineHeight: "1.6" }}>
        Your current session role is <strong>{role.toUpperCase()}</strong>. You do not possess the administrative privileges or required role permissions to view this internal workspace.
      </p>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/" className="btn btn-outline">
          Return to Public Portal
        </Link>
        <button onClick={loginAsDemoStudent} className="btn btn-primary">
          <FaUserGraduate style={{ marginRight: "6px" }} /> Switch to Student Role
        </button>
        <button onClick={loginAsDemoAdmin} className="btn btn-secondary">
          <FaUserShield style={{ marginRight: "6px" }} /> Switch to Admin Role
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
