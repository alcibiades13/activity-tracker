import axios from "axios";

export const handleDeleteRow = async (rowId, tableName, setTableData) => {
  if (window.confirm("Are you sure you want to delete this row?")) {
    try {
      await axios.delete(`http://localhost:5000/${tableName}/${rowId}`);
      setTableData((prev) => prev.filter((row) => row.id !== rowId));
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  }
};

/**
 * Handles bulk deletion of rows in a table.
 * 
 * @param {Array} selectedRows - IDs of the rows to be deleted.
 * @param {string} tableName - Name of the table.
 * @param {Function} setTableData - Function to update the table data in state.
 * @param {Function} setSelectedRows - Function to reset selected rows.
 * @param {string} [confirmationMessage] - Optional custom confirmation message.
 * @returns {Promise<void>} Resolves when all deletions are complete.
 */
export const handleBulkDelete = async (
  selectedRows,
  tableName,
  setTableData,
  setSelectedRows
) => {
  if (
    window.confirm(
      `Are you sure you want to delete ${selectedRows.length} rows?`
    )
  ) {
    try {
      await Promise.all(
        selectedRows.map((rowId) =>
          axios.delete(`http://localhost:5000/${tableName}/${rowId}`)
        )
      );
      setTableData((prev) => prev.filter((row) => !selectedRows.includes(row.id)));
      setSelectedRows([]); // Clear selected rows after deletion
    } catch (error) {
      console.error("Error deleting rows:", error);
    }
  }
};
