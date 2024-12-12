import AddEntryForm from "../components/AddEntryForm";

const AddActivityPage = () => {
  const handleEntryAdded = () => {
    // Logic after activity is successfully added
    console.log("Activity added successfully!");
  };

  return (
    <div className="form-wrapper">
      <h1 className="title">Add New Activity</h1>
      <AddEntryForm type="activities" recordName="activity" onEntryAdded={handleEntryAdded} />
    </div>
  );
};

export default AddActivityPage;
