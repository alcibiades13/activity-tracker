import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    status: "",
    salary: ""
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/employees", formData);
      // Handle successful submission
      navigate(-1); // Redirect to /employees after successful submission
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form add-employee-form">
      <div className="form-group">
        <label htmlFor="name">Employee Name</label>
        <input
          id="name"
          name="name"
          placeholder="Enter Employee Name"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Employee Role</label>
        <input
          id="role"
          name="role"
          placeholder="Enter Employee Role"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Employee Email</label>
        <input
          id="email"
          name="email"
          placeholder="Enter Employee Email"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Employee Phone</label>
        <input
          id="phone"
          name="phone"
          placeholder="Enter Employee Phone"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Employee Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">Select Status</option> {/* Optional placeholder */}
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="salary">Employee Salary</label>
        <input
          id="salary"
          name="salary"
          placeholder="Enter Employee Salary"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="submit-btn">
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployeeForm;
