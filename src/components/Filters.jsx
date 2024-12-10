import PropTypes from 'prop-types';
import Search from './Search';

const Filters = ({
  tableData,
  searchField,
  setSearchField,
  searchQuery,
  handleSearchChange,
  schema,
  filters,
  setFilters
}) => {
    const renderDynamicFilters = () => {
        return schema.map((field) => {
            if (field.fieldType === "select" && Array.isArray(field.options)) {
                return (
                    <div key={field.name} className="filter-group">
                        <select
                            id={field.name}
                            value={filters[field.name] || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                setFilters((prevFilters) => ({
                                    ...prevFilters,
                                    [field.name]: value,
                                }));
                            }}
                        >
                            <option value="">{field.placeholder}</option>
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            }

            if (field.fieldType === "date") {
                return (
                    <div key={field.name} className="filter-group">
                        <input
                            type="date"
                            id={field.name}
                            value={filters[field.name] || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                setFilters((prevFilters) => ({
                                    ...prevFilters,
                                    [field.name]: value,
                                }));
                            }}
                            placeholder={field.placeholder}
                        />
                    </div>
                );
            }

            return null;
        });
    };




  return (
    <div className="filters">
      {/* Search Component */}
      <Search
        tableData={tableData}
        searchField={searchField}
        setSearchField={setSearchField}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      {/* Dynamic Filters */}
      {renderDynamicFilters()}
    </div>
  );
};

Filters.propTypes = {
  tableData: PropTypes.array.isRequired,
  searchField: PropTypes.string.isRequired,
  setSearchField: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  schema: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default Filters;
