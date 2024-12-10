import InputField from "../components/InputField"; // adjust path as necessary
import { ACTIVITY_TYPE_OPTIONS } from "../constants/fitlerConstants";


export const searchInObject = (obj, query) => {
  // If the object is an array, check each item
  if (Array.isArray(obj)) {
    return obj.some(item => searchInObject(item, query));
  }

  // If it's an object, iterate through its values
  if (typeof obj === 'object' && obj !== null) {
    return Object.values(obj).some(value => searchInObject(value, query));
  }

  // Handle numeric and string comparisons
  if (typeof obj === 'number') {
    return String(obj).includes(query);
  }

  // Fallback to string comparison
  return typeof obj === 'string' && obj.toLowerCase().includes(query.toLowerCase());
};


// Define a schema for dynamic fields
export const getFormFieldsForType = (type) => {
  const schemas = {
    employees: [
      { name: "name", placeholder: "Employee Name", fieldType: "input", type: "text" },
      { name: "position", placeholder: "Position", fieldType: "input", type: "text" },
      {
        name: "department",
        placeholder: "Department",
        fieldType: "select",
        options: [
          { value: "HR", label: "HR" },
          { value: "Tech", label: "Tech" },
          { value: "Finance", label: "Finance" },
        ],
      },
      { name: "startDate", placeholder: "Start Date", fieldType: "date" },
    ],
    projects: [
      { name: "name", placeholder: "Project Name", fieldType: "input", type: "text" },
      {
        name: "status",
        placeholder: "Status",
        fieldType: "select",
        options: [
          { value: "Active", label: "Active" },
          { value: "Completed", label: "Completed" },
          { value: "Pending", label: "Pending" },
        ],
      },
      { name: "startDate", placeholder: "Start Date", fieldType: "date" },
      { name: "endDate", placeholder: "End Date", fieldType: "date" },
    ],
    activities: [
      { name: "projectId", placeholder: "Project ID", fieldType: "input", type: "number" },
      {
        name: "activityType",
        placeholder: "Activity Type",
        fieldType: "select",
        options: ACTIVITY_TYPE_OPTIONS, // Use the imported constant directly
      },
      { name: "description", placeholder: "Description", fieldType: "textarea" },
      { name: "date", placeholder: "Activity Date", fieldType: "date" },
      { name: "durationHours", placeholder: "Duration (hours)", fieldType: "input", type: "number" },
    ],
  };

  return schemas[type] || [];
};


// Recursive Handling of Nested Fields
export const renderFields = (fields, formData, handleChange, handleNestedChange, handleAddNestedField, parentFieldName = '') => {
  return fields.map((field, index) => {
    if (field.nested) {
      // Handle nested fields (render button and nested fields)
      return (
        <div key={field.name} className="nested-field">
          <button type="button" onClick={() => handleAddNestedField(field.name)}>
            Add {field.label}
          </button>
          {formData[field.name] && (
            <div className="nested-fields">
              {renderFields(field.fields, formData, handleNestedChange, handleChange, handleAddNestedField, field.name)}
            </div>
          )}
        </div>
      );
    }

    return (
      <InputField
        key={field.name}
        field={field}
        formData={formData}
        handleChange={handleChange}
        handleNestedChange={handleNestedChange}
        index={index}
        parentFieldName={parentFieldName}
      />
    );
  });
};