const mongoose = require('mongoose');

const Medicine = mongoose.Schema({
    medicine_name: { type: String },
    medicine_type: { type: String },
    strength: [{ type: String }],
    image: { type: String },
});

module.exports = mongoose.model('Medicine', Medicine);

