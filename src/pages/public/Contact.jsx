import React, { useState } from "react";
import { BRAND } from "../../config/brand";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { validateEmail, validatePhone } from "../../utils/validators";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle } from "react-icons/fa";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Eligibility Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      newErrors.message = "Please provide a detailed inquiry message (at least 15 characters).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="page-contact" style={{ padding: "48px 0 72px" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
          <div style={{ fontSize: "13px", fontWeight: "bold", color: "var(--color-secondary)", textTransform: "uppercase" }}>
            Student Support & Inquiries
          </div>
          <h1 style={{ fontSize: "2.4rem", margin: "8px 0 16px" }}>
            Contact the Help Desk
          </h1>
          <p style={{ fontSize: "15px", color: "var(--color-text-subtle)" }}>
            Have a question about scholarship criteria, document verification, or your portal account? Reach out to our regional support desk.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "36px", maxWidth: "1000px", margin: "0 auto" }}>
          {/* Contact Details Card */}
          <div className="card" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <h3 style={{ fontSize: "1.25rem", margin: 0, color: "var(--color-primary-dark)" }}>
              Regional Office Information
            </h3>

            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FaMapMarkerAlt />
              </div>
              <div>
                <strong style={{ fontSize: "14px", display: "block", color: "var(--color-text-main)" }}>Physical Address</strong>
                <span style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: "1.4" }}>
                  {BRAND.contact.address}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "var(--color-secondary-50)", color: "var(--color-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FaEnvelope />
              </div>
              <div>
                <strong style={{ fontSize: "14px", display: "block", color: "var(--color-text-main)" }}>Email Inquiries</strong>
                <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
                  {BRAND.contact.email}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FaPhoneAlt />
              </div>
              <div>
                <strong style={{ fontSize: "14px", display: "block", color: "var(--color-text-main)" }}>Telephone Helpline</strong>
                <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
                  {BRAND.contact.phone}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#E2E8F0", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FaClock />
              </div>
              <div>
                <strong style={{ fontSize: "14px", display: "block", color: "var(--color-text-main)" }}>Operating Hours</strong>
                <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
                  {BRAND.contact.helpDeskHours}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="card" style={{ padding: "32px" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "32px 16px" }}>
                <FaCheckCircle color="var(--color-success)" size={48} style={{ marginBottom: "16px" }} />
                <h3 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>Message Received (Demo Mode)</h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: "1.6", marginBottom: "24px" }}>
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been registered in the demo support desk. A representative would normally respond to <strong>{formData.email}</strong> within 1 working day.
                </p>
                <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "Eligibility Inquiry", message: "" }); }}>
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "20px" }}>Send Us a Message</h3>

                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ahmad Tariq"
                  required
                  error={errors.name}
                />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@example.pk"
                    required
                    error={errors.email}
                  />

                  <Input
                    label="Contact Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0345-1234567"
                    hint="Optional"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">
                    Inquiry Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    className="form-select"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="Eligibility Inquiry">Eligibility & Rules Inquiry</option>
                    <option value="Document Verification">Document Attestation & Verification</option>
                    <option value="Payment Issue">Payment Simulation Question</option>
                    <option value="Technical Support">Portal Bug / Technical Support</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    <span>Message <span className="required">*</span></span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className={`form-textarea ${errors.message ? "is-invalid" : ""}`}
                    placeholder="Describe your inquiry with relevant application or scholarship details..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <Button type="submit" variant="primary" loading={loading} style={{ width: "100%", marginTop: "8px" }}>
                  Submit Inquiry Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
