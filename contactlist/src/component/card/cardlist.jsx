import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../button/button";
import Modal from "../modal/modal";
import "./cardList.css";
import InputForm from "../inputform/inputform";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatContactNo } from "../../utils/formatContactNo";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function CardList({ id, name, email, contactNo, onAlertShow }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [isDelete, setDelete] = useState(false);

  // Open and close modal functions
  const openModal = () => {
    setCustomer({ id, name, email, contactNo }); // Set the customer data for editing
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const openDelete = () => setDelete(true);
  const closeDelete = () => setDelete(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((response) => {
        setCustomer(response.data); // Correctly call setCustomers to update state
      })
      .catch((error) => {
        console.error("Failed to fetch customers:", error);
      });
  }, []);

  const startDeleteHandler = async () => {
    try {
      // await handleDeleteCustomer(id); // Call delete function with customer ID
      axios
        .delete("http://localhost:5000/delete/" + id)
        .then((result) => {
          location.reload();
        })
        .catch((err) => console.log(err));
      onAlertShow(`Customer ${name} deleted successfully!`); // Show success alert
      closeDelete(); // Close delete modal
    } catch (error) {
      console.error("Error deleting customer:", error);
      onAlertShow(`Failed to delete customer. Please try again.`); // Show error alert
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <Link to={`/customers/${id}`} className="text-link">
            <h3 className="card-name">{name}</h3>
          </Link>
          <div className="card-icons">
            <Button icon title="Edit" className="btn-icon" onClick={openModal}>
              <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button
              icon
              title="Delete"
              className="btn-icon"
              onClick={openDelete}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </div>
        <p className="card-email">{email}</p>
        <p className="card-contact">{contactNo}</p>
      </div>

      {/* Edit Form Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <InputForm
          customer={customer} // Pass customer data to InputForm
          onClose={closeModal}
          onAlertShow={onAlertShow}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDelete} onClose={closeDelete}>
        <div className="delete-header">
          <h3>Delete Customer</h3>
        </div>
        <div className="delete-content">
          Are you sure you want to delete {name}?
        </div>
        <div className="card-icons">
          <Button onClick={closeDelete}>Cancel</Button>
          <Button textOnly onClick={() => startDeleteHandler(customer._id)}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default CardList;
