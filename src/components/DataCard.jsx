import PropTypes from "prop-types";
import { useState } from "react";

// DataCard component to render the fields
const DataCard = ({ dataItem }) => {
  // Recursive function to render fields (arrays, objects, and primitives)
  const renderFields = (data) => {
    if (Array.isArray(data)) {
      return (
        <div className="data-array">
          {data.map((item, index) => (
            <div key={index} className="data-array-item">
              {renderFields(item)} {/* Recursively render array elements */}
            </div>
          ))}
        </div>
      );
    } else if (typeof data === "object" && data !== null) {
      return (
        <div className="data-object">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              {isSimpleField(value) ? (
                <div className="data-field">
                  <strong>{key}:</strong> {renderFields(value)} {/* Direct render for simple fields */}
                </div>
              ) : (
                <CollapsibleField label={key}>
                  {renderFields(value)} {/* Collapsible for nested fields */}
                </CollapsibleField>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      return <span>{data}</span>; // Render primitive data (strings, numbers, etc.)
    }
  };

  // Function to check if the field is a simple field (primitive)
  const isSimpleField = (value) => {
    return !(Array.isArray(value) || typeof value === "object");
  };

  // Collapsible field component (for collapsing subfields)
  const CollapsibleField = ({ label, children }) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => setCollapsed(!collapsed);

    return (
      <div className="data-field-collapsible">
        <div className="data-field-header" onClick={toggleCollapse}>
          <strong>{label}</strong> {collapsed ? "▼" : "▲"}
        </div>
        {!collapsed && <div className="data-field-body">{children}</div>}
      </div>
    );
  };

  return (
    <div className="data-card">
      <h3>Data Entry</h3>
      <div className="data-card-content">
        {renderFields(dataItem)} {/* Render the recursive fields here */}
      </div>
    </div>
  );
};

DataCard.propTypes = {
  dataItem: PropTypes.object.isRequired,
};

export default DataCard;
