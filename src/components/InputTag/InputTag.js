import React from "react";

// Icons
import { Add, Close } from "@mui/icons-material";

// CSS
import "./style.css";

function InputTag({ id, value, tags, label, addTag, deleteTag, handleChange }) {
  function handleKeyPress(e) {
    const code = e.keyCode || e.which;
    if (code === 13) {
      e.preventDefault();
      e.stopPropagation();
      addTag();
    }
  }

  return (
    <>
      <div className="tags-wrapper">
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
        <input
          className="input-field-tag"
          type="text"
          name={id}
          id={id}
          value={value}
          placeholder="Enter a tag..."
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <Add className="pointer" onClick={addTag} />
      </div>
      {tags.length === 0 && <div>No tags</div>}
      <ul className="list-tags">
        {tags.map((tag, index) => (
          <li
            className="list-tags-element"
            data-index={index}
            key={index}
            onClick={deleteTag}
          >
            <Close />
            <div>{tag}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default InputTag;
