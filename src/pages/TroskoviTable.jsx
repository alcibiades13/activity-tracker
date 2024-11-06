import { useState, useEffect } from 'react';
import TroskoviPoDobavljacu from '../components/TroskoviPoDobavljacu';
import TroskoviPoVrstiMaterijala from '../components/TroskoviPoVrstiMaterijala';
import TroskoviPoDobavljacuDetaljno from '../components/TroskoviPoDobavljacuDetaljno';
import axios from 'axios';

const TroskoviTable = () => {
  const [troskovi, setTroskovi] = useState([]);
  const [selectedTrosakId, setSelectedTrosakId] = useState(null);
  const [selectedDobavljacId, setSelectedDobavljacId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/troskovi')
      .then(response => setTroskovi(response.data))
      .catch(error => console.error('Error fetching troskovi:', error));
  }, []);

  const handleRowClick = (id) => {
    setSelectedTrosakId(id);
    setSelectedDobavljacId(null); // Reset dobavljac details when trosak changes
  };

  const handleDobavljacClick = (dobavljacId) => {
    setSelectedDobavljacId(dobavljacId);
  };

  return (
    <div className="grid-container troskovi-container">
      <div className="col-3">
        <h3 className='table-title'>Analiza troškova</h3>
        <table className="table cascading troskovi-table">
          <thead>
            <tr>
              <th>Kategorija</th>
              <th>Iznos</th>
            </tr>
          </thead>
          <tbody>
            {troskovi.map((trosak) => (
              <tr key={trosak.id} onClick={() => handleRowClick(trosak.id)}>
                <td>{trosak.kategorija}</td>
                <td>{trosak.iznos.toLocaleString('sr-RS', { style: 'currency', currency: 'RSD' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-9">
        {selectedTrosakId && (
          <div className="row">
            <TroskoviPoDobavljacu trosakId={selectedTrosakId} onDobavljacClick={handleDobavljacClick} />
            <TroskoviPoVrstiMaterijala trosakId={selectedTrosakId} onDobavljacClick={handleDobavljacClick} />
          </div>
        )}
        {selectedDobavljacId && (
          <TroskoviPoDobavljacuDetaljno trosakId={selectedTrosakId} dobavljacId={selectedDobavljacId} />
        )}
      </div>
    </div>
  );
};

export default TroskoviTable;
