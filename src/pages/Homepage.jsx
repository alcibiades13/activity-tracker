import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faDollarSign,
  faUsers,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import SimpleBarChart from "../components/SimpleBarChart";

import axios from "axios";

const Homepage = () => {
  const [data, setData] = useState({
    projects: [],
    employees: [],
    activities: [],
    financials: [],
  });
  const [financialData, setFinancialData] = useState([]); // State for financial data

  const formatFinancialData = (financials) => {
    return financials.map((item) => ({
      month: item.month,
      revenue: item.revenue,
      expenses: item.expenses,
    }));
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [employeesRes, projectsRes, activitiesRes, financialsRes] =
          await Promise.all([
            axios.get("http://localhost:5000/employees"),
            axios.get("http://localhost:5000/projects"),
            axios.get("http://localhost:5000/activities"),
            axios.get("http://localhost:5000/financials"),
          ]);

        setData({
          employees: employeesRes.data,
          projects: projectsRes.data,
          activities: activitiesRes.data,
          financials: financialsRes.data,
        });

        // Format and set financial data
        const formattedData = formatFinancialData(financialsRes.data);
        setFinancialData(formattedData); // Update state with formatted financial data
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="homepage">
      <h1>Dashboard</h1>
      <div className="stats-cards stats-row">
        <div className="card">
          <div className="icon icon-blue">
            <FontAwesomeIcon icon={faProjectDiagram} />
          </div>
          <h3>Projects</h3>
          <div className="number">11/19</div>
        </div>
        <div className="card">
          <div className="icon icon-orange">
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
          <h3>Revenue</h3>
          <div className="number">$52.374</div>
        </div>
        <div className="card">
          <div className="icon icon-purple">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <h3>Employees</h3>
          <div className="number">{data.employees?.length || 0}</div>
        </div>
        <div className="card">
          <div className="icon icon-green">
            <FontAwesomeIcon icon={faBuilding} />
          </div>
          <h3>Main Project</h3>
          <div className="number">{data.projects[0]?.name}</div>
          {/* <div className="number">Project Name</div> */}
        </div>
      </div>
      <h2>Tabele zaposlenih i aktivnosti</h2>
      <div className="stats-row">
        <table className="table employees">
          <thead className="employee table-head">
            <tr>
              <th>Ime</th>
              <th>Pozicija</th>
              <th>Telefon</th>
            </tr>
            {/* <span className="flex-1 th-item">Status</span> */}
          </thead>
          <tbody>
          {data.employees?.map((employee) => (
            <tr key={employee.id} className="employee">
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.phone}</td>
              {/* <span>{employee.status}</span> */}
            </tr>
          ))}
          </tbody>
        </table>

        <table className="table activities">
          <thead className="activity">
            <tr>
            <th>Aktivnost</th>
            <th>Opis aktivnosti</th>
            <th>Trajanje (h)</th>
            <th>Datum</th>
            </tr>
          </thead>
          <tbody>
            {data.activities?.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.activityType}</td>
                <td>{activity.description}</td>
                <td>{activity.durationHours}</td>
                <td>{activity.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Graficki prikazi</h2>
      <div className="stats-row">
        <table className="table">
          <tbody>
          {data.financials.map((financial) => (
            <tr key={financial.id}>
              <td>{financial.month}</td>
              <td>{financial.revenue}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className="table">
          <SimpleBarChart data={financialData} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
