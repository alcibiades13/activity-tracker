import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const TroskoviPoDobavljacu = ({ trosakId, onDobavljacClick }) => {
  const [dobavljaci, setDobavljaci] = useState([]);
  const [selectedDobavljacId, setSelectedDobavljacId] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/troskovi_po_dobavljacu?troskovi_id=${trosakId}`)
      .then(response => setDobavljaci(response.data))
      .catch(error => console.error('Error fetching dobavljaci:', error));
    
    // Reset activeDobavljacId when trosakId changes
    setSelectedDobavljacId(null);
  }, [trosakId]);

  return (
    <div className="col-6 dobavljaci-container">
      <h3 className='table-title'>Detalji po dobavljaču</h3>
      <table className="table cascading dobavljaci-table">
        <thead>
          <tr>
            <th>Dobavljač</th>
            <th className="td-right">Iznos</th>
          </tr>
        </thead>
        <tbody>
          {dobavljaci.map((dobavljac) => (
            <tr
              key={dobavljac.id}
              onClick={() => {
                setSelectedDobavljacId(dobavljac.id); // Set the active row ID
                onDobavljacClick(dobavljac.id); // Call the parent's click handler
              }}
              className={selectedDobavljacId === dobavljac.id ? 'active-row' : ''}
            >
              <td>{dobavljac.dobavljac}</td>
              <td className="td-right">{dobavljac.iznos.toLocaleString('sr-RS', { style: 'currency', currency: 'RSD' })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TroskoviPoDobavljacu.propTypes = {
  trosakId: PropTypes.number.isRequired,
  onDobavljacClick: PropTypes.func.isRequired,
};

export default TroskoviPoDobavljacu;
