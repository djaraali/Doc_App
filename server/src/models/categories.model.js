const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
}, {
	timestamps: true
});

module.exports = mongoose.model('Category', categoriesSchema);

