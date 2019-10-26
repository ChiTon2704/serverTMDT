const mongoose = require('mongoose');
const { ProviderInfo } = require('./ProviderInfo');
const PhoneSchema = new mongoose.Schema(
    {
        name_phone: String,
        category: String,
        NB: Boolean,
        discount: Number,
        description: String,
        img: String,
        sale: Boolean,
        price: Number,
        providerInfo: {
            type:{ProviderInfo}
        }
    }
)
const Phone = mongoose.model('Phone', PhoneSchema);
module.exports = { Phone, PhoneSchema };