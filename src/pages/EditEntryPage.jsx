import PropTypes from "prop-types"; // Import PropTypes
import EditEntryForm from "../components/EditEntryForm";

const EditEntryPage = ({ type, fields, endpoint, id }) => {
  return (
    <div className="form-wrapper">
      <h1 className="title">Edit {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
      <EditEntryForm type={type} fields={fields} endpoint={endpoint} id={id} />
    </div>
  );
};

// PropTypes validation for the component
EditEntryPage.propTypes = {
  type: PropTypes.string.isRequired,      // The type (e.g., "employees", "projects")
  id: PropTypes.string.isRequired,      // The id (e.g., "E8")
  fields: PropTypes.array.isRequired,    // The fields (e.g., the schema for the form)
  endpoint: PropTypes.string.isRequired, // The API endpoint (e.g., "employees", "projects")
};

export default EditEntryPage;
