import DataTable from "../components/DataTable";

const Projects = () => {
  const tableName = "projects";
  const recordName = "project";

    return (
      <div className="page-wrapper">
        <DataTable tableName={tableName} recordName={recordName} />
      </div>
    );
};

export default Projects;
