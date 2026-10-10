import React, { useState } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { BRAND } from "../config/brand";
import DemoBanner from "../components/domain/DemoBanner";
import {
  FaChartPie,
  FaAward,
  FaFileInvoice,
  FaCheckDouble,
  FaMoneyCheckAlt,
  FaUserGraduate,
  FaGift,
  FaFileCsv,
  FaHistory,
  FaSlidersH,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaExternalLinkAlt,
} from "react-icons/fa";

export const AdminLayout = () => {
  const { currentUser, logout, loginAsDemoStudent } = useAuth();
  const { applications, documents, payments } = useData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const pendingApps = applications.filter(a => a.status === "Submitted" || a.status === "Under Review").length;
  const pendingDocs = documents.filter(d => d.status === "Uploaded" || d.status === "Under Verification").length;
  const pendingPayments = payments.filter(p => p.status === "Manual Verification Pending").length;

  const adminNavItems = [
    { to: "/admin/dashboard", label: "Overview", icon: <FaChartPie /> },
    { to: "/admin/scholarships", label: "Scholarships", icon: <FaAward /> },
    { to: "/admin/applications", label: "Applications Review", icon: <FaFileInvoice />, badge: pendingApps > 0 ? pendingApps : null },
    { to: "/admin/documents", label: "Document Verification", icon: <FaCheckDouble />, badge: pendingDocs > 0 ? pendingDocs : null },
    { to: "/admin/payments", label: "Payment Reconciliation", icon: <FaMoneyCheckAlt />, badge: pendingPayments > 0 ? pendingPayments : null },
    { to: "/admin/students", label: "Student Directory", icon: <FaUserGraduate /> },
    { to: "/admin/awards", label: "Award Management", icon: <FaGift /> },
    { to: "/admin/reports", label: "Reports & CSV Export", icon: <FaFileCsv /> },
    { to: "/admin/audit-logs", label: "Audit Trail", icon: <FaHistory /> },
    { to: "/admin/settings", label: "Admin Settings", icon: <FaSlidersH /> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#0F172A" }}>
      {/* Top Demo Banner */}
      <DemoBanner />

      {/* Top Mobile Bar */}
      <div
        className="mobile-admin-topbar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          backgroundColor: "#1E293B",
          borderBottom: "1px solid #334155",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle admin sidebar"
            style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#FFFFFF" }}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <span style={{ fontWeight: "bold", fontSize: "15px" }}>
            🛡 {BRAND.shortName} <span style={{ color: "#38BDF8", fontSize: "12px" }}>Admin Desk</span>
          </span>
        </div>
      </div>

      {/* Main Admin Shell */}
      <div style={{ display: "flex", flex: 1, backgroundColor: "var(--color-bg-main)" }}>
        {/* Admin Sidebar */}
        <aside
          className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
          style={{
            width: "var(--sidebar-width)",
            backgroundColor: "#0F172A",
            borderRight: "1px solid #1E293B",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            color: "#F8FAFC",
            transition: "transform 0.2s ease",
            zIndex: 80,
          }}
        >
          {/* Brand & Authority Header */}
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid #1E293B",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "#0284C7",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              🛡
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "16px", color: "#FFFFFF" }}>
                {BRAND.logo.text}
              </div>
              <div style={{ fontSize: "10.5px", color: "#38BDF8", fontWeight: 700, letterSpacing: "0.5px" }}>
                ADMIN CONTROL DESK
              </div>
            </div>
          </div>

          {/* Admin Identity Box */}
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid #1E293B",
              backgroundColor: "#1E293B",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: "13.5px", color: "#FFFFFF" }}>
              {currentUser?.fullName || "Admin Officer (DI Khan Desk)"}
            </div>
            <div style={{ fontSize: "11px", color: "#94A3B8" }}>
              {currentUser?.designation || "Provincial Verification Lead"}
            </div>
            <div style={{ fontSize: "10.5px", color: "#64748B", marginTop: "4px" }}>
              Zone: {BRAND.initialRegion}
            </div>
          </div>

          {/* Nav Items */}
          <nav style={{ padding: "12px 8px", flex: 1, display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto" }}>
            {adminNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `admin-nav-item ${isActive ? "active" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  color: "#94A3B8",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "15px" }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      backgroundColor: "#F59E0B",
                      color: "#000000",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "2px 6px",
                      borderRadius: "9999px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div style={{ padding: "16px", borderTop: "1px solid #1E293B", display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link
              to="/"
              style={{
                fontSize: "12px",
                color: "#38BDF8",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                padding: "6px 8px",
              }}
            >
              <FaExternalLinkAlt size={11} /> View Public Portal
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{
                width: "100%",
                justifyContent: "flex-start",
                gap: "10px",
                color: "#CBD5E1",
                borderColor: "#334155",
              }}
            >
              <FaSignOutAlt /> Sign Out Admin
            </button>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 75,
            }}
          />
        )}

        {/* Admin Content Area */}
        <main className="admin-content-main" style={{ flex: 1, padding: "28px var(--space-6)", maxWidth: "1300px", margin: "0 auto", width: "100%", overflowX: "hidden" }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        .admin-nav-item:hover {
          background-color: #1E293B;
          color: #FFFFFF !important;
        }
        .admin-nav-item.active {
          background-color: #0369A1;
          color: #FFFFFF !important;
          font-weight: 700;
        }
        @media (max-width: 900px) {
          .admin-sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
        }
        @media (max-width: 640px) {
          .admin-content-main {
            padding: 16px 12px !important;
          }
        }
        @media (max-width: 360px) {
          .admin-content-main {
            padding: 12px 8px !important;
          }
        }
        @media (min-width: 901px) {
          .mobile-admin-topbar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
