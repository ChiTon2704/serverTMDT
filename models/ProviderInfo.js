const mongoose = require('mongoose');

const ProviderInfoSchema = new mongoose.Schema(
    {
        type: Object,
        nameProvider: String,
        address: String,
        numberPhone: Number
    }
)
const ProviderInfo = mongoose.model('ProviderInfo', ProviderInfoSchema);
module.exports = { ProviderInfo, ProviderInfoSchema };