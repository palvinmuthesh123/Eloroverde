const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    gender: { type: String, required: false },
    avatar: { type: String },
    createdDate: { type: Date, default: Date.now },
    active: {type: Boolean, default: true},
    admin: {type: Boolean, default: false},
    latitude: { type: String, default: "" },
    longitude: { type: String, default: "" },
    description: {type: String, default: "" },
    deviceid: {type: String, default: "" },
    address: {type: String, default: "" },
    defaultAddress: {type: String, default: "" },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);