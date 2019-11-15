const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BillSchema = new mongoose.Schema(
    {
        date: Date,
        price: Number,
        quantity: Number,
        total: Number,
        customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    }
)
const Bill = mongoose.model('Bill', BillSchema);
module.exports = { Bill, BillSchema };