const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    fromid : { type: String, required: true },
    toid: { type: String, required: true },
    fromname: { type: String, required: true }, 
    message: {type: String, required: true},
    infos: {type: String, required: false},
    createdAt: { type: Date, default: Date.now },
    token: {type: String, required: false},
    status: {type: String, required: false},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Chat', schema);