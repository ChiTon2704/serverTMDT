const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BillDetailSchema = new mongoose.Schema(
    {
        phone: {type: Schema.Types.ObjectId, ref: 'Phone'},
        price: Number,
        quantity: Number,
    }
)
const BillDetail = mongoose.model('BillDetail', BillDetailSchema);
module.exports = { BillDetail, BillDetailSchema };