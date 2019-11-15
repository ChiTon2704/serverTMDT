const mongoose = require('mongoose');
const PhoneSchema = new mongoose.Schema(
    {
        name_phone: String,
        brand: String,
        sale: String,
        description: String,
        img: String,
        is_sale: Boolean,
        is_new: Boolean,
        price: Number,
    }
)
const Phone = mongoose.model('Phone', PhoneSchema);
module.exports = { Phone, PhoneSchema };