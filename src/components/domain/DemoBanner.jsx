import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { FaUserGraduate, FaUserShield, FaRedo, FaInfoCircle } from "react-icons/fa";

export const DemoBanner = () => {
  const { currentUser, role, loginAsDemoStudent, loginAsDemoAdmin, logout } = useAuth();
  const { resetDemoData } = useData();
  const navigate = useNavigate();

  const handleSwitchToStudent = async () => {
    await loginAsDemoStudent();
    navigate("/student/dashboard");
  };

  const handleSwitchToAdmin = async () => {
    await loginAsDemoAdmin();
    navigate("/admin/dashboard");
  };

  return (
    <aside className="demo-banner" aria-label="Demo Prototype Notice Banner">
      <div className="demo-banner-content">
        <span className="demo-pill">DEMO MODE</span>
        <span>
          <strong>Synthetic Prototype:</strong> Sample educational data only. Not affiliated with HEC or any government body.
        </span>
        <span style={{ opacity: 0.8, fontSize: "11px" }}>
          Current Role: <strong>{role.toUpperCase()}</strong> {currentUser ? `(${currentUser.fullName})` : "(Guest)"}
        </span>
      </div>

      <div className="demo-banner-actions">
        {role !== "student" && (
          <button
            onClick={handleSwitchToStudent}
            className="btn-reset-demo"
            title="Log in immediately as demo student"
          >
            <FaUserGraduate style={{ marginRight: "4px" }} /> Demo Student
          </button>
        )}
        {role !== "admin" && (
          <button
            onClick={handleSwitchToAdmin}
            className="btn-reset-demo"
            title="Log in immediately as demo admin"
          >
            <FaUserShield style={{ marginRight: "4px" }} /> Demo Admin
          </button>
        )}
        <button
          onClick={resetDemoData}
          className="btn-reset-demo"
          title="Reset all localStorage records back to seed data"
        >
          <FaRedo style={{ marginRight: "4px" }} /> Reset Data
        </button>
      </div>
    </aside>
  );
};

export default DemoBanner;
