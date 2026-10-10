import React from "react";
import { Outlet } from "react-router-dom";
import DemoBanner from "../components/domain/DemoBanner";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import CookieNotice from "../components/common/CookieNotice";

export const PublicLayout = () => {
  return (
    <div className="layout-public" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Persistent Demo Mode Banner */}
      <DemoBanner />

      {/* Modern High-End Mega Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" style={{ flex: 1, outline: "none" }} tabIndex={-1}>
        <Outlet />
      </main>

      {/* Comprehensive 4-Column Footer */}
      <Footer />

      {/* Local Storage Privacy Notice */}
      <CookieNotice />
    </div>
  );
};

export default PublicLayout;
