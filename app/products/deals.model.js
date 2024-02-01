const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    categoryId: { type: String, required: true },
    subCategoryId: { type: String, required: true },
    subCategory1Id: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Deals', schema);