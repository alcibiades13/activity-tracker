import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    status: "",
    salary: ""
  });
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/employees/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/employees/${id}`, formData);
      navigate("/employees"); // Redirect to employee list after editing
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form edit-employee-form">
      <div className="form-group">
        <label htmlFor="name">Employee Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          placeholder="Enter Employee Name"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Employee Role</label>
        <input
          id="role"
          name="role"
          value={formData.role}
          placeholder="Enter Employee Role"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Employee Email</label>
        <input
          id="email"
          name="email"
          value={formData.email}
          placeholder="Enter Employee Email"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Employee Phone</label>
        <input
          id="phone"
          name="phone"
          value={formData.phone}
          placeholder="Enter Employee Phone"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Employee Status</label>
        <input
          id="status"
          name="status"
          value={formData.status}
          placeholder="Enter Employee Status"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="salary">Employee Salary</label>
        <input
          id="salary"
          name="salary"
          value={formData.salary}
          placeholder="Enter Employee Salary"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-btn">
        Update Employee
      </button>
    </form>
  );
};

export default EditEmployeeForm;
