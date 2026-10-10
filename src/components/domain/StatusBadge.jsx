import React from "react";
import Badge from "../ui/Badge";
import { FaCheckCircle, FaClock, FaEdit, FaExclamationCircle, FaTimesCircle, FaAward } from "react-icons/fa";

export const StatusBadge = ({ status, showTooltip = true }) => {
  let variant = "neutral";
  let icon = null;
  let explanation = "";

  switch (status) {
    case "Draft":
      variant = "neutral";
      icon = <FaClock size={11} />;
      explanation = "Application saved locally; not yet submitted for review.";
      break;
    case "Submitted":
      variant = "primary";
      icon = <FaClock size={11} />;
      explanation = "Submitted by student; queued for administrative eligibility verification.";
      break;
    case "Under Review":
    case "Under Verification":
      variant = "warning";
      icon = <FaClock size={11} />;
      explanation = "Desk officers are actively verifying academic certificates and domicile.";
      break;
    case "Correction Required":
      variant = "danger";
      icon = <FaEdit size={11} />;
      explanation = "Admin requested re-upload or clarification on specific documents or data.";
      break;
    case "Approved":
      variant = "primary";
      icon = <FaCheckCircle size={11} />;
      explanation = "Credentials verified & approved by review board. Awaiting final award fund allocation.";
      break;
    case "Awarded":
    case "Disbursed":
      variant = "success";
      icon = <FaAward size={11} />;
      explanation = "Scholarship grant finalized and funds/voucher dispatched to the institution.";
      break;
    case "Rejected":
      variant = "danger";
      icon = <FaTimesCircle size={11} />;
      explanation = "Did not meet eligibility guidelines or quota ceiling for this cycle.";
      break;
    case "Published":
      variant = "success";
      icon = <FaCheckCircle size={11} />;
      explanation = "Open and currently accepting online applications.";
      break;
    case "Closed":
      variant = "neutral";
      icon = <FaTimesCircle size={11} />;
      explanation = "Application window is now closed.";
      break;
    case "Verified":
      variant = "success";
      icon = <FaCheckCircle size={11} />;
      explanation = "Document has been inspected and confirmed valid.";
      break;
    default:
      variant = "neutral";
      explanation = status;
  }

  return (
    <span title={showTooltip ? explanation : undefined} style={{ display: "inline-flex" }}>
      <Badge variant={variant} icon={icon}>
        {status}
      </Badge>
    </span>
  );
};

export default StatusBadge;
