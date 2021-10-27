import React from "react";

// CSS
import "./style.css";

function InputFile({
  id,
  value,
  isTouched,
  isError,
  errorMessage,
  handleChange,
  label,
}) {
  return (
    <>
      <div className="input-wrapper">
        <label className="pointer" htmlFor={id}>
          <div className="input-label">{label}</div>
          {value ? (
            <div
              className={
                isTouched
                  ? "file-text-box color-black withSuccess"
                  : "file-text-box color-black"
              }
            >
              {value.substr(12)}
            </div>
          ) : (
            <div
              className={
                isTouched
                  ? "file-text-box color-gray withError"
                  : "file-text-box color-gray"
              }
            >
              + Add a file...
            </div>
          )}
        </label>
        <input
          className="upload-input"
          type="file"
          accept=".gif"
          name={id}
          id={id}
          value={value}
          onChange={handleChange}
        />
        {isError && <div className="errorMessage">{errorMessage}</div>}
      </div>
    </>
  );
}

export default InputFile;
