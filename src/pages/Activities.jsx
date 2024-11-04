import DataTable from "../components/DataTable";

const Activities = () => {
  const tableName = "activities";

    return (
      <div className="page-wrapper">
        <DataTable tableName={tableName} />
      </div>
    );
};

export default Activities;
