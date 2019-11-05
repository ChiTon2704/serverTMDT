const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema(
    {
        name_customer: String,
        phone_customer: String,
        address_customer: String,
    }
)
const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = { Customer, CustomerSchema };