import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeRow from "../components/EmployeeRow";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("name"); // Default to name (search filter)


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

  // searching only by name
  // const filteredEmployees = employees.filter((employee) =>
  //   employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // searching for any field
  // const filteredEmployees = employees.filter((employee) =>
  //   Object.values(employee).some(value =>
  //     String(value).toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // );

  // search based on dropdown choice
  const filteredEmployees = employees.filter((employee) =>
    employee[searchField]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="page-wrapper">
      <div className="table-actions">
        <div className="actions-left">

        {/* use when search has no dropdown filter */}
        {/* <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        /> */}

          <div className="search-container">
            <select onChange={(e) => setSearchField(e.target.value)} className="filter-select">
              {employees.length > 0 && (
                <>
                  {Object.keys(employees[0]).includes('name') ? (
                    <option value="name">Name</option>
                  ) : (
                    <option value={Object.keys(employees[0])[1]}> {/* If 'name' is not present, use the second field */}
                      {Object.keys(employees[0])[1].charAt(0).toUpperCase() + Object.keys(employees[0])[1].slice(1)}
                    </option>
                  )}
                  {Object.keys(employees[0])
                    .filter((field) => field !== 'id' && field !== 'name') // Exclude 'id' and 'name'
                    .map((field, index) => (
                      <option key={index} value={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </option>
                    ))}
                </>
              )}
            </select>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder={`Search by ${searchField}`}
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
          </div>
        </div>

        <div className="actions-right">
          <button
            onClick={handleBulkDelete}
            disabled={selectedEmployees.length === 0}
            className="btn btn-delete-selected"
          >
            Delete Selected ({selectedEmployees.length})
          </button>

          <Link to="/add-employee">
            <button className="btn btn-add">+ Add New Employee</button>
          </Link>
        </div>
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
            <th className="td-right">Salary</th>
            <th className="td-center">Status</th>
            <th>Phone</th>
            <th className="td-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
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
    </div>
  );
};

export default Employees;
