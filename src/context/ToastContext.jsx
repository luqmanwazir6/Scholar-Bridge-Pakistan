import React, { createContext, useContext, useState, useCallback } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes, FaTimesCircle } from "react-icons/fa";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showSuccess = useCallback((msg, duration) => addToast(msg, "success", duration), [addToast]);
  const showError = useCallback((msg, duration) => addToast(msg, "error", duration), [addToast]);
  const showWarning = useCallback((msg, duration) => addToast(msg, "warning", duration), [addToast]);
  const showInfo = useCallback((msg, duration) => addToast(msg, "info", duration), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, showSuccess, showError, showWarning, showInfo }}>
      {children}
      <div 
        className="toast-container" 
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxWidth: "420px",
          pointerEvents: "none"
        }}
        aria-live="polite"
      >
        {toasts.map(toast => {
          let bg = "#1e293b";
          let border = "#334155";
          let icon = <FaInfoCircle color="#38bdf8" />;

          if (toast.type === "success") {
            bg = "#064e3b";
            border = "#059669";
            icon = <FaCheckCircle color="#34d399" />;
          } else if (toast.type === "error") {
            bg = "#7f1d1d";
            border = "#dc2626";
            icon = <FaTimesCircle color="#f87171" />;
          } else if (toast.type === "warning") {
            bg = "#78350f";
            border = "#d97706";
            icon = <FaExclamationTriangle color="#fbbf24" />;
          }

          return (
            <div
              key={toast.id}
              role="status"
              style={{
                backgroundColor: bg,
                border: `1px solid ${border}`,
                color: "#f8fafc",
                padding: "12px 16px",
                borderRadius: "8px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                fontSize: "14px",
                lineHeight: "1.4",
                pointerEvents: "auto",
                animation: "toastSlideIn 0.2s ease-out",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "16px", display: "flex" }}>{icon}</span>
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Dismiss toast"
              >
                <FaTimes size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastContext;
