import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Filters from './Filters';
import { getFormFieldsForType } from "../lib/dataUtils";
import { handleBulkDelete } from '../lib/tableActions';

const TableControls = ({
  tableData,
  searchField,
  setSearchField,
  searchQuery,
  setTableData,
  handleSearchChange,
  selectedTableRows,
  setSelectedTableRows,
  tableName,
  filters,
  setFilters,
  handleToggleModal,
}) => {
  const addNewLink = `/add-${tableName}`;

  // const [filters, setFilters] = useState({});
  const schema = getFormFieldsForType(tableName);
  console.log('Schema:', schema);

  return (
    <div className="table-actions">
      <div className="actions-left">
        {/* Filters Component */}
        <Filters
          tableData={tableData}
          searchField={searchField}
          setSearchField={setSearchField}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          schema={schema}
          filters={filters}
          setFilters={setFilters}
          tableName={tableName}
        />
      </div>

      <div className="actions-right">
        <button
          onClick={() =>
            handleBulkDelete(selectedTableRows, tableName, setTableData, setSelectedTableRows)
          }
          disabled={selectedTableRows.length === 0}
          className="btn btn-delete-selected"
        >
          Delete Selected ({selectedTableRows.length})
        </button>

        <Link to={addNewLink}>
          <button className="btn btn-add">+ Add New {tableName}</button>
        </Link>
        <button onClick={handleToggleModal} className="btn btn-customize">
          <FontAwesomeIcon icon={faSliders} />
        </button>
      </div>
    </div>
  );
};

TableControls.propTypes = {
  tableData: PropTypes.array.isRequired,
  searchField: PropTypes.string.isRequired,
  setSearchField: PropTypes.func.isRequired,
  filters: PropTypes.string.isRequired,
  setFilters: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  setTableData: PropTypes.func.isRequired,
  setSelectedTableRows: PropTypes.func.isRequired,
  selectedTableRows: PropTypes.array.isRequired,
  tableName: PropTypes.string.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
};

export default TableControls;
