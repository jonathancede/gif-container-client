import React from "react";

// CSS
import "./style.css";

function Input({
  type,
  id,
  placeholder,
  value,
  isTouched,
  isError,
  errorMessage,
  handleChange,
  handleBlur,
  label,
}) {
  return (
    <>
      <div className="input-wrapper">
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
        <input
          className={
            isTouched
              ? [isError ? "input-field withError" : "input-field withSuccess"]
              : "input-field"
          }
          type={type}
          name={id}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isError && <div className="errorMessage">{errorMessage}</div>}
      </div>
    </>
  );
}

export default Input;
