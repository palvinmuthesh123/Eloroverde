const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    totalproduct: { type: String, required: true },
    stock: { type: String, required: true },
    brand_name : { type: String, required: true },
    desc: { type: String },
    prize : { type: String },
    createdDate: { type: Date, default: Date.now }
});


schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Packs', schema);