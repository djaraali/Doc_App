const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const appointmentSchema = mongoose.Schema({

    patient: { type: ObjectId, required: true, ref: 'Patient' },
    date_time: { type: Date, required: true },
    note: { type: String },

    treatment: { type: ObjectId, required: true, ref: 'Treatment' },
    consultation: { type: ObjectId, required: true, ref: 'Consultation' },
    diagnose: { type: ObjectId, required: true, ref: 'Diagnose' },
    prescription: { type: ObjectId, required: true, ref: 'Prescription' },
    
}, {
	timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);