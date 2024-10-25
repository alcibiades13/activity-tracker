import { useState, useEffect } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="page-wrapper">
      <table className="table projects">
        <thead className="project">
          <tr>
            <th>Status</th>
            <th>Projekat</th>
            <th>Datum pocetka (h)</th>
            <th>Zadaci</th>
          </tr>
        </thead>
        <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.status}</td>
            <td>{project.name}</td>
            <td>{project.startDate}</td>
            <td>
              {project.tasks.map((task) => (
                <div key={task.id}>
                  <span>{task.description}</span>
                  <span
                    className={`task-status ${task.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    [{task.status}]
                  </span>
                </div> // Use a div or another element for each task
              ))}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
