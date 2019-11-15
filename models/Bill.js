const mongoose = require('mongoose');
const BillSchema = new mongoose.Schema(
    {
        date: Date,
        price: Number,
        quantity: Number,
        total: Number,
        customer: String,
    }
)
const Bill = mongoose.model('Bill', BillSchema);
module.exports = { Bill, BillSchema };