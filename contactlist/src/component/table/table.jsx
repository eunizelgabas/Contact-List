import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../button/button";
import InputForm from "../inputform/inputform";
import Modal from "../modal/modal";
import "./table.css";
import { formatContactNo } from "../../utils/formatContactNo";
import axios from "axios";

function TableList({ onAlertShow }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const [isDelete, setDelete] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [customers, setCustomers] = useState([]);
  // Open and close modal functions
  const openModal = (customer) => {
    setCustomerToEdit(customer); // Set the customer data for editing
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setCustomerToEdit(null); // Clear customer data on close
  };
  const openDelete = (customer) => {
    setCustomerToDelete(customer); // Set the customer data for deletion
    setDelete(true);
  };
  const closeDelete = () => {
    setDelete(false);
    setCustomerToDelete(null); // Clear customer data on close
  };

  const startDeleteHandler = async () => {
    if (!customerToDelete) {
      onAlertShow("No customer selected for deletion.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/delete/${customerToDelete._id}`
      );

      if (response.status === 200) {
        onAlertShow(`Customer ${customerToDelete.name} deleted successfully!`);
        setCustomers((prevCustomers) =>
          prevCustomers.filter(
            (customer) => customer._id !== customerToDelete._id
          )
        );
        closeDelete(); // Close delete modal
      } else {
        onAlertShow("Failed to delete customer. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      onAlertShow(
        "An error occurred while deleting the customer. Please try again."
      );
    }
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
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact No</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>
                <Link to={`/customers/${customer._id}`} className="text-link">
                  {customer.name}
                </Link>
              </td>
              <td>{customer.contactNo}</td>
              <td>{customer.email}</td>
              <td className="actions">
                <span>
                  <Button
                    icon
                    title="Edit"
                    className="btn-icon"
                    onClick={() => openModal(customer)} // Pass the customer data edit
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                </span>
                <span>
                  <Button
                    title="Delete"
                    icon
                    className="btn-icon"
                    onClick={() => openDelete(customer)} // Pass the customer data for delete
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <InputForm
          customer={customerToEdit} // Pass customer data to InputForm
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
          Are you sure you want to delete {customerToDelete?.name}?
        </div>
        <div className="card-icons">
          <Button onClick={closeDelete}>Cancel</Button>
          <Button textOnly onClick={startDeleteHandler}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default TableList;
