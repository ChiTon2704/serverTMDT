const mongoose = require('mongoose');
const SaleSchema = new mongoose.Schema(
    {
        name_sale: String,
        price_sale: Number
    }
)
const Sale = mongoose.model('Sale', SaleSchema);
module.exports = { Sale, SaleSchema };