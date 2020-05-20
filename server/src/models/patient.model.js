const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    firstname: { type: String, },
    lastname: { type: String, },
    id: { type: String, unique: true, required: true },
    birthdate: { type: Date, },
    sex: { type: String, },
    phone: { type: String, },
    email: { type: String, },
}, {
	timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);

