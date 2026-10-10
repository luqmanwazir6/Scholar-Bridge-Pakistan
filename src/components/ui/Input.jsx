import React from "react";

export const Input = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error = null,
  hint = null,
  disabled = false,
  className = "",
  readOnly = false,
  ...props
}) => {
  const inputId = id || name;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          <span>
            {label}
            {required && <span className="required" aria-hidden="true"> *</span>}
          </span>
          {required && <span style={{ fontSize: "11px", color: "var(--color-text-subtle)", fontWeight: "normal" }}>Required</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={`form-input ${error ? "is-invalid" : ""}`}
        {...props}
      />
      {hint && !error && <span id={`${inputId}-hint`} className="form-hint">{hint}</span>}
      {error && <span id={`${inputId}-error`} className="form-error" role="alert">{error}</span>}
    </div>
  );
};

export default Input;
