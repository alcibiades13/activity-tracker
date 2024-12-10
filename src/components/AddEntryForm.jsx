import { useState } from "react";
import { addEntry } from "../services/apiService";
import PropTypes from "prop-types";
import { getFormFieldsForType } from "../lib/dataUtils";
import { useNavigate } from "react-router-dom";

const AddEntryForm = ({ type, onEntryAdded }) => {
  const [formData, setFormData] = useState({});
  const fields = getFormFieldsForType(type);
  const navigate = useNavigate(); // To navigate back after submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Initialize nested fields properly
  const handleNestedChange = (e, nestedField, index) => {
    const { name, value } = e.target;
    const fieldName = name.split('.'); // Get the nested field name

    setFormData((prev) => {
      const updatedNestedFields = [...(prev[nestedField] || [])];

      if (!updatedNestedFields[index]) {
        updatedNestedFields[index] = {}; // Initialize empty object for that index
      }

      // Update the nested field dynamically
      updatedNestedFields[index][fieldName[1]] = value;

      return {
        ...prev,
        [nestedField]: updatedNestedFields,
      };
    });
  };

  const handleAddNestedField = (nestedField) => {
    setFormData((prev) => {
      const updatedNestedFields = [...(prev[nestedField] || [])];
      updatedNestedFields.push({}); // Add an empty object for new field

      return {
        ...prev,
        [nestedField]: updatedNestedFields,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEntry(type, formData); // Use the utility function
      alert(`New ${type} added successfully!`);
      setFormData({}); // Reset the form
      if (onEntryAdded) onEntryAdded(); // Callback for parent component
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
      alert(`Failed to add ${type}.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`form add-${type}-form`}>
      {/* Loop through the fields */}
      {fields.map((field) => {
        // Check if the field is nested (like "tasks")
        if (field.nested) {
          return (
            <div key={field.name} className="nested-field">
              <h3>{field.label}</h3>
              {/* Loop through nested fields for tasks */}
              {(formData[field.name] || []).map((nestedFieldData, index) => (
                <div className="form-group" key={index}>
                  {field.fields.map((nestedField) => (
                    <div key={nestedField.name}>
                      <label htmlFor={nestedField.name}>
                        {nestedField.label}
                      </label>
                      {nestedField.fieldType === "select" ? (
                        <select
                          id={nestedField.name}
                          name={`${field.name}[${index}].${nestedField.name}`}
                          value={nestedFieldData[nestedField.name] || ""}
                          onChange={(e) =>
                            handleNestedChange(e, field.name, index)
                          }
                        >
                          <option value="">{nestedField.placeholder}</option>
                          {nestedField.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : nestedField.fieldType === "date" ? (
                        <input
                          id={nestedField.name}
                          name={`${field.name}[${index}].${nestedField.name}`}
                          type="date"
                          value={nestedFieldData[nestedField.name] || ""}
                          onChange={(e) =>
                            handleNestedChange(e, field.name, index)
                          }
                        />
                      ) : (
                        <input
                          id={nestedField.name}
                          name={`${field.name}[${index}].${nestedField.name}`}
                          placeholder={nestedField.placeholder}
                          type={nestedField.type || "text"}
                          value={nestedFieldData[nestedField.name] || ""}
                          onChange={(e) =>
                            handleNestedChange(e, field.name, index)
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
              {/* Add Button for Nested Fields */}
              <button
                type="button"
                onClick={() => handleAddNestedField(field.name)}
                className="add-nested-btn"
              >
                Add {field.label}
              </button>
            </div>
          );
        } else {
          // For non-nested fields, render as normal
          return (
            <div className="form-group" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.fieldType === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.fieldType === "date" ? (
                <input
                  id={field.name}
                  name={field.name}
                  type="date"
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  type={field.type || "text"}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          );
        }
      })}

      <button type="submit" className="submit-btn">
        Add {type}
      </button>
    </form>
  );
};

AddEntryForm.propTypes = {
  type: PropTypes.string.isRequired, // Ensures `type` is a required string
  onEntryAdded: PropTypes.func, // Validates that `onEntryAdded` is an optional function
};

export default AddEntryForm;
