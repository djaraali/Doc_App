const mongoose = require('mongoose');

const sentenceSchema = mongoose.Schema({
    sentence: { type: String, required: true, unique: true },
}, {
	timestamps: true
});

// Add full-text search index
sentenceSchema.index({
	"sentence": "text",
});

module.exports = mongoose.model('Sentence', sentenceSchema);

