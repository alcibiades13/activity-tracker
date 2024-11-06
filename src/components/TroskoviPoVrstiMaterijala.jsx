import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const TroskoviPoVrstiMaterijala = ({ trosakId, onDobavljacClick }) => {
  const [vrstaMaterijala, setVrstaMaterijala] = useState([]);

  useEffect(() => {
    if (trosakId) {
      axios.get(`http://localhost:5000/troskovi_po_vrsti_materijala?troskovi_id=${trosakId}`)
        .then(response => setVrstaMaterijala(response.data))
        .catch(error => console.error('Error fetching vrsta materijala data:', error));
    }
  }, [trosakId]);

  return (
    <div className="col-6 materijali-container">
      <h3 className='table-title'>Detalji po vrsti materijala</h3>
      <table className="table cascading materijali-table">
        <thead>
          <tr>
            <th>Vrsta Materijala</th>
            <th className="td-right">Iznos</th>
          </tr>
        </thead>
        <tbody>
          {vrstaMaterijala.map((materijal) => (
            <tr key={materijal.id} onClick={() => onDobavljacClick(materijal.dobavljac_id)}>
              <td>{materijal.vrsta_materijala}</td>
              <td className="td-right">
                {materijal.iznos.toLocaleString('sr-RS', { style: 'currency', currency: 'RSD' })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TroskoviPoVrstiMaterijala.propTypes = {
  trosakId: PropTypes.number.isRequired,
  onDobavljacClick: PropTypes.func.isRequired,
};

export default TroskoviPoVrstiMaterijala;
