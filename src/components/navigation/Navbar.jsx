import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { BRAND } from "../../config/brand";
import { useAuth } from "../../context/AuthContext";
import SearchOverlay from "./SearchOverlay";
import {
  LuSearch,
  LuChevronDown,
  LuMenu,
  LuX,
  LuUser,
  LuLogOut,
  LuLayoutDashboard,
  LuFileText,
  LuBell,
  LuGraduationCap,
  LuMapPin,
  LuSparkles,
  LuClock,
  LuCalculator,
  LuSquareCheck,
  LuCalendar,
  LuShieldCheck,
  LuAward,
  LuBookOpen,
  LuExternalLink,
} from "react-icons/lu";

export const Navbar = () => {
  const { currentUser, isStudent, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null); // 'scholarships' | 'universities' | 'tools' | null
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setActiveMega(null);
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside click to close menus
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMega(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setActiveMega(null);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header
        ref={navRef}
        className={`site-navbar ${isScrolled ? "site-navbar--scrolled" : ""}`}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 900,
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "#FFFFFF",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: "1px solid var(--color-border)",
          boxShadow: isScrolled ? "var(--shadow-md)" : "none",
          transition: "background-color 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        <div
          className="container"
          style={{
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* 1. Left: Brand & Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              className="navbar-logo-box"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                boxShadow: "0 4px 10px rgba(13, 71, 161, 0.25)",
                flexShrink: 0,
              }}
            >
              🎓
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  className="navbar-brand-title"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--color-primary-dark)",
                    letterSpacing: "-0.5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {BRAND.logo.text}
                </span>
                <span
                  className="navbar-brand-badge"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-primary-dark)",
                    fontSize: "10px",
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {BRAND.logo.badge}
                </span>
              </div>
              <div className="navbar-brand-region" style={{ fontSize: "11px", color: "var(--color-text-subtle)", fontWeight: 600 }}>
                {BRAND.initialRegion}
              </div>
            </div>
          </Link>

          {/* 2. Center: Desktop Mega Dropdowns */}
          <nav
            className="navbar-desktop-nav"
            style={{
              display: "none",
              alignItems: "center",
              gap: "8px",
            }}
            aria-label="Primary Navigation"
          >
            {/* Scholarships Mega Trigger */}
            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setActiveMega(activeMega === "scholarships" ? null : "scholarships")}
                aria-expanded={activeMega === "scholarships"}
                className={`nav-menu-btn ${activeMega === "scholarships" ? "active" : ""}`}
              >
                <span>Scholarships</span>
                <LuChevronDown style={{ fontSize: "14px", transition: "transform 0.2s ease", transform: activeMega === "scholarships" ? "rotate(180deg)" : "rotate(0)" }} />
              </button>

              {/* Mega Menu Popup for Scholarships */}
              {activeMega === "scholarships" && (
                <div
                  className="mega-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 14px)",
                    left: "-120px",
                    width: "820px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "var(--radius-xl)",
                    boxShadow: "var(--shadow-xl)",
                    border: "1px solid var(--color-border)",
                    padding: "24px",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                    animation: "fadeIn 0.15s ease-out",
                    zIndex: 1000,
                  }}
                >
                  {/* Col 1: Popular */}
                  <div>
                    <div className="mega-col-title">POPULAR</div>
                    <div className="mega-col-links">
                      <Link to="/scholarships?sort=deadline_asc" className="mega-item">
                        <div className="mega-item-icon"><LuSparkles color="var(--color-primary)" /></div>
                        <div>
                          <div className="mega-item-title">Latest Grants</div>
                          <div className="mega-item-desc">Freshly announced cycles</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?category=Need-based" className="mega-item">
                        <div className="mega-item-icon"><LuAward color="var(--color-secondary)" /></div>
                        <div>
                          <div className="mega-item-title">Fully Funded</div>
                          <div className="mega-item-desc">Tuition + living stipends</div>
                        </div>
                      </Link>
                      <Link to="/tools/deadline-calendar" className="mega-item">
                        <div className="mega-item-icon"><LuClock color="var(--color-danger)" /></div>
                        <div>
                          <div className="mega-item-title">Closing Soon</div>
                          <div className="mega-item-desc">Cycles ending this month</div>
                        </div>
                      </Link>
                      <Link to="/scholarships" className="mega-item">
                        <div className="mega-item-icon"><LuBookOpen color="var(--color-text-subtle)" /></div>
                        <div>
                          <div className="mega-item-title">Browse All</div>
                          <div className="mega-item-desc">Complete database</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Col 2: By Level */}
                  <div>
                    <div className="mega-col-title">BY LEVEL</div>
                    <div className="mega-col-links">
                      <Link to="/scholarships?level=Matric" className="mega-item">
                        <div className="mega-item-icon"><LuGraduationCap color="var(--color-primary)" /></div>
                        <div>
                          <div className="mega-item-title">Matric / SSC</div>
                          <div className="mega-item-desc">School assistance</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?level=Intermediate" className="mega-item">
                        <div className="mega-item-icon"><LuGraduationCap color="var(--color-primary)" /></div>
                        <div>
                          <div className="mega-item-title">Intermediate</div>
                          <div className="mega-item-desc">FA / FSc / ICS / DAE</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?level=Undergraduate" className="mega-item">
                        <div className="mega-item-icon"><LuGraduationCap color="var(--color-primary)" /></div>
                        <div>
                          <div className="mega-item-title">Bachelor / BS</div>
                          <div className="mega-item-desc">4-Year Degree programs</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?level=Master" className="mega-item">
                        <div className="mega-item-icon"><LuGraduationCap color="var(--color-primary)" /></div>
                        <div>
                          <div className="mega-item-title">MS & PhD</div>
                          <div className="mega-item-desc">Postgrad & research</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Col 3: By Type */}
                  <div>
                    <div className="mega-col-title">BY TYPE</div>
                    <div className="mega-col-links">
                      <Link to="/scholarships?category=Merit-based" className="mega-item">
                        <div>
                          <div className="mega-item-title">Merit-based</div>
                          <div className="mega-item-desc">For high achievers</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?category=Need-based" className="mega-item">
                        <div>
                          <div className="mega-item-title">Need-based</div>
                          <div className="mega-item-desc">Financial aid support</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?category=Government" className="mega-item">
                        <div>
                          <div className="mega-item-title">Government (Sample)</div>
                          <div className="mega-item-desc">Provincial & Federal</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?category=Special+Assistance" className="mega-item">
                        <div>
                          <div className="mega-item-title">Special Assistance</div>
                          <div className="mega-item-desc">Orphans, minority & quota</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Col 4: By District */}
                  <div>
                    <div className="mega-col-title">BY DISTRICT</div>
                    <div className="mega-col-links">
                      <Link to="/scholarships?district=Dera+Ismail+Khan" className="mega-item">
                        <div className="mega-item-icon"><LuMapPin color="var(--color-primary)" /></div>
                        <div>
                          <div className="mega-item-title">D.I. Khan (Pilot)</div>
                          <div className="mega-item-desc">Local priority quota</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?district=Peshawar" className="mega-item">
                        <div className="mega-item-icon"><LuMapPin color="var(--color-text-subtle)" /></div>
                        <div>
                          <div className="mega-item-title">Peshawar</div>
                          <div className="mega-item-desc">Provincial capital</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?district=Bannu" className="mega-item">
                        <div className="mega-item-icon"><LuMapPin color="var(--color-text-subtle)" /></div>
                        <div>
                          <div className="mega-item-title">Bannu / Tank</div>
                          <div className="mega-item-desc">Southern KP districts</div>
                        </div>
                      </Link>
                      <Link to="/scholarships" className="mega-item">
                        <div className="mega-item-icon"><LuMapPin color="var(--color-secondary)" /></div>
                        <div>
                          <div className="mega-item-title">All Districts</div>
                          <div className="mega-item-desc">All-Pakistan schemes</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Universities & Programs Mega Trigger */}
            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setActiveMega(activeMega === "universities" ? null : "universities")}
                aria-expanded={activeMega === "universities"}
                className={`nav-menu-btn ${activeMega === "universities" ? "active" : ""}`}
              >
                <span>Universities & Programs</span>
                <LuChevronDown style={{ fontSize: "14px", transition: "transform 0.2s ease", transform: activeMega === "universities" ? "rotate(180deg)" : "rotate(0)" }} />
              </button>

              {activeMega === "universities" && (
                <div
                  className="mega-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 14px)",
                    left: "-80px",
                    width: "600px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "var(--radius-xl)",
                    boxShadow: "var(--shadow-xl)",
                    border: "1px solid var(--color-border)",
                    padding: "24px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    animation: "fadeIn 0.15s ease-out",
                    zIndex: 1000,
                  }}
                >
                  <div>
                    <div className="mega-col-title">KEY KP & NATIONAL INSTITUTES</div>
                    <div className="mega-col-links">
                      <Link to="/scholarships?search=Gomal" className="mega-item">
                        <div>
                          <div className="mega-item-title">Gomal University</div>
                          <div className="mega-item-desc">Dera Ismail Khan</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?search=Peshawar" className="mega-item">
                        <div>
                          <div className="mega-item-title">University of Peshawar</div>
                          <div className="mega-item-desc">Peshawar Main Campus</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?search=UET" className="mega-item">
                        <div>
                          <div className="mega-item-title">UET Peshawar</div>
                          <div className="mega-item-desc">Engineering & Technology</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?search=Bannu" className="mega-item">
                        <div>
                          <div className="mega-item-title">UST Bannu</div>
                          <div className="mega-item-desc">Science & Technology</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <div className="mega-col-title">POPULAR FIELDS OF STUDY</div>
                    <div className="mega-col-links">
                      <Link to="/scholarships?search=Engineering" className="mega-item">
                        <div>
                          <div className="mega-item-title">Engineering & Tech</div>
                          <div className="mega-item-desc">Civil, Electrical, Software</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?search=Medical" className="mega-item">
                        <div>
                          <div className="mega-item-title">Medical & Health</div>
                          <div className="mega-item-desc">MBBS, BDS, Allied Sciences</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?search=Computer" className="mega-item">
                        <div>
                          <div className="mega-item-title">Computer & IT</div>
                          <div className="mega-item-desc">CS, Data Science, AI</div>
                        </div>
                      </Link>
                      <Link to="/scholarships?search=Agriculture" className="mega-item">
                        <div>
                          <div className="mega-item-title">Agriculture & Sciences</div>
                          <div className="mega-item-desc">Faculty of Agriculture</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tools Mega Trigger */}
            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setActiveMega(activeMega === "tools" ? null : "tools")}
                aria-expanded={activeMega === "tools"}
                className={`nav-menu-btn ${activeMega === "tools" ? "active" : ""}`}
              >
                <span>Student Tools</span>
                <LuChevronDown style={{ fontSize: "14px", transition: "transform 0.2s ease", transform: activeMega === "tools" ? "rotate(180deg)" : "rotate(0)" }} />
              </button>

              {activeMega === "tools" && (
                <div
                  className="mega-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 14px)",
                    left: "-50px",
                    width: "380px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "var(--radius-xl)",
                    boxShadow: "var(--shadow-xl)",
                    border: "1px solid var(--color-border)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    animation: "fadeIn 0.15s ease-out",
                    zIndex: 1000,
                  }}
                >
                  <Link to="/eligibility-guide" className="mega-item">
                    <div className="mega-item-icon"><LuSparkles color="var(--color-primary)" /></div>
                    <div>
                      <div className="mega-item-title">Eligibility Checker</div>
                      <div className="mega-item-desc">Check match against your profile</div>
                    </div>
                  </Link>

                  <Link to="/tools/cgpa-calculator" className="mega-item">
                    <div className="mega-item-icon"><LuCalculator color="var(--color-primary)" /></div>
                    <div>
                      <div className="mega-item-title">CGPA to Percentage</div>
                      <div className="mega-item-desc">HEC 4.0 scale conversion</div>
                    </div>
                  </Link>

                  <Link to="/tools/percentage-calculator" className="mega-item">
                    <div className="mega-item-icon"><LuCalculator color="var(--color-secondary)" /></div>
                    <div>
                      <div className="mega-item-title">Percentage Calculator</div>
                      <div className="mega-item-desc">Board & DMC marks calculator</div>
                    </div>
                  </Link>

                  <Link to="/tools/document-checklist" className="mega-item">
                    <div className="mega-item-icon"><LuSquareCheck color="var(--color-success)" /></div>
                    <div>
                      <div className="mega-item-title">Document Checklist</div>
                      <div className="mega-item-desc">NADRA, Domicile & income records</div>
                    </div>
                  </Link>

                  <Link to="/tools/deadline-calendar" className="mega-item">
                    <div className="mega-item-icon"><LuCalendar color="var(--color-danger)" /></div>
                    <div>
                      <div className="mega-item-title">Deadline Calendar</div>
                      <div className="mega-item-desc">Time-sensitive closing dates</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Direct Links */}
            <NavLink to="/compare" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Compare
            </NavLink>
            <NavLink to="/how-it-works" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              How It Works
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              About
            </NavLink>
          </nav>

          {/* 3. Right: Search & Unified Auth CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Search Icon Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search dialog (Ctrl+K)"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-bg-subtle)",
                color: "var(--color-text-main)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "17px",
                transition: "background var(--transition-fast)",
              }}
              title="Search Scholarships (Ctrl+K)"
            >
              <LuSearch />
            </button>

            {/* Logged in state */}
            {currentUser ? (
              <div ref={userMenuRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "none",
                    border: "1px solid var(--color-border)",
                    padding: "4px 12px 4px 6px",
                    borderRadius: "var(--radius-full)",
                    cursor: "pointer",
                  }}
                  aria-expanded={userMenuOpen}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: isStudent ? "var(--color-primary)" : "var(--color-secondary)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span
                    style={{
                      fontSize: "13.5px",
                      fontWeight: 600,
                      color: "var(--color-text-main)",
                      maxWidth: "120px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {currentUser.name?.split(" ")[0] || "Account"}
                  </span>
                  <LuChevronDown style={{ fontSize: "14px", color: "var(--color-text-subtle)" }} />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 10px)",
                      right: 0,
                      width: "230px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "var(--shadow-xl)",
                      border: "1px solid var(--color-border)",
                      padding: "10px",
                      zIndex: 1000,
                      animation: "fadeIn 0.15s ease-out",
                    }}
                  >
                    <div style={{ padding: "8px 12px 10px", borderBottom: "1px solid var(--color-border-subtle)", marginBottom: "6px" }}>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-main)" }}>
                        {currentUser.name}
                      </div>
                      <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)" }}>
                        {currentUser.email}
                      </div>
                      <div style={{ marginTop: "4px" }}>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "2px 6px",
                            borderRadius: "4px",
                            backgroundColor: isStudent ? "rgba(13, 71, 161, 0.1)" : "rgba(15, 62, 59, 0.1)",
                            color: isStudent ? "var(--color-primary)" : "var(--color-secondary)",
                            textTransform: "uppercase",
                          }}
                        >
                          {isStudent ? "Student Profile" : "Administrator"}
                        </span>
                      </div>
                    </div>

                    {isStudent ? (
                      <>
                        <Link to="/student/dashboard" className="user-dropdown-item">
                          <LuLayoutDashboard /> Dashboard
                        </Link>
                        <Link to="/student/applications" className="user-dropdown-item">
                          <LuFileText /> My Applications
                        </Link>
                        <Link to="/student/notifications" className="user-dropdown-item">
                          <LuBell /> Notifications
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/admin/dashboard" className="user-dropdown-item">
                          <LuLayoutDashboard /> Admin Dashboard
                        </Link>
                      </>
                    )}

                    <div style={{ borderTop: "1px solid var(--color-border-subtle)", marginTop: "6px", paddingTop: "6px" }}>
                      <button
                        onClick={handleLogout}
                        className="user-dropdown-item"
                        style={{ width: "100%", border: "none", background: "none", color: "var(--color-danger)", cursor: "pointer", textAlign: "left" }}
                      >
                        <LuLogOut /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Combined Single Guest CTA */
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link
                  to="/student/login"
                  className="btn btn-primary navbar-guest-btn"
                  style={{
                    padding: "8px 18px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  <LuUser /> <span className="guest-btn-text">Login / Sign Up</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="navbar-mobile-toggle"
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              style={{
                display: "none",
                background: "none",
                border: "none",
                fontSize: "24px",
                color: "var(--color-text-main)",
                padding: "6px",
                cursor: "pointer",
              }}
            >
              {mobileMenuOpen ? <LuX /> : <LuMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-in Drawer */}
        {mobileMenuOpen && (
          <div
            className="navbar-mobile-drawer"
            style={{
              backgroundColor: "#FFFFFF",
              borderTop: "1px solid var(--color-border)",
              padding: "20px 24px 36px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxHeight: "calc(100vh - 72px)",
              overflowY: "auto",
            }}
          >
            {/* Quick search input */}
            <button
              onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 16px",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--color-bg-subtle)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-subtle)",
                fontSize: "14px",
                textAlign: "left",
                cursor: "pointer",
                width: "100%",
              }}
            >
              <LuSearch />
              <span>Search scholarships, colleges...</span>
            </button>

            {/* Mobile Navigation Links & Accordions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "10px" }}>
              <Link to="/scholarships" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-row">
                Browse All Scholarships
              </Link>
              <Link to="/tools/deadline-calendar" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-row">
                Deadline Calendar
              </Link>
              <Link to="/eligibility-guide" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-row">
                Eligibility Calculator
              </Link>
              <Link to="/tools/cgpa-calculator" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-row">
                CGPA to Percentage Tool
              </Link>
              <Link to="/tools/document-checklist" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-row">
                Document Checklist
              </Link>
              <Link to="/compare" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-row">
                Compare Scholarships
              </Link>
              <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-row">
                How It Works
              </Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-row">
                About ScholarBridge
              </Link>
              <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-row" style={{ color: "var(--color-secondary)" }}>
                Admin Demo Desk
              </Link>
            </div>

            {/* Guest / Auth action */}
            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--color-border)" }}>
              {currentUser ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Link
                    to={isStudent ? "/student/dashboard" : "/admin/dashboard"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Go to {isStudent ? "Student Dashboard" : "Admin Desk"}
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="btn btn-outline"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Link
                    to="/student/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <LuUser /> Student Login / Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Scoped Styles for Navbar and Mega Menus */}
      <style>{`
        .nav-menu-btn {
          background: none;
          border: none;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-muted);
          padding: 8px 12px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          transition: color 0.15s ease, background 0.15s ease;
        }
        .nav-menu-btn:hover, .nav-menu-btn.active {
          color: var(--color-primary);
          background-color: var(--color-bg-subtle);
        }
        .mega-col-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.8px;
          color: var(--color-text-subtle);
          margin-bottom: 12px;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .mega-col-links {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .mega-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px;
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: background-color 0.15s ease;
        }
        .mega-item:hover {
          background-color: var(--color-bg-subtle);
        }
        .mega-item-icon {
          font-size: 16px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .mega-item-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-text-main);
          line-height: 1.25;
        }
        .mega-item-desc {
          font-size: 11px;
          color: var(--color-text-subtle);
          margin-top: 2px;
        }
        .user-dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-main);
          text-decoration: none;
          border-radius: var(--radius-md);
          transition: background 0.15s ease;
        }
        .user-dropdown-item:hover {
          background-color: var(--color-bg-subtle);
          color: var(--color-primary);
        }
        .mobile-nav-row {
          padding: 10px 0;
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text-main);
          text-decoration: none;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        @media (min-width: 992px) {
          .navbar-desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 991px) {
          .navbar-mobile-toggle {
            display: flex !important;
          }
        }
        @media (max-width: 540px) {
          .navbar-brand-region,
          .navbar-brand-badge {
            display: none !important;
          }
          .navbar-brand-title {
            font-size: 1.1rem !important;
          }
          .navbar-logo-box {
            width: 36px !important;
            height: 36px !important;
            font-size: 19px !important;
          }
          .guest-btn-text {
            display: none !important;
          }
          .navbar-guest-btn {
            padding: 8px 10px !important;
          }
        }
        @media (max-width: 375px) {
          .navbar-guest-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
