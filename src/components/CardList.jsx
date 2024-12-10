import PropTypes from "prop-types";
import DataCard from "./DataCard";

const CardList = ({ data, tableName }) => {
  return (
    <div className="card-list">
      {data.map((item) => (
        <DataCard key={item.id} dataItem={item} tableName={tableName} />
      ))}
    </div>
  );
};

CardList.propTypes = {
  data: PropTypes.array.isRequired,
  tableName: PropTypes.string.isRequired,
};

export default CardList;
