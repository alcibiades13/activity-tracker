import DataTable from "../components/DataTable";

const Activities = () => {
  const tableName = "activities";
  const recordName = "activity";

    return (
      <div className="page-wrapper">
        <DataTable tableName={tableName} recordName={recordName} />
      </div>
    );
};

export default Activities;
