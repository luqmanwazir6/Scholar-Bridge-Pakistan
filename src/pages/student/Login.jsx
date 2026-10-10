import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import {
  LuMail,
  LuLock,
  LuSparkles,
  LuShieldCheck,
  LuArrowRight,
  LuGraduationCap,
  LuCircleCheck,
  LuUserCheck,
} from "react-icons/lu";

export const StudentLogin = () => {
  const { login, loginAsDemoStudent } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/student/dashboard";

  const [email, setEmail] = useState("ahmad.khan@demo.pk");
  const [password, setPassword] = useState("demo12345");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password, "student");
      if (res.success) {
        showSuccess(`Welcome back, ${res.user.fullName}!`);
        navigate(redirectPath);
      } else {
        showError(res.error || "Login failed");
      }
    } catch (err) {
      showError("An error occurred during demo login.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoStudentClick = async () => {
    setLoading(true);
    try {
      const user = await loginAsDemoStudent();
      showSuccess(`Logged in as Demo Student: ${user.fullName}`);
      navigate(redirectPath);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-layout">
      {/* Left Column: Visual Brand Backdrop */}
      <div
        className="auth-visual-side"
        style={{
          background:
            "linear-gradient(135deg, rgba(10, 25, 47, 0.94) 0%, rgba(15, 62, 59, 0.88) 100%), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#FFFFFF",
          padding: "60px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(8px)",
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--color-accent)",
              marginBottom: "32px",
            }}
          >
            <LuGraduationCap /> SCHOLARBRIDGE STUDENT PORTAL
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.2,
              marginBottom: "20px",
            }}
          >
            Fund Your Education Across Khyber Pakhtunkhwa
          </h1>

          <p style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: 1.6, maxWidth: "480px" }}>
            Sign in to track verified application cycles, preview document verification stages, and download simulated grant award receipts.
          </p>
        </div>

        {/* Value Prop Bullet points */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", margin: "40px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px" }}>
            <LuCircleCheck color="var(--color-accent)" style={{ fontSize: "18px", flexShrink: 0 }} />
            <span>Dedicated Dera Ismail Khan & Southern KP quota filters</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px" }}>
            <LuCircleCheck color="var(--color-accent)" style={{ fontSize: "18px", flexShrink: 0 }} />
            <span>Automated academic eligibility match scoring</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px" }}>
            <LuCircleCheck color="var(--color-accent)" style={{ fontSize: "18px", flexShrink: 0 }} />
            <span>Safe, client-side in-memory document previews</span>
          </div>
        </div>

        <div style={{ fontSize: "12px", color: "#94A3B8" }}>
          © 2026 ScholarBridge Pakistan • Educational Prototype
        </div>
      </div>

      {/* Right Column: Clean Form */}
      <div className="auth-form-side">
        <div style={{ width: "100%", maxWidth: "440px" }}>
          {/* Header */}
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: "0 0 8px" }}>
              Welcome Back
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "14px", margin: 0 }}>
              Enter your credentials to access your applicant desk.
            </p>
          </div>

          {/* Quick Demo Student Autofill CTA */}
          <div
            style={{
              marginBottom: "24px",
              padding: "16px",
              backgroundColor: "rgba(13, 71, 161, 0.05)",
              border: "1px solid rgba(13, 71, 161, 0.15)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-primary)", marginBottom: "8px" }}>
              ⚡ Instant Evaluation Mode
            </div>
            <button
              type="button"
              onClick={handleDemoStudentClick}
              disabled={loading}
              className="btn btn-primary btn-sm"
              style={{ width: "100%", justifyContent: "center", borderRadius: "var(--radius-md)" }}
            >
              <LuUserCheck /> 1-Click Login as Demo Student (Ahmad Khan)
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
            <span style={{ fontSize: "12px", color: "var(--color-text-subtle)", fontWeight: 600 }}>OR SIGN IN WITH EMAIL</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                Student Email Address
              </label>
              <div style={{ position: "relative" }}>
                <LuMail style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-subtle)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. ahmad.khan@demo.pk"
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 40px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600 }}>Password</label>
                <Link to="/student/forgot-password" style={{ fontSize: "12px", color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <LuLock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-subtle)" }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 40px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              withArrow
              style={{ width: "100%", justifyContent: "center", padding: "13px", marginTop: "6px" }}
            >
              Sign In to Portal
            </Button>
          </form>

          {/* Bottom Switch Link */}
          <div style={{ marginTop: "24px", textAlign: "center", fontSize: "13.5px", color: "var(--color-text-muted)" }}>
            Don't have a student profile yet?{" "}
            <Link to="/student/register" style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>
              Register Here
            </Link>
          </div>

          <div style={{ marginTop: "12px", textAlign: "center", fontSize: "12px" }}>
            <Link to="/admin/login" style={{ color: "var(--color-secondary)", textDecoration: "none" }}>
              Administrator Demo Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
