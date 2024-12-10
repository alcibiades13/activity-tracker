import axios from "axios";

// Generalized API function
export const addEntry = (tableName, data) => {
  return axios.post(`http://localhost:5000/${tableName}`, data);
};
