import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "./DropdownMenu";

const EmployeeRow = ({ employee, isChecked, onCheckboxChange, onDelete, visibleColumns, columnOrder }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Control the dropdown here

  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle the dropdown state
  };

  return (
    <tr className={`table-row employee ${isChecked ? "selected-row" : ""}`}>
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onCheckboxChange}
        />
      </td>
    {columnOrder.map((column) => {
    if (column === 'id' && visibleColumns.includes(column)) return <td key="id">{employee.id}</td>;
    if (column === 'name' && visibleColumns.includes(column)) return <td key="name" className="td-bold">{employee.name}</td>;
    if (column === 'role' && visibleColumns.includes(column)) return <td key="role">{employee.role}</td>;
    if (column === 'email' && visibleColumns.includes(column)) return <td key="email">{employee.email}</td>;
    if (column === 'phone' && visibleColumns.includes(column)) return <td key="phone">{employee.phone}</td>;
    if (column === 'status' && visibleColumns.includes(column)) return (
      <td key="status" className="td-center">
        {employee.status === "active" ? (
          <FontAwesomeIcon icon={faUserCheck} className="status-icon active-icon" />
        ) : (
          <FontAwesomeIcon icon={faUserTimes} className="status-icon inactive-icon" />
        )}
      </td>
    );
    if (column === 'salary' && visibleColumns.includes(column)) return <td key="salary" className="td-num td-right">{employee.salary}</td>;
    return null; // Ensures other columns are ignored
  })}
      <td data-label="Operations" className="td-center">
        {/* Pass the dropdown state and toggle function */}
        <DropdownMenu
            employeeId={employee.id}
            // onDelete={() => onDelete(employee.id)}
            onDelete={onDelete}
            isOpen={dropdownOpen}
            handleToggleDropdown={handleToggleDropdown}
        />
      </td>
    </tr>
  );
};

// Add PropTypes validation
EmployeeRow.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired, // Validate visibleColumns
  columnOrder: PropTypes.arrayOf(PropTypes.string).isRequired, 
};

export default EmployeeRow;
