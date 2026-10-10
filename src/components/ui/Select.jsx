import React from "react";

export const Select = ({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option...",
  required = false,
  error = null,
  hint = null,
  disabled = false,
  className = "",
  ...props
}) => {
  const selectId = id || name;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          <span>
            {label}
            {required && <span className="required" aria-hidden="true"> *</span>}
          </span>
          {required && <span style={{ fontSize: "11px", color: "var(--color-text-subtle)", fontWeight: "normal" }}>Required</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
        className={`form-select ${error ? "is-invalid" : ""}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const val = typeof opt === "object" ? opt.value : opt;
          const lbl = typeof opt === "object" ? opt.label : opt;
          return (
            <option key={String(val)} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
      {hint && !error && <span id={`${selectId}-hint`} className="form-hint">{hint}</span>}
      {error && <span id={`${selectId}-error`} className="form-error" role="alert">{error}</span>}
    </div>
  );
};

export default Select;
