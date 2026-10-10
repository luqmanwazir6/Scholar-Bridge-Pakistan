import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { validateEmail } from "../../utils/validators";
import { FaKey, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="container" style={{ padding: "64px 16px 80px", maxWidth: "480px" }}>
      <div className="card" style={{ padding: "32px", backgroundColor: "#FFFFFF" }}>
        <div style={{ marginBottom: "20px" }}>
          <Link to="/student/login" style={{ color: "var(--color-text-muted)", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <FaArrowLeft size={11} /> Back to Login
          </Link>
        </div>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "var(--color-primary-50)",
              color: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              margin: "0 auto 12px",
            }}
          >
            <FaKey />
          </div>
          <h1 style={{ fontSize: "1.7rem", margin: "0 0 6px" }}>Reset Password</h1>
          <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
            Enter your registered student email address to receive demo reset instructions.
          </p>
        </div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <FaCheckCircle color="var(--color-success)" size={42} style={{ marginBottom: "14px" }} />
            <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Reset Link Simulated</h3>
            <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: "1.5", marginBottom: "24px" }}>
              In demo mode, a simulated password reset token has been dispatched to <strong>{email}</strong>. You may now return to login with any placeholder password.
            </p>
            <Link to="/student/login" className="btn btn-primary" style={{ width: "100%" }}>
              Return to Student Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              label="Registered Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. ahmad.khan@demo.pk"
              required
              error={error}
            />

            <Button type="submit" variant="primary" loading={loading} style={{ width: "100%", marginTop: "12px" }}>
              Send Reset Instructions
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
