// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import CustomerModel from "./models/customer";
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomerModel = require("./models/customer");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/sample");

app.get("/get", async (req, res) => {
  try {
    const customers = await CustomerModel.find();
    res.status(200).json(customers); // Send the customer data
  } catch (err) {
    console.error("Error fetching customers:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch customers", error: err.message });
  }
});

app.post("/add", async (req, res) => {
    try {
        const { name, email, contactNo } = req.body;  // Remove .customer

        await CustomerModel.create({
            name,
            email,
            contactNo
        });

        res.status(200).json({ message: "Customer added successfully!" });
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).json({ 
            message: "Failed to add customer", 
            error: error.message 
        });
    }
});

app.delete("/delete/:id", async (req, res) => {
  const customerId = req.params.id; // Extract the ID from the URL
  try {
    const result = await CustomerModel.findByIdAndDelete(customerId);
    if (result) {
      res.status(200).json({ message: "Customer deleted successfully!" });
    } else {
      res.status(404).json({ message: "Customer not found." });
    }
  } catch (error) {
    console.error("Error deleting customer:", error);
    res
      .status(500)
      .json({ message: "Failed to delete customer.", error: error.message });
  }
});

app.put("/update/:id", async (req, res) => {
  const customerId = req.params.id;
  const { name, email, contactNo } = req.body;

  try {
      const result = await CustomerModel.findByIdAndUpdate(
          customerId,
          { name, email, contactNo },  // Update object
          { new: true }  // Options object
      );

      if (result) {
          res.status(200).json({ 
              message: "Customer updated successfully!", 
              result 
          });
      } else {
          res.status(404).json({ message: "Customer not found." });
      }
  } catch (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({ 
          message: "Failed to update customer.", 
          error: error.message 
      });
  }
});
app.listen(5000, () => {
  console.log("Server is running...");
});
