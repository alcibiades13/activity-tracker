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
      <div className="table projects">
        <div className="project table-head">
          <span className="flex-1 th-item">Status</span>
          <span className="flex-1 th-item">Projekat</span>
          <span className="flex-1 th-item">Datum pocetka (h)</span>
          <span className="flex-1 th-item">Zadaci</span>
        </div>
        {projects.map((project) => (
          <div key={project.id} className="table-row">
            <span className="flex-1">{project.status}</span>
            <span className="flex-1">{project.name}</span>
            <span className="flex-1">{project.startDate}</span>
            <span className="flex-1">
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
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
