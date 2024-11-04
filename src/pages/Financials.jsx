import DataTable from "../components/DataTable";

const Financials = () => {
  const tableName = "financials";

    return (
      <div className="page-wrapper">
        <DataTable tableName={tableName} />
      </div>
    );
};

export default Financials;
