import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "../component/button/button";
import Header from "../component/header/header";
import CardList from "../component/card/cardlist";
import TableList from "../component/table/table";
import axios from "axios";
import Alert from "../component/alert/alert";
import "../index.css";

function Home() {
  const [isCardView, setIsCardView] = useState(true); // Default to card view
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [customers, setCustomers] = useState([]);

  const handleCardView = () => {
    setIsCardView(true);
  };

  const handleTableView = () => {
    setIsCardView(false);
  };

  const handleAlertShow = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000); // Automatically hide the alert after 2 seconds
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((response) => {
        setCustomers(response.data); // Correctly call setCustomers to update state
      })
      .catch((error) => {
        console.error("Failed to fetch customers:", error);
      });
  }, []);

  return (
    <>
      <Header onAlertShow={handleAlertShow} />
      <div className="icon-container">
        <Button icon onClick={handleCardView}>
          <FontAwesomeIcon
            icon={faTableCellsLarge}
            className={`icon ${isCardView ? "inactive" : "active"}`}
          />
        </Button>

        <Button icon onClick={handleTableView}>
          <FontAwesomeIcon
            icon={faList}
            className={`icon ${isCardView ? "active" : "inactive"}`}
          />
        </Button>
      </div>

      {isCardView ? (
        <div className="card-container">
          {customers.map((customer) => (
            <CardList
              key={customer._id}
              name={customer.name}
              email={customer.email}
              contactNo={customer.contactNo}
              id={customer._id}
              onAlertShow={handleAlertShow}
            />
          ))}
        </div>
      ) : (
        <div className="table-view">
          <TableList onAlertShow={handleAlertShow} />
        </div>
      )}

      {alertVisible && <Alert message={alertMessage} />}
    </>
  );
}
export default Home;
