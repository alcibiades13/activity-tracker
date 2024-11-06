import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const TroskoviPoDobavljacuDetaljno = ({ trosakId, dobavljacId }) => {
  const [detalji, setDetalji] = useState([]);

  useEffect(() => {
    if (dobavljacId) {
        axios.get(`http://localhost:5000/troskovi_po_dobavljacu_detaljno?troskovi_id=${trosakId}&dobavljac_id=${dobavljacId}`)
        .then(response => { 
            console.log('Response data:', response.data); // Log the response data
            setDetalji(response.data)})
        .catch(error => console.error('Error fetching detalji:', error));
        }
  }, [trosakId, dobavljacId]);

  return (
    <div className="col-12 detaljno-container">
      <h4 className='table-title'>Detaljno po vrsti materijala</h4>
      <table className="table detaljno-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Dobavljac</th>
            <th>Vrsta materijala</th>
            <th>Broj narudzbine</th>
            <th>Kolicina</th>
            <th>Jedinicna cena</th>
            <th>Iznos</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
        {detalji.map((item) => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.dobavljac}</td>
                <td>{item.vrsta_materijala}</td>
                <td>{item.broj_narudzbine}</td>
                <td>{item.kolicina}</td>
                <td>{item.jedinicna_cena}</td>
                <td>
                    {item.iznos != null
                    ? item.iznos.toLocaleString('sr-RS', { style: 'currency', currency: 'RSD' })
                    : 'N/A'} {/* Display 'N/A' if iznos is undefined or null */}
                </td>
                <td>{item.datum_kupovine}</td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

TroskoviPoDobavljacuDetaljno.propTypes = {
  trosakId: PropTypes.number.isRequired,
  dobavljacId: PropTypes.number.isRequired,
};

export default TroskoviPoDobavljacuDetaljno;
