import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_CONFIG } from "../../config/apiConfig";

export const CookieNotice = () => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const hasConsent = localStorage.getItem(API_CONFIG.STORAGE_KEYS.COOKIE_CONSENT);
    if (!hasConsent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(API_CONFIG.STORAGE_KEYS.COOKIE_CONSENT, "true");
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div
      role="region"
      aria-label="Privacy and Session Notice"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#0F172A",
        color: "#F8FAFC",
        borderTop: "1px solid #334155",
        padding: "14px 20px",
        zIndex: 9990,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
        fontSize: "13px",
      }}
    >
      <div style={{ maxWidth: "800px" }}>
        <span>
          🍪 <strong>Session & Privacy Notice:</strong> This prototype uses browser local storage strictly to remember your active demo session and simulated applications. No tracking cookies are stored or shared.
        </span>{" "}
        <Link to="/privacy-policy" style={{ color: "#38BDF8", textDecoration: "underline" }}>
          Read Privacy Policy
        </Link>
      </div>

      <button
        onClick={handleAccept}
        className="btn btn-primary btn-sm"
        style={{ whiteSpace: "nowrap" }}
      >
        Acknowledge & Dismiss
      </button>
    </div>
  );
};

export default CookieNotice;
