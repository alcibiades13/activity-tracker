import DataTable from "../components/DataTable";

const Projects = () => {
  const tableName = "projects";

    return (
      <div className="page-wrapper">
        <DataTable tableName={tableName} />
      </div>
    );
};

export default Projects;
