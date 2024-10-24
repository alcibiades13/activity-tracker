import { useState, useEffect } from "react";
import axios from "axios";
// import Sidebar from "../components/Sidebar";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="page-wrapper">
      {/* <Sidebar /> */}
      <table className="table activities">
        <thead className="activity table-head">
          <tr>
            <th>Aktivnost</th>
            <th>Opis aktivnosti</th>
            <th>Trajanje (h)</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id} className="table-row activity">
              <td>{activity.activityType}</td>
              <td>{activity.description}</td>
              <td>{activity.durationHours}</td>
              <td>{activity.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activities;
