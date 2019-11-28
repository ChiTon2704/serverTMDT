const mongoose = require('mongoose');
const { PhoneSchema } = require('./Phone');
const CartSchema = new mongoose.Schema(
    {
        type: Object,
        nameCustomer: String,
        addressCustomer: String,
        phoneCustomer: Number,
        items :[PhoneSchema]
    }
)
const Cart = mongoose.model('Cart', CartSchema);
module.exports = { Cart, CartSchema };