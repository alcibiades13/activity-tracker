import { useState, useEffect } from "react";
import axios from "axios";
import CustomizeColumnsModal from "../components/CustomizeColumnsModal";
import PropTypes from "prop-types";
import DataRow from "./DataRow";
import TableControls from "./TableControls";
import { extractColumns } from "../lib/columnUtils";
import { searchInObject } from "../lib/filterUtils";
import { capitalizeString } from "../lib/generalUtils";
import { getColumnClass } from '../lib/columnUtils';



const DataTable = ({ tableName, recordName }) => {
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

  const [filters, setFilters] = useState({}); // Define filters state here


 useEffect(() => {
    // Fetching data
    axios
      .get(`http://localhost:5000/${tableName}`)
      .then((response) => {
        // Set the table data
        setTableData(response.data);
        console.log("Response data:", response.data); // Log the entire response data
        
        // Process columns only after data has been set
        if (response.data.length > 0) {
          const nestedColumns = extractColumns(response.data);
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

  // const filteredTableRows = tableData.filter((dataRow) => {
  //   if (!searchQuery || !searchField) return true; 

  //   const fieldValue = dataRow[searchField];

  //   return searchInObject(fieldValue, searchQuery);
  // });

  const filteredTableRows = tableData.filter((dataRow) => {
    // Search Filter
    const matchesSearch =
      !searchQuery ||
      (dataRow[searchField]?.toString().toLowerCase() || "").includes(searchQuery.toLowerCase());

    // Dynamic Filters
    const matchesFilters = Object.entries(filters).every(([filterKey, filterValue]) => {
      if (!filterValue) return true; // Skip empty filters

      // Handle nested filtering explicitly for tasks
      if (filterKey === "tasks" && Array.isArray(dataRow.tasks)) {
        // Check if any task matches the filter
        return dataRow.tasks.some((task) =>
          Object.entries(task).some(([key, value]) =>
            key === "status" // Match nested task status
              ? value?.toString().toLowerCase().includes(filterValue.toLowerCase())
              : false
          )
        );
      }

      // Top-level filtering
      return (
        dataRow[filterKey]?.toString().toLowerCase() === filterValue.toLowerCase() ||
        (Array.isArray(dataRow[filterKey]) &&
          dataRow[filterKey].some((item) =>
            item?.toString().toLowerCase().includes(filterValue.toLowerCase())
          ))
      );
    });

    return matchesSearch && matchesFilters;
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
              await axios.delete(`http://localhost:5000/${tableName}/${tableRowId}`); // Adjust the endpoint accordingly
              setTableData((prevTableData) => prevTableData.filter(dat => dat.id !== tableRowId));
              console.log(`Employee ${tableRowId} deleted successfully.`);
          } catch (error) {
              console.error("Error deleting employee:", error);
          }
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

      <TableControls
        tableData={tableData}
        searchField={searchField}
        setSearchField={setSearchField}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        setTableData={setTableData}
        selectedTableRows={selectedTableRows}
        setSelectedTableRows={setSelectedTableRows}
        tableName={tableName}
        recordName={recordName}
        handleToggleModal={handleToggleModal}
        tableType={tableName}
        filters={filters}
        setFilters={setFilters}
      />

      <table className={`table ${tableName}`}>
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
                {capitalizeString(column)}
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
              recordName={recordName}
              tableName={tableName}
              isChecked={selectedTableRows.includes(tableRow.id)}
              onCheckboxChange={() => handleCheckboxChange(tableRow.id)}
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
  recordName: PropTypes.string.isRequired, // Expecting a string record name
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
