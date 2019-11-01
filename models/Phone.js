const mongoose = require('mongoose');
const { SaleSchema } = require('./Sale');
const PhoneSchema = new mongoose.Schema(
    {
        name_phone: String,
        brand: String,
        sale: Number,
        description: String,
        img: String,
        is_sale: Boolean,
        is_new: Boolean,
        price: Number,
        quantity:Number
    }
)
const Phone = mongoose.model('Phone', PhoneSchema);
module.exports = { Phone, PhoneSchema };