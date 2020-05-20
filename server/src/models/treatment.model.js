const mongoose = require('mongoose');

const treatmentSchema = mongoose.Schema({
    details: { type: String, required: true },
    category: { type: String },
    name: { type: String },
    library: { type: Boolean, default: false },
}, {
	timestamps: true
});

module.exports = mongoose.model('Treatment', treatmentSchema);

