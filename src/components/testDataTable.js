import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from '@fortawesome/free-solid-svg-icons';
import CustomizeColumnsModal from "../components/CustomizeColumnsModal";
import PropTypes from "prop-types";
import DataRow from "./DataRow";



const DataTable = ({ tableName }) => {
  const [tableData, setTableData] = useState([]);
  const [selectedTableRows, setSelectedTableRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
    // const [searchField, setSearchField] = useState("name"); // Default to name (search filter)
  const validFields = Object.keys(tableData[0] || {}).filter((field) => field !== "id");
  const [searchField, setSearchField] = useState(validFields[0] || ""); // Set to the first valid field

  // const [searchField, setSearchField] = useState(Object.keys(tableData[0] || {})[0] || ""); // Default to first field
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [allColumns, setAllColumns] = useState([]);
  const [columnOrder, setColumnOrder] = useState([]);
  const [initialVisibleColumns, setInitialVisibleColumns] = useState([]); // save for when cancel is clicked
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility


 useEffect(() => {
    // Fetching data
    axios
      .get(http://localhost:5000/${tableName})
      .then((response) => {
        // Set the table data
        setTableData(response.data);
        console.log("Response data:", response.data); // Log the entire response data
        
        // Process columns only after data has been set
        if (response.data.length > 0) {
          const mainColumns = Object.keys(response.data[0]);

          const nestedColumns = mainColumns.flatMap((column) => {
            if (Array.isArray(response.data[0][column])) {
              return response.data[0][column].length > 0
                ? Object.keys(response.data[0][column][0]).map((nestedField) => ${column}.${nestedField})
                : [];
            }
            return column;
          });
          const dataColumns = Object.keys(response.data[0]);

          // Update states after processing
          setAllColumns(nestedColumns);
          setVisibleColumns(dataColumns); 
          setInitialVisibleColumns(dataColumns);
          setColumnOrder(dataColumns);
          console.log('columnOrder:', dataColumns); // Log the column order for debugging
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [tableName]); // Dependency on tableName

  useEffect(() => {
    if (tableData.length > 0 && !searchField) {
      // Find the first field that is not "id" and is of a searchable type (string or number)
      const searchableFields = Object.keys(tableData[0]).filter(
        (field) => field !== "id" && (typeof tableData[0][field] === "string" || typeof tableData[0][field] === "number")
      );
      if (searchableFields.length > 0) {
        setSearchField(searchableFields[0]); // Set to the first searchable field
      }
    }
  }, [tableData, searchField]);

  console.log("Table Data:", tableData);

  const searchInObject = (obj, query) => {
    // If the object is an array, check each item
    if (Array.isArray(obj)) {
      return obj.some(item => searchInObject(item, query));
    }

    // If it's an object, iterate through its values
    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(value => searchInObject(value, query));
    }

    // Handle numeric and string comparisons
    if (typeof obj === 'number') {
      return String(obj).includes(query);
    }
    
    // Fallback to string comparison
    return typeof obj === 'string' && obj.toLowerCase().includes(query.toLowerCase());
  };

  const filteredTableRows = tableData.filter((dataRow) => {
    if (!searchQuery || !searchField) return true; // Show all rows if searchQuery or searchField is empty

    const fieldValue = dataRow[searchField];

    // Use the generic search function for fieldValue
    return searchInObject(fieldValue, searchQuery);
  });


  console.log('filteredTableRows ' + filteredTableRows);


  // Handle employee selection (checkbox)
  const handleCheckboxChange = (tableRowId) => {
    setSelectedTableRows((prevSelected) =>
      prevSelected.includes(tableRowId)
        ? prevSelected.filter((id) => id !== tableRowId) // Uncheck
        : [...prevSelected, tableRowId] // Check
    );
  };

  // Select all employees
  const handleSelectAll = () => {
    const allTableRowsIds = tableData.map((employee) => employee.id);
    setSelectedTableRows((prevSelected) =>
      prevSelected.length === tableData.length ? [] : allTableRowsIds
    );
  };

  const handleDeleteDataRow = async (tableRowId) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
      if (confirmDelete) {
          try {
              await axios.delete(http://localhost:5000/${tableName}/${tableRowId}); // Adjust the endpoint accordingly
              setTableData((prevTableData) => prevTableData.filter(dat => dat.id !== tableRowId));
              console.log(Employee ${tableRowId} deleted successfully.);
          } catch (error) {
              console.error("Error deleting employee:", error);
          }
      }
  };

  // Bulk delete selected employees
  const handleBulkDelete = () => {
    const confirmDelete = window.confirm(
      Are you sure you want to delete ${selectedTableRows.length} employees?
    );
    if (confirmDelete) {
      selectedTableRows.forEach((tableRowId) => {
        axios
          .delete(http://localhost:5000/${tableName}/${tableRowId})
          .then(() => {
            setTableData((prevTableData) =>
              prevTableData.filter((tableRow) => tableRow.id !== tableRowId)
            );
          })
          .catch((error) => {
            console.error("Error deleting table row:", error);
          });
      });
      setSelectedTableRows([]); // Clear the selection after deletion
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // customize table modal toggle
  const handleToggleModal = () => {
    setInitialVisibleColumns(visibleColumns);
    setModalOpen((prev) => !prev); // Toggle modal state
  };

  // Save changes and close modal
  const handleSaveChanges = () => {
    setModalOpen(false); // Close the modal after saving changes
  };

  // Cancel changes and revert to initial state
  const handleCancelChanges = () => {
    setVisibleColumns(initialVisibleColumns); // Revert to original columns
    setModalOpen(false); // Close the modal
  };

  // to add classes to specific columns
  const getColumnClass = (column) => {
    switch (column) {
      case 'name':
        return 'td-bold';
      case 'status':
        return 'td-center';
      case 'salary':
        return 'td-right';
      default:
        return ''; // No special class for other columns
    }
  };


  console.log(visibleColumns);
    console.log(typeof(visibleColumns));

  return (
    <div className="page-wrapper">

      {modalOpen && (
        <CustomizeColumnsModal
          allColumns={columnOrder}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          onClose={handleCancelChanges}
          onSave={handleSaveChanges}
        />
      )}

      <div className="table-actions">
        <div className="actions-left">

          <div className="search-container">
            <select onChange={(e) => setSearchField(e.target.value)} className="filter-select">
              {tableData.length > 0 && (
                <>
                  {Object.keys(tableData[0]).map((field, index) => {
                    // Exclude the 'id' field and any other unwanted fields
                    if (field === 'id') return null; 
                    if (typeof tableData[0][field] === "object") {
                      // You can add logic here if you want to show nested properties or specific object fields
                    }
                    return (
                      <option key={index} value={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </option>
                    );
                  })}
                </>
              )}
            </select>


            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder={Search by ${searchField || "select a field"}} // Display dynamic placeholder
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
            disabled={selectedTableRows.length === 0}
            className="btn btn-delete-selected"
          >
            Delete Selected ({selectedTableRows.length})
          </button>

          <Link to="/add-employee">
            <button className="btn btn-add">+ Add New {tableName}</button>
          </Link>
          <button onClick={handleToggleModal} className="btn btn-customize"><FontAwesomeIcon icon={faSliders} /></button>
        </div>
      </div>

      <table className={table ${tableName}}>
        <thead>
            <tr>
            <th>
                <input
                type="checkbox"
                checked={selectedTableRows.length === tableData.length && tableData.length > 0}
                onChange={handleSelectAll}
                />
            </th>
            {columnOrder
              .filter((column) => {
                console.log("Checking column:", column); // Log each column for debugging
                return typeof column === 'string' && visibleColumns.includes(column);
              })
              .map((column) => (
                <th key={column} className={getColumnClass(column)}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </th>
              ))
            }
            <th className="td-center">Actions</th>
            </tr>
        </thead>
        <tbody>
          {filteredTableRows.map((tableRow) => (
            <DataRow
              key={tableRow.id}
              tableRow={tableRow}
              tableName={tableName}
              isChecked={selectedTableRows.includes(tableRow.id)}
              onCheckboxChange={() => handleCheckboxChange(tableRow.id)}
              // onDelete={() => handleDeleteEmployee}
              onDelete={handleDeleteDataRow}
              visibleColumns={visibleColumns} 
              columnOrder={columnOrder} 
              getColumnClass={getColumnClass}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Define prop types for DataTable
DataTable.propTypes = {
  tableName: PropTypes.string.isRequired, // Expecting a string table name
  columns: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of column names
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any)
  ).isRequired, // Array of objects, where each object is a row of data
  columnOrder: PropTypes.arrayOf(PropTypes.string), // Array of ordered column names
  visibleColumns: PropTypes.arrayOf(PropTypes.string), // Array of columns that are visible
  passedVisibleColumns: PropTypes.arrayOf(PropTypes.string), // Array of columns that are visible and can be changed here
  allColumns: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of all column names
  onSelectAll: PropTypes.func.isRequired, // Function to select all rows
  onRowSelect: PropTypes.func.isRequired, // Function to select a single row
  getColumnClass: PropTypes.func // Function to get class names for columns
};

// Define default props for optional values (if needed)
DataTable.defaultProps = {
  columnOrder: [],
  visibleColumns: [],
  getColumnClass: () => '' // Default to an empty string function if not provided
};

export default DataTable;