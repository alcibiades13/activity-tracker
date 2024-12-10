import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Search = ({ tableData, searchField, setSearchField, searchQuery, handleSearchChange }) => {
  return (
    <div className="search-container">
      <select
        onChange={(e) => setSearchField(e.target.value)}
        className="filter-select"
      >
        {tableData.length > 0 && (
          <>
            {Object.keys(tableData[0]).map((field, index) => {
              if (field === 'id') return null; // Skip 'id'
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
          placeholder={`Search by ${searchField || 'select a field'}`}
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
    </div>
  );
};

Search.propTypes = {
  tableData: PropTypes.array.isRequired,
  searchField: PropTypes.string.isRequired,
  setSearchField: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};

export default Search;
