import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import scholarshipService from "../../services/scholarshipService";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { FaSave, FaArrowLeft, FaPlus, FaTrashAlt } from "react-icons/fa";

export const CreateEditScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scholarships, reloadAll } = useData();
  const { showSuccess, showError } = useToast();

  const isEdit = Boolean(id);
  const existing = isEdit ? scholarships.find(s => s.id === id) : null;

  const [formData, setFormData] = useState({
    title: "",
    sponsor: "",
    category: "Merit-based",
    description: "",
    educationLevel: ["Undergraduate", "BS / Bachelor's"],
    minMarksPercent: 70,
    minCGPA: 3.0,
    ageMin: 18,
    ageMax: 26,
    eligibleDistricts: "Dera Ismail Khan, Tank, Bannu",
    incomeCeilingPKR: "",
    financialCoverage: "100% Tuition Fee Subsidy",
    seats: 30,
    openingDate: "2026-10-01",
    deadline: "2026-11-30",
    applicationFee: 0,
    feePurpose: "Free of charge - Supported by community trust endowment.",
    refundPolicy: "N/A (Free application)",
    instructions: "Please ensure all transcripts are clear and attested by the issuing authority.",
    termsAndConditions: "Recipients must maintain satisfactory academic performance.",
    status: "Published",
    customQuestions: [
      { id: "q1", label: "State your academic goals and how this scholarship will assist your education", type: "textarea", required: true }
    ]
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && existing) {
      setFormData({
        title: existing.title || "",
        sponsor: existing.sponsor || "",
        category: existing.category || "Merit-based",
        description: existing.description || "",
        educationLevel: existing.educationLevel || ["Undergraduate"],
        minMarksPercent: existing.eligibility?.minMarksPercent || 70,
        minCGPA: existing.eligibility?.minCGPA || 3.0,
        ageMin: existing.eligibility?.ageMin || 18,
        ageMax: existing.eligibility?.ageMax || 26,
        eligibleDistricts: existing.eligibility?.eligibleDistricts?.join(", ") || "Dera Ismail Khan",
        incomeCeilingPKR: existing.eligibility?.incomeCeilingPKR || "",
        financialCoverage: existing.financialCoverage || "",
        seats: existing.seats || 30,
        openingDate: existing.openingDate || "2026-10-01",
        deadline: existing.deadline || "2026-11-30",
        applicationFee: existing.applicationFee || 0,
        feePurpose: existing.feePurpose || "",
        refundPolicy: existing.refundPolicy || "",
        instructions: existing.instructions || "",
        termsAndConditions: existing.termsAndConditions || "",
        status: existing.status || "Published",
        customQuestions: existing.customQuestions || []
      });
    }
  }, [isEdit, existing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = () => {
    setFormData(prev => ({
      ...prev,
      customQuestions: [
        ...prev.customQuestions,
        { id: `q_${Date.now()}`, label: "New Application Question", type: "text", required: true }
      ]
    }));
  };

  const handleRemoveQuestion = (idx) => {
    setFormData(prev => ({
      ...prev,
      customQuestions: prev.customQuestions.filter((_, i) => i !== idx)
    }));
  };

  const handleQuestionChange = (idx, field, val) => {
    const updated = [...formData.customQuestions];
    updated[idx][field] = val;
    setFormData(prev => ({ ...prev, customQuestions: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showError("Scholarship title is required.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        sponsor: formData.sponsor,
        category: formData.category,
        description: formData.description,
        educationLevel: Array.isArray(formData.educationLevel) ? formData.educationLevel : [formData.educationLevel],
        eligibility: {
          minMarksPercent: parseFloat(formData.minMarksPercent) || null,
          minCGPA: parseFloat(formData.minCGPA) || null,
          ageMin: parseInt(formData.ageMin, 10) || null,
          ageMax: parseInt(formData.ageMax, 10) || null,
          eligibleDistricts: formData.eligibleDistricts.split(",").map(d => d.trim()).filter(Boolean),
          incomeCeilingPKR: formData.incomeCeilingPKR ? parseInt(formData.incomeCeilingPKR, 10) : null,
        },
        financialCoverage: formData.financialCoverage,
        seats: parseInt(formData.seats, 10) || 20,
        openingDate: formData.openingDate,
        deadline: formData.deadline,
        applicationFee: parseFloat(formData.applicationFee) || 0,
        feePurpose: formData.feePurpose,
        refundPolicy: formData.refundPolicy,
        instructions: formData.instructions,
        termsAndConditions: formData.termsAndConditions,
        status: formData.status,
        customQuestions: formData.customQuestions,
        requiredDocuments: [
          { key: "student_photo", name: "Student Photograph", required: true },
          { key: "student_cnic", name: "Student CNIC / B-Form", required: true },
          { key: "matric_marksheet", name: "Matric Marks Sheet", required: true },
          { key: "domicile", name: "District Domicile Certificate", required: true },
        ]
      };

      if (isEdit) {
        await scholarshipService.update(id, payload);
        showSuccess("Scholarship updated successfully!");
      } else {
        await scholarshipService.create(payload);
        showSuccess("New scholarship scheme created successfully!");
      }

      await reloadAll();
      navigate("/admin/scholarships");
    } catch (err) {
      showError(err.message || "Failed to save scholarship.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-create-edit-scholarship" style={{ maxWidth: "900px", margin: "0 auto", paddingBottom: "64px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/admin/scholarships" style={{ color: "var(--color-text-muted)", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <FaArrowLeft size={12} /> Back to Schemes Management
        </Link>
      </div>

      <div className="card" style={{ padding: "32px", backgroundColor: "#FFFFFF" }}>
        <h1 style={{ fontSize: "1.85rem", marginBottom: "8px" }}>
          {isEdit ? `Edit Scheme: ${formData.title}` : "Create New Scholarship Scheme"}
        </h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", marginBottom: "28px" }}>
          Configure transparent eligibility parameters, quota limits, and application questions.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Basic Details */}
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "16px" }}>
            <Input
              label="Scholarship Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Southern KP Talent Award 2026"
              required
            />

            <Input
              label="Sponsor / Organization"
              name="sponsor"
              value={formData.sponsor}
              onChange={handleChange}
              placeholder="e.g. Gomal Educational Trust"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={[
                "Merit-based",
                "Need-based",
                "Government",
                "Private/Institutional",
                "Postgraduate",
                "Special Assistance",
              ]}
              required
            />

            <Select
              label="Initial Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={["Published", "Draft", "Closed"]}
              required
            />

            <Input
              label="Available Seats / Quota"
              name="seats"
              type="number"
              value={formData.seats}
              onChange={handleChange}
              min={1}
            />
          </div>

          <Input
            label="Financial Coverage Summary"
            name="financialCoverage"
            value={formData.financialCoverage}
            onChange={handleChange}
            placeholder="e.g. 100% Tuition Fee + PKR 12,000 Semester Allowance"
            required
          />

          {/* Eligibility Rules */}
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "20px", marginTop: "20px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "16px" }}>Eligibility Evaluation Rules</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px" }}>
              <Input
                label="Min Marks (%)"
                name="minMarksPercent"
                type="number"
                value={formData.minMarksPercent}
                onChange={handleChange}
              />

              <Input
                label="Min CGPA"
                name="minCGPA"
                type="number"
                step="0.01"
                value={formData.minCGPA}
                onChange={handleChange}
              />

              <Input
                label="Min Age"
                name="ageMin"
                type="number"
                value={formData.ageMin}
                onChange={handleChange}
              />

              <Input
                label="Max Age"
                name="ageMax"
                type="number"
                value={formData.ageMax}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "16px" }}>
              <Input
                label="Eligible Districts (Comma separated)"
                name="eligibleDistricts"
                value={formData.eligibleDistricts}
                onChange={handleChange}
                placeholder="Dera Ismail Khan, Tank, Bannu"
                hint="Use 'All' to allow applicants nationwide."
              />

              <Input
                label="Income Ceiling (PKR/mo)"
                name="incomeCeilingPKR"
                type="number"
                value={formData.incomeCeilingPKR}
                onChange={handleChange}
                placeholder="Leave blank for merit"
              />
            </div>
          </div>

          {/* Dates & Fees */}
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "20px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "16px" }}>Dates & Application Fee</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <Input
                label="Opening Date"
                name="openingDate"
                type="date"
                value={formData.openingDate}
                onChange={handleChange}
                required
              />

              <Input
                label="Closing Deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
              />

              <Input
                label="Application Fee (PKR)"
                name="applicationFee"
                type="number"
                value={formData.applicationFee}
                onChange={handleChange}
                min={0}
                hint="0 = Free application"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Input
                label="Fee Purpose Explanation"
                name="feePurpose"
                value={formData.feePurpose}
                onChange={handleChange}
                placeholder="e.g. Free or Document verification field review token"
              />

              <Input
                label="Refund Policy Notice"
                name="refundPolicy"
                value={formData.refundPolicy}
                onChange={handleChange}
                placeholder="e.g. Non-refundable once review begins"
              />
            </div>
          </div>

          {/* Custom Questions Builder */}
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "20px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "1.2rem", margin: 0 }}>Custom Application Questions</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddQuestion} icon={<FaPlus />}>
                Add Question
              </Button>
            </div>

            {formData.customQuestions.map((q, idx) => (
              <div key={q.id || idx} style={{ padding: "14px", backgroundColor: "var(--color-bg-surface)", borderRadius: "6px", marginBottom: "10px", display: "flex", gap: "12px", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "11px", fontWeight: "bold" }}>Question Prompt #{idx + 1}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={q.label}
                    onChange={(e) => handleQuestionChange(idx, "label", e.target.value)}
                  />
                </div>

                <div style={{ width: "140px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "bold" }}>Input Type</label>
                  <select
                    className="form-select"
                    value={q.type}
                    onChange={(e) => handleQuestionChange(idx, "type", e.target.value)}
                  >
                    <option value="text">Short Text</option>
                    <option value="textarea">Paragraph Essay</option>
                  </select>
                </div>

                {formData.customQuestions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(idx)}
                    style={{ background: "none", border: "none", color: "var(--color-danger)", cursor: "pointer", padding: "8px" }}
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </div>
            ))}
          </div>

          <Button type="submit" variant="primary" loading={loading} style={{ width: "100%", padding: "12px", fontSize: "15px" }} icon={<FaSave />}>
            {isEdit ? "Save Scholarship Changes" : "Create & Publish Scheme"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditScholarship;
