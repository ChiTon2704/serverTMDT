const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {CustomerSchema} = require('./Customer')
const BillSchema = new mongoose.Schema(
    {
        date: Date,
        customer: CustomerSchema,
        billDetail: [{ type: Schema.Types.ObjectId, ref: 'BillDetail' }],
        deliveryState: 
        {
            type:String,
            default: 'ORDER'
        }
    }
)
const Bill = mongoose.model('Bill', BillSchema);
module.exports = { Bill, BillSchema };