import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { validateMarks, validateCGPA } from "../../utils/validators";
import { FaGraduationCap, FaPlus, FaTrashAlt, FaSave, FaBook } from "react-icons/fa";

export const EducationHistory = () => {
  const { currentUser, updateProfile } = useAuth();
  const { showSuccess, showError } = useToast();

  const [currentEducation, setCurrentEducation] = useState({
    level: currentUser?.currentEducation?.level || "Undergraduate",
    program: currentUser?.currentEducation?.program || "BS Computer Science",
    institution: currentUser?.currentEducation?.institution || "Gomal University DI Khan",
    currentSemester: currentUser?.currentEducation?.currentSemester || "5th Semester",
    cgpa: currentUser?.currentEducation?.cgpa || 3.42,
    rollNumber: currentUser?.currentEducation?.rollNumber || "GU-CS-2022-48",
    passingYear: currentUser?.currentEducation?.passingYear || 2026,
    enrollmentStatus: currentUser?.currentEducation?.enrollmentStatus || "Enrolled",
  });

  const [historyRows, setHistoryRows] = useState(
    currentUser?.educationHistory && currentUser.educationHistory.length > 0
      ? currentUser.educationHistory
      : [
          {
            id: "edu_1",
            level: "Matric / SSC",
            board: "BISE Dera Ismail Khan",
            school: "Govt Comprehensive High School DI Khan",
            passingYear: "2020",
            totalMarks: 1100,
            obtainedMarks: 910,
            percentage: 82.72,
            major: "Science (Biology)",
          },
          {
            id: "edu_2",
            level: "Intermediate / FA / FSc / ICS",
            board: "BISE Dera Ismail Khan",
            school: "Govt Post Graduate College No 1 DI Khan",
            passingYear: "2022",
            totalMarks: 1100,
            obtainedMarks: 865,
            percentage: 78.63,
            major: "ICS (Computer Science)",
          }
        ]
  );

  const [loading, setLoading] = useState(false);

  const handleCurrentChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation(prev => ({ ...prev, [name]: value }));
  };

  const handleRowChange = (index, field, value) => {
    const updated = [...historyRows];
    updated[index][field] = value;

    // Auto-calculate percentage if marks changed
    if (field === "obtainedMarks" || field === "totalMarks") {
      const obt = parseFloat(field === "obtainedMarks" ? value : updated[index].obtainedMarks);
      const tot = parseFloat(field === "totalMarks" ? value : updated[index].totalMarks);
      if (!isNaN(obt) && !isNaN(tot) && tot > 0) {
        updated[index].percentage = parseFloat(((obt / tot) * 100).toFixed(2));
      }
    }

    setHistoryRows(updated);
  };

  const handleAddRow = () => {
    setHistoryRows([
      ...historyRows,
      {
        id: `edu_${Date.now()}`,
        level: "Intermediate / FA / FSc / ICS",
        board: "BISE Dera Ismail Khan",
        school: "",
        passingYear: "2024",
        totalMarks: 1100,
        obtainedMarks: 800,
        percentage: 72.73,
        major: "Pre-Medical",
      }
    ]);
  };

  const handleRemoveRow = (index) => {
    if (historyRows.length === 1) {
      showError("You must retain at least one prior qualification.");
      return;
    }
    setHistoryRows(historyRows.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updates = {
        currentEducation: {
          ...currentEducation,
          cgpa: parseFloat(currentEducation.cgpa),
        },
        educationHistory: historyRows,
      };

      const res = await updateProfile(updates);
      if (res.success) {
        showSuccess("Education history & academic profile updated!");
      } else {
        showError(res.error || "Update failed");
      }
    } catch (err) {
      showError("Failed to save changes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-education-history" style={{ maxWidth: "920px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.85rem", marginBottom: "6px" }}>Education Profile & Records</h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
          Manage your current enrollment and past Board / University examination records for merit calculations.
        </p>
      </div>

      <form onSubmit={handleSave}>
        {/* Current Enrollment */}
        <div className="card" style={{ padding: "28px", marginBottom: "28px" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaGraduationCap color="var(--color-primary)" /> Currently Enrolled Program
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Select
              label="Degree / Education Level"
              name="level"
              value={currentEducation.level}
              onChange={handleCurrentChange}
              options={[
                "Undergraduate",
                "Intermediate / FA / FSc / ICS",
                "Associate Degree",
                "Master's",
                "MS / MPhil",
                "PhD / Doctoral",
              ]}
              required
            />

            <Input
              label="Major Discipline / Program Title"
              name="program"
              value={currentEducation.program}
              onChange={handleCurrentChange}
              placeholder="e.g. BS Software Engineering"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "16px" }}>
            <Input
              label="University / Degree College"
              name="institution"
              value={currentEducation.institution}
              onChange={handleCurrentChange}
              placeholder="e.g. Gomal University DI Khan"
              required
            />

            <Input
              label="Student Roll / Registration No"
              name="rollNumber"
              value={currentEducation.rollNumber}
              onChange={handleCurrentChange}
              placeholder="GU-CS-2022-48"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <Select
              label="Current Semester"
              name="currentSemester"
              value={currentEducation.currentSemester}
              onChange={handleCurrentChange}
              options={[
                "1st Semester",
                "2nd Semester",
                "3rd Semester",
                "4th Semester",
                "5th Semester",
                "6th Semester",
                "7th Semester",
                "8th Semester",
                "Graduated / Awaiting Clearance",
              ]}
            />

            <Input
              label="Current CGPA (0.00 – 4.00)"
              name="cgpa"
              type="number"
              step="0.01"
              value={currentEducation.cgpa}
              onChange={handleCurrentChange}
              required
            />

            <Input
              label="Expected Graduation Year"
              name="passingYear"
              type="number"
              value={currentEducation.passingYear}
              onChange={handleCurrentChange}
            />
          </div>
        </div>

        {/* Previous Qualifications Table */}
        <div className="card" style={{ padding: "28px", marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <FaBook color="var(--color-secondary)" /> Previous Qualifications & Board Certificates
            </h2>
            <Button type="button" variant="outline" size="sm" onClick={handleAddRow} icon={<FaPlus />}>
              Add Qualification
            </Button>
          </div>

          <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "20px" }}>
            Percentage is calculated automatically based on obtained and total marks.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {historyRows.map((row, idx) => (
              <div
                key={row.id || idx}
                style={{
                  padding: "20px",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  backgroundColor: "var(--color-bg-surface)",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "14px", color: "var(--color-primary-dark)" }}>
                    #{idx + 1} {row.level}
                  </span>
                  {historyRows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(idx)}
                      style={{ background: "none", border: "none", color: "var(--color-danger)", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", gap: "4px" }}
                    >
                      <FaTrashAlt size={12} /> Remove
                    </button>
                  )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "bold" }}>Level</label>
                    <select
                      className="form-select"
                      value={row.level}
                      onChange={(e) => handleRowChange(idx, "level", e.target.value)}
                    >
                      <option value="Matric / SSC">Matric / SSC</option>
                      <option value="Intermediate / FA / FSc / ICS">Intermediate / FA / FSc / ICS</option>
                      <option value="Associate Degree">Associate Degree</option>
                      <option value="Undergraduate">Undergraduate / BS</option>
                      <option value="Master's">Master's</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "bold" }}>Examining Board / University</label>
                    <input
                      type="text"
                      className="form-input"
                      value={row.board}
                      onChange={(e) => handleRowChange(idx, "board", e.target.value)}
                      placeholder="e.g. BISE Dera Ismail Khan"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "12px", marginBottom: "12px" }}>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "bold" }}>School / College Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={row.school}
                      onChange={(e) => handleRowChange(idx, "school", e.target.value)}
                      placeholder="e.g. Govt Comprehensive High School DI Khan"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "bold" }}>Major / Discipline</label>
                    <input
                      type="text"
                      className="form-input"
                      value={row.major}
                      onChange={(e) => handleRowChange(idx, "major", e.target.value)}
                      placeholder="e.g. Pre-Engineering"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "bold" }}>Passing Year</label>
                    <input
                      type="text"
                      className="form-input"
                      value={row.passingYear}
                      onChange={(e) => handleRowChange(idx, "passingYear", e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "bold" }}>Total Marks</label>
                    <input
                      type="number"
                      className="form-input"
                      value={row.totalMarks}
                      onChange={(e) => handleRowChange(idx, "totalMarks", e.target.value)}
                      min={100}
                      max={2000}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "bold" }}>Obtained Marks</label>
                    <input
                      type="number"
                      className="form-input"
                      value={row.obtainedMarks}
                      onChange={(e) => handleRowChange(idx, "obtainedMarks", e.target.value)}
                      min={0}
                      max={2000}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "bold" }}>Percentage</label>
                    <input
                      type="text"
                      className="form-input"
                      value={`${row.percentage}%`}
                      readOnly
                      disabled
                      style={{ fontWeight: "bold", backgroundColor: "#FFFFFF", color: "var(--color-primary-dark)" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <Button type="submit" variant="primary" loading={loading} icon={<FaSave />}>
            Save Educational History
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EducationHistory;
