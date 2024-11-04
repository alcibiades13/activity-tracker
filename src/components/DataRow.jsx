import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "./DropdownMenu";

const DataRow = ({
  tableRow,
  tableName,
  isChecked,
  onCheckboxChange,
  onDelete,
  visibleColumns,
  columnOrder,
  getColumnClass
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Control the dropdown here

  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle the dropdown state
  };

  // Helper function to render array items based on table name and column structure
  const renderArrayField = (tableName, arrayItem) => {
    switch (tableName) {
      case "projects":
        return (
          <div key={arrayItem.id}>
            {arrayItem.description} - {arrayItem.status} - {arrayItem.assignedTo} - Due: {arrayItem.dueDate}
          </div>
        );
      case "employees":
        return (
          <div key={arrayItem.id}>
            {arrayItem.taskName} - {arrayItem.priority}
          </div>
        );
      case "financials":
        return (
          <div key={arrayItem.id}>
            <strong>{arrayItem.month}:</strong> Revenue: ${arrayItem.revenue}, Expenses: ${arrayItem.expenses}
            <br />
            {arrayItem.biggestExpense && (
              <div>
                <em>Biggest Expense:</em> {arrayItem.biggestExpense.category} - ${arrayItem.biggestExpense.amount}
              </div>
            )}
          </div>
        );
      case "activities":
        return (
          <div key={arrayItem.id}>
            <strong>{arrayItem.activityType}:</strong> {arrayItem.description}
            <br />
            Date: {arrayItem.date}, Duration: {arrayItem.durationHours} hours
          </div>
        );
      default:
        return <div key={arrayItem.id}>{JSON.stringify(arrayItem)}</div>;
    }
  };


  return (
    <tr className={`table-row ${isChecked ? "selected-row" : ""}`}>
      <td>
        <input type="checkbox" checked={isChecked} onChange={onCheckboxChange} />
      </td>
      {columnOrder.map((column) => {
        if (!visibleColumns.includes(column) || !(column in tableRow)) {
          return null; // Skip rendering if column is not visible or does not exist
        }

        // Handle case where the cell contains an array
        if (Array.isArray(tableRow[column])) {
          return (
            <td key={column} className={getColumnClass(column)}>
              {tableRow[column].length} items
              <div className="tooltip">
                {tableRow[column].map((item, index) => (
                  <div key={index}>{renderArrayField(tableName, item)}</div>
                ))}
              </div>
            </td>
          );
        }

        // Handle case for objects (if applicable)
        if (typeof tableRow[column] === 'object' && tableRow[column] !== null) {
          return (
            <td key={column} className={getColumnClass(column)}>
              {JSON.stringify(tableRow[column])} {/* Or another method to render objects */}
            </td>
          );
        }

        if (column === "status") {
          return (
            <td key={column} className={getColumnClass(column)}>
              {tableRow.status === "active" ? (
                <FontAwesomeIcon icon={faUserCheck} className="status-icon active-icon" />
              ) : (
                <FontAwesomeIcon icon={faUserTimes} className="status-icon inactive-icon" />
              )}
            </td>
          );
        }

        return (
          <td key={column} className={getColumnClass(column)}>
            {tableRow[column]}
          </td>
        );
      })}

      <td data-label="Operations" className="td-center">
        <DropdownMenu
          tableRowId={tableRow.id}
          onDelete={onDelete}
          isOpen={dropdownOpen}
          handleToggleDropdown={handleToggleDropdown}
        />
      </td>
    </tr>
  );
};

// Adjusted PropTypes validation
DataRow.propTypes = {
  tableRow: PropTypes.object.isRequired, // Allow flexibility for any object structure
  tableName: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  columnOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  getColumnClass: PropTypes.func.isRequired,
};

export default DataRow;
