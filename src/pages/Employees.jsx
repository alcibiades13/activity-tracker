import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeRow from "../components/EmployeeRow";
import { Link } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle employee selection (checkbox)
  const handleCheckboxChange = (employeeId) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employeeId)
        ? prevSelected.filter((id) => id !== employeeId) // Uncheck
        : [...prevSelected, employeeId] // Check
    );
  };

  // Select all employees
  const handleSelectAll = () => {
    const allEmployeeIds = employees.map((employee) => employee.id);
    setSelectedEmployees((prevSelected) =>
      prevSelected.length === employees.length ? [] : allEmployeeIds
    );
  };

  const handleDeleteEmployee = async (employeeId) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
      if (confirmDelete) {
          try {
              await axios.delete(`http://localhost:5000/employees/${employeeId}`); // Adjust the endpoint accordingly
              setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.id !== employeeId));
              console.log(`Employee ${employeeId} deleted successfully.`);
          } catch (error) {
              console.error("Error deleting employee:", error);
          }
      }
  };

  // Bulk delete selected employees
  const handleBulkDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedEmployees.length} employees?`
    );
    if (confirmDelete) {
      selectedEmployees.forEach((employeeId) => {
        axios
          .delete(`http://localhost:5000/employees/${employeeId}`)
          .then(() => {
            setEmployees((prevEmployees) =>
              prevEmployees.filter((employee) => employee.id !== employeeId)
            );
          })
          .catch((error) => {
            console.error("Error deleting employee:", error);
          });
      });
      setSelectedEmployees([]); // Clear the selection after deletion
    }
  };

  return (
    <div className="page-wrapper">
      <div className="bulk-actions">
        <button onClick={handleBulkDelete} disabled={selectedEmployees.length === 0}>
          Delete Selected ({selectedEmployees.length})
        </button>
      </div>
      <table className="table employees">
        <thead className="employee table-head">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedEmployees.length === employees.length && employees.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <EmployeeRow
              key={employee.id}
              employee={employee}
              isChecked={selectedEmployees.includes(employee.id)}
              onCheckboxChange={() => handleCheckboxChange(employee.id)}
              // onDelete={() => handleDeleteEmployee}
              onDelete={handleDeleteEmployee}
            />
          ))}
        </tbody>
      </table>

    <Link to="/add-employee">
      <button className="btn btn-add">+ Add New Employee</button>
    </Link>
    </div>
  );
};

export default Employees;
