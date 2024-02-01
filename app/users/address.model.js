const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    postal_code: { type: String, required: true },
    area: { type: String, required: true },
    locality: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Address', schema);