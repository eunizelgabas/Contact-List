const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
    contactNo: Number
})

const CustomerModel = mongoose.model("customers", CustomerSchema);

module.exports = CustomerModel;