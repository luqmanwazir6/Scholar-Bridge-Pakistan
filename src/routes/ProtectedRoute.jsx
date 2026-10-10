import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { currentUser, role, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "3px solid #e2e8f0",
              borderTopColor: "var(--color-primary)",
              borderRadius: "50%",
              animation: "spin 0.6s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <p style={{ color: "var(--color-text-subtle)", fontSize: "14px" }}>Verifying demo credentials...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    const loginTarget = requiredRole === "admin" ? "/admin/login" : "/student/login";
    return <Navigate to={`${loginTarget}?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Role mismatch
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default ProtectedRoute;
