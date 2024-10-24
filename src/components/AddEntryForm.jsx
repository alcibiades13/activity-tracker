import { useState } from "react";
import { addEmployee, addProject, addActivity } from "../services/apiService"; // Import API functions

const AddEntryForm = ({ type }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the correct function based on the `type` prop
    try {
      switch (type) {
        case "employee":
          await addEmployee(formData);
          break;
        case "project":
          await addProject(formData);
          break;
        case "activity":
          await addActivity(formData);
          break;
        default:
          console.error("Unknown type");
      }
      alert(`New ${type} added successfully!`);
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render fields based on the type */}
      {type === "employee" && (
        <>
          <input
            name="name"
            placeholder="Employee Name"
            onChange={handleChange}
          />
          <input
            name="position"
            placeholder="Position"
            onChange={handleChange}
          />
        </>
      )}

      {type === "project" && (
        <>
          <input
            name="name"
            placeholder="Project Name"
            onChange={handleChange}
          />
          <input name="status" placeholder="Status" onChange={handleChange} />
        </>
      )}

      {type === "activity" && (
        <>
          <input
            name="activityType"
            placeholder="Activity Type"
            onChange={handleChange}
          />
          <input
            name="durationHours"
            placeholder="Duration (hours)"
            onChange={handleChange}
          />
        </>
      )}

      <button type="submit">Add {type}</button>
    </form>
  );
};

export default AddEntryForm;
