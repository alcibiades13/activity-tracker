import AddEntryForm from "../components/AddEntryForm";

const AddEmployeePage = () => {
  const handleEntryAdded = () => {
    // Logic after employee is successfully added
    console.log("Employee added successfully!");
  };

  return (
    <div className="form-wrapper">
      <h1 className="title">Add new employee</h1>
      <AddEntryForm type="employees" recordName="employee" onEntryAdded={handleEntryAdded} />
    </div>
  );
};

export default AddEmployeePage;
