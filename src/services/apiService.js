import axios from "axios";

// Add employee
export const addEmployee = (employeeData) => {
  return axios.post("http://localhost:5000/employees", employeeData);
};

// Add project
export const addProject = (projectData) => {
  return axios.post("http://localhost:5000/projects", projectData);
};

// Add activity
export const addActivity = (activityData) => {
  return axios.post("http://localhost:5000/activities", activityData);
};
