import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { maskCNIC, formatPKR } from "../../utils/formatters";
import { calculateAge, validateCNIC, validatePhone, validateEmail } from "../../utils/validators";
import { FaUser, FaShieldAlt, FaSave, FaCheckCircle, FaLock } from "react-icons/fa";

export const MyProfile = () => {
  const { currentUser, updateProfile } = useAuth();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || "",
    fatherName: currentUser?.fatherName || "",
    dob: currentUser?.dob || "2003-05-14",
    gender: currentUser?.gender || "Male",
    cnic: currentUser?.cnic || "12101-1234567-1",
    phone: currentUser?.phone || "0345-7654321",
    email: currentUser?.email || "ahmad.khan@demo.pk",
    district: currentUser?.district || "Dera Ismail Khan",
    domicile: currentUser?.domicile || "Dera Ismail Khan",
    address: currentUser?.address || "House 14, Street 3, Mohallah Qasaban, DI Khan Cantt",
    guardianOccupation: currentUser?.familyFinancial?.guardianOccupation || "School Teacher",
    guardianMonthlyIncomePKR: currentUser?.familyFinancial?.guardianMonthlyIncomePKR || 55000,
    dependentSiblings: currentUser?.familyFinancial?.dependentSiblings || 3,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [unmaskCNIC, setUnmaskCNIC] = useState(false);

  const calculatedAge = calculateAge(formData.dob);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father name is required.";
    
    const cnicErr = validateCNIC(formData.cnic);
    if (cnicErr) newErrors.cnic = cnicErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showError("Please correct the errors in the form.");
      return;
    }

    setLoading(true);
    try {
      const updates = {
        fullName: formData.fullName,
        fatherName: formData.fatherName,
        dob: formData.dob,
        gender: formData.gender,
        cnic: formData.cnic,
        phone: formData.phone,
        email: formData.email,
        district: formData.district,
        domicile: formData.domicile,
        address: formData.address,
        familyFinancial: {
          ...currentUser?.familyFinancial,
          guardianOccupation: formData.guardianOccupation,
          guardianMonthlyIncomePKR: parseInt(formData.guardianMonthlyIncomePKR, 10),
          dependentSiblings: parseInt(formData.dependentSiblings, 10),
        }
      };

      const res = await updateProfile(updates);
      if (res.success) {
        showSuccess("Profile updated successfully!");
      } else {
        showError(res.error || "Failed to update profile.");
      }
    } catch (err) {
      showError("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-my-profile" style={{ maxWidth: "860px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.85rem", marginBottom: "6px" }}>Personal Profile & Identity</h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
          Manage your student identity, domicile records, and means-testing financial details.
        </p>
      </div>

      <form onSubmit={handleSave}>
        {/* Basic Identity Card */}
        <div className="card" style={{ padding: "28px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaUser color="var(--color-primary)" /> Basic Student Information
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              error={errors.fullName}
            />

            <Input
              label="Father / Guardian Name"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
              error={errors.fatherName}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <Input
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            <div className="form-group">
              <label className="form-label">Calculated Age</label>
              <input
                type="text"
                className="form-input"
                value={`${calculatedAge} Years`}
                readOnly
                disabled
                style={{ backgroundColor: "var(--color-bg-surface)" }}
              />
              <span className="form-hint">Auto-calculated from date of birth</span>
            </div>

            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={["Male", "Female", "Other"]}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "16px" }}>
            <div className="form-group">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <label className="form-label" style={{ margin: 0 }}>
                  CNIC or B-Form Number <span className="required">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setUnmaskCNIC(!unmaskCNIC)}
                  style={{ background: "none", border: "none", color: "var(--color-primary)", fontSize: "11.5px", cursor: "pointer", fontWeight: 600 }}
                >
                  {unmaskCNIC ? "Mask CNIC" : "Show Full CNIC"}
                </button>
              </div>

              {unmaskCNIC ? (
                <input
                  type="text"
                  name="cnic"
                  className={`form-input ${errors.cnic ? "is-invalid" : ""}`}
                  value={formData.cnic}
                  onChange={handleChange}
                  placeholder="12101-1234567-1"
                />
              ) : (
                <input
                  type="text"
                  className="form-input"
                  value={maskCNIC(formData.cnic)}
                  readOnly
                  onClick={() => setUnmaskCNIC(true)}
                  style={{ cursor: "pointer", backgroundColor: "#F8FAFC" }}
                  title="Click to edit unmasked CNIC"
                />
              )}
              {errors.cnic ? (
                <span className="form-error">{errors.cnic}</span>
              ) : (
                <span className="form-hint">Masked for privacy. 13-digit Pakistani format.</span>
              )}
            </div>

            <Input
              label="Mobile Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0345-1234567"
              required
              error={errors.phone}
            />
          </div>

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />
        </div>

        {/* Domicile & Residence Card */}
        <div className="card" style={{ padding: "28px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "20px" }}>
            Domicile & Regional Residence
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Select
              label="District of Domicile"
              name="district"
              value={formData.district}
              onChange={handleChange}
              options={[
                "Dera Ismail Khan",
                "Tank",
                "Bannu",
                "Lakki Marwat",
                "South Waziristan",
                "North Waziristan",
                "Peshawar",
                "Mardan",
                "Kohat",
                "Bhakkar",
                "Other District",
              ]}
              required
            />

            <Input
              label="Tehsil / Union Council"
              name="domicile"
              value={formData.domicile}
              onChange={handleChange}
              placeholder="e.g. Dera Ismail Khan Tehsil"
              required
            />
          </div>

          <Input
            label="Current Residential Street Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House/Street, Mohallah, City"
            required
          />
        </div>

        {/* Family & Means Assessment Card */}
        <div className="card" style={{ padding: "28px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "20px" }}>
            Family & Financial Information (Need-Based Evaluation)
          </h2>
          <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "16px" }}>
            Used strictly to evaluate eligibility for need-based subsidies and fee concessions.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <Input
              label="Guardian Occupation"
              name="guardianOccupation"
              value={formData.guardianOccupation}
              onChange={handleChange}
              placeholder="e.g. Govt Teacher, Shopkeeper"
            />

            <Input
              label="Monthly Family Income (PKR)"
              name="guardianMonthlyIncomePKR"
              type="number"
              value={formData.guardianMonthlyIncomePKR}
              onChange={handleChange}
              step={1000}
            />

            <Input
              label="Dependent Siblings"
              name="dependentSiblings"
              type="number"
              value={formData.dependentSiblings}
              onChange={handleChange}
              min={0}
              max={15}
            />
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <Button type="submit" variant="primary" loading={loading} icon={<FaSave />}>
            Save Changes to Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
