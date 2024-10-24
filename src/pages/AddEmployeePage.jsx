import AddEmployeeForm from "../components/AddEmployeeForm";

const AddEmployeePage = () => {
  return (
    <div className="form-wrapper">
      <h1 className="title">Add New Employee</h1>
      <AddEmployeeForm type="employee" />
    </div>
  );
};

export default AddEmployeePage;
