import DataTable from "../components/DataTable";

const Employees = () => {
  const tableName = "employees";
  const recordName = "employee"; // Singular term for UI display

  return (
    <div className="page-wrapper">
      <DataTable tableName={tableName} recordName={recordName} />
    </div>
  );
};

export default Employees;
