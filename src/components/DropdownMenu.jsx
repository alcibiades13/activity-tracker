import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan as faTrashCanRegular, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";

const DropdownMenu = ({ employeeId, onDelete, isOpen, handleToggleDropdown }) => {
  const dropdownRef = useRef(null);

    const handleDelete = () => {
        onDelete(employeeId); // Pass the employeeId to onDelete
    };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      handleToggleDropdown(); // Close the dropdown when clicking outside
    }
  };


  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <button onClick={handleToggleDropdown} className="dropdown-btn">
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <Link to={`/edit-employee/${employeeId}`} className="dropdown-item">
            <FontAwesomeIcon icon={faPenToSquare} className="fa-icon" /> Edit
          </Link>
          <button onClick={handleDelete} className="dropdown-item">
            <FontAwesomeIcon icon={faTrashCanRegular} className="fa-icon" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  employeeId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired, // Add isOpen as required prop
  handleToggleDropdown: PropTypes.func.isRequired,
};

export default DropdownMenu;
