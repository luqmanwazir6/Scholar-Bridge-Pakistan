import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { SEED_STUDENTS } from "../../data/seedStudents";
import { getStored } from "../../services/storageHelper";
import { API_CONFIG } from "../../config/apiConfig";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { maskCNIC, maskPhone } from "../../utils/formatters";
import { FaUserGraduate, FaEye, FaSearch } from "react-icons/fa";

export const StudentManagement = () => {
  const { applications } = useData();
  const students = getStored(API_CONFIG.STORAGE_KEYS.STUDENTS, SEED_STUDENTS);

  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filtered = students.filter(s =>
    s.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.cnic?.includes(search)
  );

  return (
    <div className="page-admin-students">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0284C7", textTransform: "uppercase" }}>
            Candidate Roster
          </span>
          <h1 style={{ fontSize: "1.85rem", margin: "4px 0" }}>
            Student Candidate Registry
          </h1>
          <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
            Inspect registered student profiles, domicile records, and submission histories.
          </p>
        </div>

        <div style={{ width: "260px" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search student by name or CNIC..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--color-bg-surface)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Candidate ID</th>
              <th style={{ padding: "12px 16px" }}>Full Name & Guardian</th>
              <th style={{ padding: "12px 16px" }}>CNIC (Masked)</th>
              <th style={{ padding: "12px 16px" }}>Enrolled Institution</th>
              <th style={{ padding: "12px 16px" }}>Domicile</th>
              <th style={{ padding: "12px 16px" }}>Profile Score</th>
              <th style={{ padding: "12px 16px", textAlign: "right" }}>Inspect</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((stu) => {
              const stuApps = applications.filter(a => a.studentId === stu.id);
              const score = stu.profileCompletedPercent || 80;

              return (
                <tr key={stu.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                    {stu.id}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: 600 }}>{stu.fullName}</div>
                    <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)" }}>S/D of {stu.fatherName}</div>
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)" }}>
                    {maskCNIC(stu.cnic)}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div>{stu.currentEducation?.institution || "Gomal University DI Khan"}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-subtle)" }}>{stu.currentEducation?.program}</div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {stu.district || stu.domicile || "Dera Ismail Khan"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontWeight: "bold", color: score >= 90 ? "var(--color-success)" : "var(--color-primary)" }}>
                      {score}%
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <button
                      onClick={() => setSelectedStudent(stu)}
                      className="btn btn-outline btn-sm"
                    >
                      <FaEye /> View Profile
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Candidate Profile: ${selectedStudent.fullName}`}
          maxWidth="640px"
          footer={
            <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
              Close
            </Button>
          }
        >
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "13px", marginBottom: "20px" }}>
              <div><strong>Candidate ID:</strong> {selectedStudent.id}</div>
              <div><strong>Email:</strong> {selectedStudent.email}</div>
              <div><strong>Contact Mobile:</strong> {selectedStudent.phone}</div>
              <div><strong>CNIC (Masked):</strong> {maskCNIC(selectedStudent.cnic)}</div>
              <div><strong>Date of Birth:</strong> {selectedStudent.dob}</div>
              <div><strong>Domicile District:</strong> {selectedStudent.district}</div>
              <div style={{ gridColumn: "span 2" }}><strong>Address:</strong> {selectedStudent.address}</div>
            </div>

            <h4 style={{ fontSize: "13px", textTransform: "uppercase", color: "var(--color-text-subtle)", marginBottom: "8px" }}>
              Academic Qualifications
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              {selectedStudent.educationHistory?.map((edu, idx) => (
                <div key={idx} style={{ padding: "10px 14px", backgroundColor: "var(--color-bg-surface)", borderRadius: "6px", fontSize: "13px", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{edu.level}</div>
                    <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)" }}>{edu.school} ({edu.board})</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <strong style={{ color: "var(--color-primary-dark)" }}>{edu.percentage}%</strong>
                    <div style={{ fontSize: "11px", color: "var(--color-text-subtle)" }}>Year {edu.passingYear}</div>
                  </div>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: "13px", textTransform: "uppercase", color: "var(--color-text-subtle)", marginBottom: "8px" }}>
              Submitted Applications Count
            </h4>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "var(--color-primary)" }}>
              {applications.filter(a => a.studentId === selectedStudent.id).length} Active Applications on Record
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StudentManagement;
