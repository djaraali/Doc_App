const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    filename: { type: String, required: true },
    size: { type: String },
    url: { type: String },
    drawing: { type: Boolean, default: false }
}, {
	timestamps: true
});

module.exports = mongoose.model('File', fileSchema);

