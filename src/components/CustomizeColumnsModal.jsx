import PropTypes from 'prop-types'; // Import PropTypes


const CustomizeColumnsModal = ({ allColumns, visibleColumns, setVisibleColumns, onClose }) => {
  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Customize Table View</h2>
      </div>
      <div className="modal-columns">
        {allColumns.map((column) => (
          <div key={column} className='modal-item'>
            <label>
              <input
                type="checkbox"
                checked={visibleColumns.includes(column)}
                onChange={() => handleColumnToggle(column)}
              />
              {column.charAt(0).toUpperCase() + column.slice(1)}
            </label>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="btn">Save and Close</button>
    </div>
  );
};

// Add PropTypes validation
CustomizeColumnsModal.propTypes = {
  allColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  setVisibleColumns: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomizeColumnsModal;
