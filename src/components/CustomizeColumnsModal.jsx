import PropTypes from 'prop-types'; // Import PropTypes


const CustomizeColumnsModal = ({ allColumns, visibleColumns, setVisibleColumns, onClose, onSave }) => {
  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  // const handleCancel = () => {
  //   onClose(); // Call onClose to toggle modal visibility
  // };
  
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
      <div className="modal-footer">
        <button onClick={onClose} className="btn btn-transparent">Cancel</button>
        <button onClick={onSave} className="btn">Save and Close</button>
      </div>
    </div>
  );
};

// Add PropTypes validation
CustomizeColumnsModal.propTypes = {
  allColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  setVisibleColumns: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default CustomizeColumnsModal;
