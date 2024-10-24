import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Financials = () => {
  const [financials, setFinancials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/financials")
      .then((response) => {
        setFinancials(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="page-wrapper">
      {/* <Sidebar /> */}
      <div className="table financial">
        <div className="financial table-head">
          <span className="flex-1 th-item">Mesec</span>
          <span className="flex-1 th-item">Prihod</span>
          <span className="flex-1 th-item">Rashod</span>
          <span className="flex-1 th-item">Najvece rashod</span>
        </div>
        {financials.map((financial) => (
          <div key={financial.id} className="table-row financial">
            <span className="flex-1">{financial.month}</span>
            <span className="flex-1">{financial.revenue}</span>
            <span className="flex-1">{financial.expenses}</span>
            <span className="flex-1">
              {financial.biggestExpense.category} -{" "}
              {financial.biggestExpense.amount}
            </span>
          </div>
        ))}
      </div>
      <Link to="/add-employee">
        <button className="btn btn-add">+ Add New Employee</button>
      </Link>
    </div>
  );
};

export default Financials;
