import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { FaExclamationTriangle } from "react-icons/fa";

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = false,
  loading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="480px"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={isDanger ? "danger" : "primary"}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        {isDanger && (
          <div
            style={{
              backgroundColor: "var(--color-danger-bg)",
              color: "var(--color-danger)",
              padding: "10px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FaExclamationTriangle size={24} />
          </div>
        )}
        <div style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--color-text-muted)" }}>
          {message}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
