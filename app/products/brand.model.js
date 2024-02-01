const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    categoryId: { type: String },
    subCategoryId: { type: String },
    subCategory1Id: { type: String },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Brand', schema);