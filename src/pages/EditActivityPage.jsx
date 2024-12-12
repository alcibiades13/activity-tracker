import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditEntryPage from "./EditEntryPage";
import { getFormFieldsForType } from "../lib/dataUtils"; // Import your utility function
import { BASE_URL } from "../constants/config";


const EditActivityPage = () => {
  const [fields, setFields] = useState([]);
  const { id } = useParams(); // Get the ID from the URL
  const type = "activities";

  useEffect(() => {
    try {
      const activityFields = getFormFieldsForType("activities");
      setFields(activityFields || []);
    } catch (error) {
      console.error("Error fetching form fields:", error);
    }
  }, []);

  return (
    <div>
      {fields.length > 0 ? (
        <EditEntryPage
          type={type}
          fields={fields}
          endpoint={`${BASE_URL}/${type}`}
          id={id} // Pass the ID to the EditEntryPage
        />
      ) : (
        <p>Loading...</p> // Optionally handle loading state
      )}
    </div>
  );
};

export default EditActivityPage;
