import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { validateCNIC, validatePhone, validateEmail } from "../../utils/validators";
import {
  LuUserPlus,
  LuShieldCheck,
  LuGraduationCap,
  LuCircleCheck,
  LuMapPin,
  LuMail,
  LuUser,
  LuPhone,
  LuBuilding2,
  LuCalendar,
} from "react-icons/lu";

export const StudentRegistration = () => {
  const { register } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    cnic: "",
    phone: "",
    email: "",
    dob: "2004-05-15",
    currentLevel: "Undergraduate",
    institution: "Gomal University DI Khan",
    district: "Dera Ismail Khan",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father / Guardian name is required.";

    const cnicErr = validateCNIC(formData.cnic);
    if (cnicErr) newErrors.cnic = cnicErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    if (!formData.consent) {
      newErrors.consent = "You must confirm that this is a simulated demo registration.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await register(formData);
      if (res.success) {
        showSuccess(`Welcome, ${res.user.fullName}! Account created in demo records.`);
        navigate("/student/dashboard");
      } else {
        showError(res.error || "Registration failed.");
      }
    } catch (err) {
      showError("Registration failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-layout">
      {/* Visual Side Banner */}
      <div
        className="auth-visual-side"
        style={{
          background:
            "linear-gradient(135deg, rgba(10, 25, 47, 0.94) 0%, rgba(13, 71, 161, 0.88) 100%), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#FFFFFF",
          padding: "60px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
            <LuGraduationCap /> SCHOLARBRIDGE STUDENT ADMISSIONS
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
            Start Your Scholarship Journey Today
          </h1>

          <p style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: 1.6, maxWidth: "480px" }}>
            Create an applicant profile to calculate your scholarship eligibility across regional quotas and submit digital applications.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", margin: "40px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px" }}>
            <LuCircleCheck color="var(--color-accent)" style={{ fontSize: "18px", flexShrink: 0 }} />
            <span>Instant profile completion matching</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px" }}>
            <LuCircleCheck color="var(--color-accent)" style={{ fontSize: "18px", flexShrink: 0 }} />
            <span>Support for Gomal University, UST Bannu & UET</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px" }}>
            <LuCircleCheck color="var(--color-accent)" style={{ fontSize: "18px", flexShrink: 0 }} />
            <span>100% Free prototype — zero fees</span>
          </div>
        </div>

        <div style={{ fontSize: "12px", color: "#94A3B8" }}>
          © 2026 ScholarBridge Pakistan • Educational Prototype
        </div>
      </div>

      {/* Registration Form Side */}
      <div className="auth-form-side">
        <div style={{ width: "100%", maxWidth: "560px" }}>
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: "0 0 8px" }}>
              Register Student Profile
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "14px", margin: 0 }}>
              Create your ScholarBridge applicant profile to apply for scholarships.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="auth-form-row">
              <Input
                label="Student Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Usman Ali"
                required
                error={errors.fullName}
              />
              <Input
                label="Father / Guardian Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="e.g. Muhammad Ali"
                required
                error={errors.fatherName}
              />
            </div>

            <div className="auth-form-row">
              <Input
                label="CNIC or B-Form"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                placeholder="12101-1234567-1"
                required
                error={errors.cnic}
                hint="Sample CNIC number"
              />
              <Input
                label="Contact Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0345-1234567"
                required
                error={errors.phone}
              />
            </div>

            <div className="auth-form-row">
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="usman.ali@demo.pk"
                required
                error={errors.email}
              />
              <Input
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-form-row">
              <Select
                label="Current Education Level"
                name="currentLevel"
                value={formData.currentLevel}
                onChange={handleChange}
                options={[
                  { value: "Undergraduate", label: "Undergraduate / BS" },
                  { value: "Intermediate", label: "Intermediate / HSSC" },
                  { value: "Matric", label: "Matric / SSC" },
                  { value: "Master's", label: "Master's / MS" },
                  { value: "PhD / Doctoral", label: "PhD / Doctoral" },
                ]}
                required
              />
              <Select
                label="District of Domicile"
                name="district"
                value={formData.district}
                onChange={handleChange}
                options={[
                  { value: "Dera Ismail Khan", label: "Dera Ismail Khan (Pilot)" },
                  { value: "Peshawar", label: "Peshawar" },
                  { value: "Bannu", label: "Bannu" },
                  { value: "Tank", label: "Tank" },
                  { value: "Lakki Marwat", label: "Lakki Marwat" },
                ]}
                required
              />
            </div>

            <Input
              label="Current College / University"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="e.g. Gomal University D.I. Khan"
            />

            {/* Consent checkbox */}
            <div style={{ margin: "6px 0" }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  style={{ marginTop: "3px" }}
                />
                <span style={{ color: "var(--color-text-muted)" }}>
                  I understand this is a demonstration frontend prototype. No real CNIC verification or official HEC submission is performed.
                </span>
              </label>
              {errors.consent && (
                <div style={{ fontSize: "12px", color: "var(--color-danger)", marginTop: "4px" }}>
                  {errors.consent}
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              withArrow
              style={{ width: "100%", justifyContent: "center", padding: "13px", marginTop: "8px" }}
            >
              Complete Registration
            </Button>
          </form>

          <div style={{ marginTop: "24px", textAlign: "center", fontSize: "13.5px", color: "var(--color-text-muted)" }}>
            Already have an account?{" "}
            <Link to="/student/login" style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
