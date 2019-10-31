const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderedSchema = new mongoose.Schema(
    {
        date: Date,
        price: Number,
        quantity: Number,
        total: Number,
        customer: String,
    }
)
const Ordered = mongoose.model('Ordered', OrderedSchema);
module.exports = { Ordered, OrderedSchema };