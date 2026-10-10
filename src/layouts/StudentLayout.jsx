import React, { useState } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { BRAND } from "../config/brand";
import DemoBanner from "../components/domain/DemoBanner";
import {
  FaTachometerAlt,
  FaGraduationCap,
  FaFileAlt,
  FaFolderOpen,
  FaUser,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBookOpen,
} from "react-icons/fa";

export const StudentLayout = () => {
  const { currentUser, logout } = useAuth();
  const { notifications } = useData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const unreadNotifs = notifications.filter(n => !n.read && (!n.userId || n.userId === currentUser?.id)).length;
  const profilePercent = currentUser?.profileCompletedPercent || 85;

  const navItems = [
    { to: "/student/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/scholarships", label: "Find Scholarships", icon: <FaGraduationCap /> },
    { to: "/student/applications", label: "My Applications", icon: <FaFileAlt /> },
    { to: "/student/documents", label: "Document Center", icon: <FaFolderOpen /> },
    { to: "/student/education", label: "Education Profile", icon: <FaBookOpen /> },
    { to: "/student/profile", label: "Personal Profile", icon: <FaUser /> },
    { to: "/student/notifications", label: "Notifications", icon: <FaBell />, badge: unreadNotifs > 0 ? unreadNotifs : null },
    { to: "/student/settings", label: "Account Settings", icon: <FaCog /> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "var(--color-bg-main)" }}>
      {/* Top Demo Banner */}
      <DemoBanner />

      {/* Top Mobile Bar */}
      <div
        className="mobile-student-topbar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle student sidebar"
            style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "var(--color-text-main)" }}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Link to="/" style={{ fontWeight: "bold", fontSize: "16px", textDecoration: "none", color: "var(--color-primary-dark)" }}>
            🎓 {BRAND.shortName} <span style={{ fontSize: "12px", color: "var(--color-text-subtle)" }}>Student</span>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/student/notifications" style={{ position: "relative", color: "var(--color-text-main)", fontSize: "18px" }}>
            <FaBell />
            {unreadNotifs > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  backgroundColor: "var(--color-danger)",
                  color: "#fff",
                  fontSize: "10px",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {unreadNotifs}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Main Student Shell */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <aside
          className={`student-sidebar ${sidebarOpen ? "open" : ""}`}
          style={{
            width: "var(--sidebar-width)",
            backgroundColor: "#FFFFFF",
            borderRight: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            transition: "transform 0.2s ease",
            zIndex: 80,
          }}
        >
          {/* Brand header */}
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid var(--color-border)",
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
                backgroundColor: "var(--color-primary)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              🎓
            </div>
            <div>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ fontWeight: 800, fontSize: "16px", color: "var(--color-primary-dark)" }}>
                  {BRAND.logo.text}
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-secondary)", fontWeight: 700 }}>
                  STUDENT PORTAL
                </div>
              </Link>
            </div>
          </div>

          {/* Student Profile Quick View */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--color-border)",
              backgroundColor: "var(--color-bg-surface)",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--color-text-main)" }}>
              {currentUser?.fullName || "Ahmad Tariq Khan"}
            </div>
            <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)", marginBottom: "10px" }}>
              Roll: {currentUser?.currentEducation?.rollNumber || "GU-CS-2022-48"}
            </div>

            {/* Profile Meter */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                <span style={{ color: "var(--color-text-muted)" }}>Profile Completeness</span>
                <span style={{ fontWeight: "bold", color: "var(--color-primary)" }}>{profilePercent}%</span>
              </div>
              <div style={{ width: "100%", height: "6px", backgroundColor: "#E2E8F0", borderRadius: "9999px", overflow: "hidden" }}>
                <div
                  style={{
                    width: `${profilePercent}%`,
                    height: "100%",
                    backgroundColor: profilePercent >= 90 ? "var(--color-success)" : "var(--color-primary)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: "12px 8px", flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `student-nav-item ${isActive ? "active" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      backgroundColor: "var(--color-danger)",
                      color: "#FFFFFF",
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

          {/* Bottom actions */}
          <div style={{ padding: "16px", borderTop: "1px solid var(--color-border)" }}>
            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{ width: "100%", justifyContent: "flex-start", gap: "10px" }}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              zIndex: 75,
            }}
          />
        )}

        {/* Content Area */}
        <main className="student-content-main" style={{ flex: 1, padding: "28px var(--space-6)", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        .student-nav-item {
          color: var(--color-text-muted);
        }
        .student-nav-item:hover {
          background-color: var(--color-bg-surface);
          color: var(--color-primary);
        }
        .student-nav-item.active {
          background-color: var(--color-primary-50);
          color: var(--color-primary);
          font-weight: 700;
        }
        @media (max-width: 900px) {
          .student-sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
          }
          .student-sidebar.open {
            transform: translateX(0);
          }
        }
        @media (max-width: 640px) {
          .student-content-main {
            padding: 16px 12px !important;
          }
        }
        @media (max-width: 360px) {
          .student-content-main {
            padding: 12px 8px !important;
          }
        }
        @media (min-width: 901px) {
          .mobile-student-topbar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentLayout;
