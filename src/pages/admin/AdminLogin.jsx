import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { FaUserShield, FaInfoCircle, FaLock } from "react-icons/fa";

export const AdminLogin = () => {
  const { login, loginAsDemoAdmin } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin/dashboard";

  const [email, setEmail] = useState("admin@scholarbridge.pk.demo");
  const [password, setPassword] = useState("admin12345");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password, "admin");
      if (res.success) {
        showSuccess("Admin desk authentication successful!");
        navigate(redirectPath);
      } else {
        showError(res.error || "Admin login failed.");
      }
    } catch (err) {
      showError("Login error.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdminClick = async () => {
    setLoading(true);
    try {
      const admin = await loginAsDemoAdmin();
      showSuccess(`Logged in as Admin: ${admin.fullName}`);
      navigate(redirectPath);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: "64px 16px 80px", maxWidth: "520px" }}>
      {/* Simulation Disclaimer Notice Banner */}
      <div
        style={{
          backgroundColor: "#FEF3C7",
          border: "1px solid #F59E0B",
          borderRadius: "8px",
          padding: "14px 16px",
          marginBottom: "24px",
          fontSize: "12.5px",
          lineHeight: "1.5",
          color: "#92400E",
          display: "flex",
          gap: "10px",
          alignItems: "flex-start",
        }}
      >
        <FaInfoCircle size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
        <div>
          <strong>Demo Simulation Only:</strong> This is an administrative prototype simulation. Does NOT connect to real government or institutional LDAP/SSO directories.
        </div>
      </div>

      <div className="card" style={{ padding: "32px", backgroundColor: "#FFFFFF", borderTop: "4px solid #0284C7" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#E0F2FE",
              color: "#0284C7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              margin: "0 auto 12px",
            }}
          >
            🛡
          </div>
          <h1 style={{ fontSize: "1.75rem", margin: "0 0 6px" }}>Admin Desk Login</h1>
          <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
            Scholarship verification, document audit, and award control portal.
          </p>
        </div>

        {/* Quick Demo One-Click Login Button */}
        <div style={{ marginBottom: "24px" }}>
          <Button
            variant="primary"
            onClick={handleDemoAdminClick}
            disabled={loading}
            style={{ width: "100%", padding: "12px", fontSize: "14.5px", backgroundColor: "#0284C7" }}
            icon={<FaUserShield />}
          >
            One-Click Login as Demo Admin (DI Khan Desk)
          </Button>
          <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)", textAlign: "center", marginTop: "6px" }}>
            Instantly enters the administrative control desk
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "20px 0", color: "var(--color-text-subtle)", fontSize: "12px" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
          <span style={{ padding: "0 10px", textTransform: "uppercase" }}>Or Enter Admin Credentials</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Administrative Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@scholarbridge.pk.demo"
            required
          />

          <Input
            label="Password (Demo Placeholder)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            hint="Any password accepted in demo mode."
          />

          <Button type="submit" variant="secondary" loading={loading} style={{ width: "100%", padding: "11px", marginTop: "8px" }}>
            Access Verification Desk →
          </Button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--color-border)", fontSize: "13px" }}>
          Looking for student access?{" "}
          <Link to="/student/login" style={{ fontWeight: "bold", color: "var(--color-primary)" }}>
            Go to Student Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
