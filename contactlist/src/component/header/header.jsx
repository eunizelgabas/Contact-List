import { useState } from "react";
import Button from "../button/button";
import "./header.css";
import Modal from "../modal/modal"
import InputForm from "../InputForm/InputForm";
function Header({ onAlertShow }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      <div className="contact-info">
        <div className="text-section">
          <h2>Contacts Information</h2>
          <p>
            Your list of contacts appears here. To add a new contact, click on
            <br />
            the Add New Contact button.
          </p>
        </div>
        <Button textOnly onClick={openModal}>
          Add New Contact
        </Button>
      </div>

      {/* Add Form Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <InputForm onClose={closeModal} onAlertShow={onAlertShow} />
      </Modal>
    </>
  );
}
export default Header;
