const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PhoneSchema = new mongoose.Schema(
    {
        name_phone: String,
        brand: String,
        sale: {type: Schema.Types.ObjectId, ref: "Sale"},
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