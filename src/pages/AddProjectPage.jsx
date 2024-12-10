// AddProjectPage.js
import AddEntryForm from "../components/AddEntryForm";

const AddProjectPage = () => {
  const handleProjectAdded = () => {
    // Additional logic or redirect after adding project
    console.log("Project added successfully!");
  };

  return (
    <div>
      <h1>Add New Project</h1>
      <AddEntryForm type="projects" onEntryAdded={handleProjectAdded} />
    </div>
  );
};

export default AddProjectPage;
