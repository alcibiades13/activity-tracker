import { useState } from "react";

const AddRadniDnevnikForm = () => {

    const [formData, setFormData] = useState({
    datum: '',
    zaposleni: '',
    gradiliste: '',
    etaz: [
      {
        vrsta_radova: '',
        napomena: '',
        pozicija: [
          {
            pozicija: '',
            broj_radnih_sati: '',
          },
        ],
      },
    ],
  });

  // Handle input changes for all fields
  const handleInputChange = (e, field, etazIndex, pozicijaIndex, subField) => {
    const { value } = e.target;

    setFormData((prevData) => {
      if (field) {
        // Update top-level fields (datum, zaposleni, gradiliste)
        return { ...prevData, [field]: value };
      }

      const updatedEtaz = [...prevData.etaz];
      if (subField) {
        // Update subfields within pozicija (pozicija, broj_radnih_sati)
        updatedEtaz[etazIndex].pozicija[pozicijaIndex][subField] = value;
      } else if (etazIndex !== undefined) {
        // Update fields like vrsta_radova and napomena within etaz
        updatedEtaz[etazIndex][field] = value;
      }
      return { ...prevData, etaz: updatedEtaz };
    });
  };

  // Add a new Etaz (opens up fields for vrsta radova, napomena, pozicija, etc.)
  const addEtaz = () => {
    setFormData((prevData) => ({
      ...prevData,
      etaz: [
        ...prevData.etaz,
        {
          vrsta_radova: '',
          napomena: '',
          pozicija: [
            {
              pozicija: '',
              broj_radnih_sati: '',
            },
          ],
        },
      ],
    }));
  };

  // Add a new Vrsta Radova within an Etaz (opens fields vrsta radova, napomena and pozicija)
  const addVrstaRadova = (etazIndex) => {
    setFormData((prevData) => {
      const updatedEtaz = [...prevData.etaz];
      updatedEtaz[etazIndex].pozicija.push({
        pozicija: '',
        broj_radnih_sati: '',
      });
      updatedEtaz[etazIndex].vrsta_radova = ''; // Make sure to reset the vrsta_radova field
      updatedEtaz[etazIndex].napomena = ''; // Same for napomena

      return { ...prevData, etaz: updatedEtaz };
    });
  };

  // Add a new Pozicija within a Vrsta Radova (only adds pozicija and broj radnih sati)
  const addPozicija = (etazIndex) => {
    setFormData((prevData) => {
      const updatedEtaz = [...prevData.etaz];
      updatedEtaz[etazIndex].pozicija.push({
        pozicija: '',
        broj_radnih_sati: '',
      });
      return { ...prevData, etaz: updatedEtaz };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Radni Dnevnik Form</h2>

      {/* Top-level fields */}
      <label>Datum</label>
      <input
        type="date"
        value={formData.datum}
        onChange={(e) => handleInputChange(e, 'datum')}
      />

      <label>Zaposleni</label>
      <input
        type="text"
        value={formData.zaposleni}
        onChange={(e) => handleInputChange(e, 'zaposleni')}
      />

      <label>Gradilište</label>
      <input
        type="text"
        value={formData.gradiliste}
        onChange={(e) => handleInputChange(e, 'gradiliste')}
      />

      {/* Etaz sections */}
      {formData.etaz.map((etaz, etazIndex) => (
        <div key={etazIndex} className="etaz-section">
          <label>Vrsta Radova</label>
          <input
            type="text"
            value={etaz.vrsta_radova}
            onChange={(e) => handleInputChange(e, 'vrsta_radova', etazIndex)}
          />

          <label>Napomena</label>
          <input
            type="text"
            value={etaz.napomena}
            onChange={(e) => handleInputChange(e, 'napomena', etazIndex)}
          />

          {/* Pozicija fields under Vrsta Radova */}
          {etaz.pozicija.map((poz, pozicijaIndex) => (
            <div key={pozicijaIndex} className="pozicija-section">
              <label>Pozicija</label>
              <input
                type="text"
                value={poz.pozicija}
                onChange={(e) =>
                  handleInputChange(e, null, etazIndex, pozicijaIndex, 'pozicija')
                }
              />

              <label>Broj Radnih Sati</label>
              <input
                type="number"
                value={poz.broj_radnih_sati}
                onChange={(e) =>
                  handleInputChange(e, null, etazIndex, pozicijaIndex, 'broj_radnih_sati')
                }
              />
            </div>
          ))}

          {/* Buttons for adding more Vrsta Radova or Pozicija */}
          <button
            type="button"
            onClick={() => addVrstaRadova(etazIndex)}
          >
            Dodaj Vrstu Radova
          </button>
          <button
            type="button"
            onClick={() => addPozicija(etazIndex)}
          >
            Dodaj Pozicija
          </button>
        </div>
      ))}

      {/* Add Etaz button */}
      <button type="button" onClick={addEtaz}>Dodaj Etaz</button>

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddRadniDnevnikForm;
