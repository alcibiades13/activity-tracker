import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const EditEntryForm = ({ type, fields, endpoint, id }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch existing data when the component mounts or the `id` changes
    const fetchEntryData = async () => {
      try {
        const response = await axios.get(`${endpoint}/${id}`);
        setFormData(response.data); // Populate the form data with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchEntryData(); // Only fetch if `id` is available
    }
  }, [id, endpoint]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${endpoint}/${id}`, formData); // Update the entry
      alert("Data updated successfully!");
      navigate(-1); // Navigate to the previous page
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form edit-entry-form">
        {fields.map((field) => (
            <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>{field.placeholder}</label>
            {field.fieldType === "input" && (
                <input
                id={field.name}
                name={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={formData[field.name] || ""} // Default to an empty string if undefined
                onChange={handleChange}
                />
            )}
            {field.fieldType === "select" && (
                <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""} // Default to empty string if not set yet
                onChange={handleChange}
                >
                {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
                </select>
            )}
            {field.fieldType === "radio" && (
                <div className="form-row">
                {field.options.map((option) => (
                    <label key={option.value}>
                    <input
                        type="radio"
                        name={field.name}
                        value={option.value}
                        checked={formData[field.name] === option.value}
                        onChange={handleChange}
                    />
                    {option.label}
                    </label>
                ))}
                </div>
            )}
            {field.fieldType === "date" && (
                <input
                type="date"
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                />
            )}
            {field.fieldType === "textarea" && (
                <textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleChange}
                />
            )}
            </div>
        ))}
        <div className="buttons-wrapper">
            <button type="submit" className="btn submit-btn">
                Update {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
            <button type="button" onClick={() => navigate(-1)} className="btn btn-transparent">
                Cancel
            </button>
        </div>
    </form>
  );
};

EditEntryForm.propTypes = {
  type: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  endpoint: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default EditEntryForm;
