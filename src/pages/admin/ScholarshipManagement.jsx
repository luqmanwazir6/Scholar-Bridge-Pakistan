import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import scholarshipService from "../../services/scholarshipService";
import StatusBadge from "../../components/domain/StatusBadge";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { formatPKR, formatDate } from "../../utils/formatters";
import { FaPlus, FaEdit, FaCheck, FaTimes, FaArchive, FaSearch } from "react-icons/fa";

export const ScholarshipManagement = () => {
  const { scholarships, reloadAll } = useData();
  const { showSuccess, showError } = useToast();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Confirmation modal states
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    scholarshipId: null,
    title: "",
    message: "",
    newStatus: "",
    isDanger: false,
  });

  const filtered = scholarships.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.sponsor.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAction = (scholarship, newStatus) => {
    let title = "Confirm Status Change";
    let message = `Are you sure you want to change the status of "${scholarship.title}" to ${newStatus}?`;
    let isDanger = newStatus === "Closed" || newStatus === "Archived";

    if (newStatus === "Published") {
      title = "Publish Scholarship";
      message = `This will publish "${scholarship.title}" to the public portal and open student submissions.`;
    } else if (newStatus === "Closed") {
      title = "Close Application Cycle";
      message = `This will close submissions for "${scholarship.title}". Existing submitted applications remain active for review.`;
    } else if (newStatus === "Archived") {
      title = "Archive Scholarship";
      message = `This will archive "${scholarship.title}". It will no longer appear in open public searches.`;
    }

    setConfirmModal({
      isOpen: true,
      scholarshipId: scholarship.id,
      title,
      message,
      newStatus,
      isDanger,
    });
  };

  const handleConfirmAction = async () => {
    const { scholarshipId, newStatus } = confirmModal;
    setConfirmModal({ ...confirmModal, isOpen: false });

    try {
      await scholarshipService.setStatus(scholarshipId, newStatus);
      await reloadAll();
      showSuccess(`Scholarship status updated to '${newStatus}'.`);
    } catch (err) {
      showError("Failed to update scholarship status.");
    }
  };

  return (
    <div className="page-admin-scholarships">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0284C7", textTransform: "uppercase" }}>
            Curriculum & Grant Schemes
          </span>
          <h1 style={{ fontSize: "1.85rem", margin: "4px 0" }}>
            Scholarship Schemes Management
          </h1>
          <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
            Configure eligibility rules, seat quotas, application fees, and deadlines.
          </p>
        </div>

        <Link to="/admin/scholarships/new" className="btn btn-primary btn-sm" style={{ backgroundColor: "#0284C7" }}>
          <FaPlus style={{ marginRight: "6px" }} /> Create New Scholarship
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: "16px 20px", marginBottom: "24px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: "1 1 260px" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search schemes by title or sponsor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ flex: "1 1 180px" }}>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published (Open)</option>
            <option value="Closed">Closed</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card table-responsive" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", minWidth: "640px", borderCollapse: "collapse", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--color-bg-surface)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Scheme ID</th>
              <th style={{ padding: "12px 16px" }}>Title & Sponsor</th>
              <th style={{ padding: "12px 16px" }}>Category</th>
              <th style={{ padding: "12px 16px" }}>Fee</th>
              <th style={{ padding: "12px 16px" }}>Deadline</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
              <th style={{ padding: "12px 16px", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sch) => (
              <tr key={sch.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                  {sch.id}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ fontWeight: 600 }}>{sch.title}</div>
                  <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)" }}>{sch.sponsor}</div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span className="badge badge-primary">{sch.category}</span>
                </td>
                <td style={{ padding: "12px 16px", fontWeight: "bold" }}>
                  {formatPKR(sch.applicationFee)}
                </td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-subtle)" }}>
                  {formatDate(sch.deadline)}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <StatusBadge status={sch.status} />
                </td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "6px" }}>
                    <Link
                      to={`/admin/scholarships/${sch.id}/edit`}
                      className="btn btn-outline btn-sm"
                      title="Edit scholarship parameters"
                    >
                      <FaEdit /> Edit
                    </Link>

                    {sch.status !== "Published" && (
                      <button
                        onClick={() => handleOpenAction(sch, "Published")}
                        className="btn btn-secondary btn-sm"
                        title="Publish scheme"
                      >
                        <FaCheck /> Publish
                      </button>
                    )}

                    {sch.status === "Published" && (
                      <button
                        onClick={() => handleOpenAction(sch, "Closed")}
                        className="btn btn-outline btn-sm"
                        style={{ color: "var(--color-danger)" }}
                        title="Close application cycle"
                      >
                        <FaTimes /> Close
                      </button>
                    )}

                    {sch.status !== "Archived" && (
                      <button
                        onClick={() => handleOpenAction(sch, "Archived")}
                        className="btn btn-outline btn-sm"
                        style={{ color: "#64748B" }}
                        title="Archive scheme"
                      >
                        <FaArchive />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={handleConfirmAction}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={`Proceed with ${confirmModal.newStatus}`}
        isDanger={confirmModal.isDanger}
      />
    </div>
  );
};

export default ScholarshipManagement;
