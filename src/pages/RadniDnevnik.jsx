// import DataTable from "../components/DataTable";
import CardList from "../components/CardList";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RadniDnevnik = () => {
    const [data, setData] = useState([]);
    const tableName = "radni_dnevnik";

    useEffect(() => {
        axios.get(`http://localhost:5000/${tableName}`)
            .then((response) => {
                setData(response.data);
                console.log(response.data); // Log the response data directly
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [tableName]);


    return (
      <div className="page-wrapper">
        {/* <DataTable tableName={tableName} /> */}
        <CardList data={data} tableName={tableName} />
        <Link to="/add-radni_dnevnik">
            <button className="btn btn-add">+ Dodaj radni nalog</button>
          </Link>
      </div>
    );
};

export default RadniDnevnik;
