const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    product_name: { type: String, required: true },
    image: { type: String, required: true },
    views: { type: String, required: true },
    stock: { type: String, required: true },
    sku: { type: String, required: true }, 
    purchase_price: { type: String, required: true }, 
    retail_price: { type: String, required: true }, 
    category: { type: String, required: true }, 
    quantity: { type: String, required: true }, 
    details: { type: String, required: true }, 
    colors: { type: String, required: true }, 
    item_left: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});


schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Virals', schema);