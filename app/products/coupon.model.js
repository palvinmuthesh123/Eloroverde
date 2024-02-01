const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    code: { type: String, required: true },
    value: { type: String, required: true },
    expire: { type: String, required: true },
    limit: { type: String, required: true },
    amount: { type: String, required: true },
    min_amount: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Coupon', schema);