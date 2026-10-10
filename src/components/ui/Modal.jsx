import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "600px",
  footer = null,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex: 1000,
        animation: "fadeIn 0.15s ease-out",
      }}
    >
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          width: "100%",
          maxWidth: maxWidth,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
        }}
      >
        <div
          className="modal-header"
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 id="modal-title" style={{ margin: 0, fontSize: "1.25rem", color: "var(--color-text-main)" }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-text-subtle)",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              borderRadius: "4px",
            }}
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div
          className="modal-body"
          style={{
            padding: "24px",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {children}
        </div>

        {footer && (
          <div
            className="modal-footer"
            style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--color-border)",
              backgroundColor: "var(--color-bg-surface)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
