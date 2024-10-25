import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "./DropdownMenu";

const EmployeeRow = ({ employee, isChecked, onCheckboxChange, onDelete }) => {
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
      <td>{employee.id}</td>
      <td className="td-bold">{employee.name}</td>
      <td>{employee.role}</td>
      <td className="td-num td-right">{employee.salary}</td>
      <td className="td-center">
        {employee.status === "active" ? (
          <FontAwesomeIcon
            icon={faUserCheck}
            className="status-icon active-icon"
          />
        ) : (
          <FontAwesomeIcon
            icon={faUserTimes}
            className="status-icon inactive-icon"
          />
        )}
      </td>
      <td>{employee.phone}</td>
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

EmployeeRow.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EmployeeRow;
