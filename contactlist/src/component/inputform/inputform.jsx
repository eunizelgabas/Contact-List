import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import InputField from "../inputfield/inputfield";
import Button from "../button/button";
import { validateData } from "../../services/validation";
import axios from "axios";

function InputForm({ customer, onClose, onAlertShow }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
  });

  const [errors, setErrors] = useState({}); // To track validation errors

  // Populate form with customer data when in edit mode.
  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        contactNo: customer.contactNo,
      });
    }
  }, [customer]);

  // Handle form submission for adding or editing a customer.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submission.
    const isValid = validateData(
      formData.name,
      formData.email,
      formData.contactNo
    );

    if (!isValid.isValid) {
      setErrors(isValid.errors); //Set error if data is invalid
      return;
    }

    setErrors({});

    try {
      if (customer) {
        // await handleEditCustomer(customer.id, formData); // Edit existing customer
        await axios
          .put(`http://localhost:5000/update/${customer._id}`, formData)
          .then((result) => {
            location.reload(); 
          })
          .catch((err) => {
            console.error("Error updating customer:", err);
          });

        onAlertShow("Customer updated successfully!");
      } else {
        await axios
          .post("http://localhost:5000/add",  formData)
          .then((result) => {
            location.reload();
          })
          .catch((err) => console.log(err));
        onAlertShow("Customer added successfully!");
      }
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error saving customer:", error);
      onAlertShow("Failed to save customer. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputField
        label="Name"
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />

      <InputField
        label="Contact No"
        type="text" // Changed from number to text
        id="contactNo"
        name="contactNo"
        value={formData.contactNo}
        onChange={(e) =>
          setFormData({ ...formData, contactNo: e.target.value })
        }
        error={errors.contactNo}
      />

      <InputField
        label="E-mail address"
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />

      <div className="button-container">
        <Button onClick={onClose}>Cancel</Button>
        <Button textOnly type="submit">
          {customer ? "Save Changes" : "Add Customer"}
        </Button>
      </div>
    </Form>
  );
}

export default InputForm;
