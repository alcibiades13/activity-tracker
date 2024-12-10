// InputField.js

import React from 'react';

const InputField = ({ field, formData, handleChange, handleNestedChange, index, parentFieldName }) => {
  const { name, label, fieldType, options, placeholder, type } = field;

  const currentName = parentFieldName ? `${parentFieldName}.${name}` : name; // Handle nested field name

  if (fieldType === 'select') {
    return (
      <div className="form-group">
        <label htmlFor={currentName}>{label}</label>
        <select
          id={currentName}
          name={currentName}
          value={formData[currentName] || ''}
          onChange={handleChange}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (fieldType === 'date') {
    return (
      <div className="form-group">
        <label htmlFor={currentName}>{label}</label>
        <input
          id={currentName}
          name={currentName}
          type="date"
          value={formData[currentName] || ''}
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={currentName}>{label}</label>
      <input
        id={currentName}
        name={currentName}
        placeholder={placeholder}
        type={type || 'text'}
        value={formData[currentName] || ''}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
