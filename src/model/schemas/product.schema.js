const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);

module.exports = productModel