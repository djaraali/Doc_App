const mongoose = require('mongoose');

const drugSchema = mongoose.Schema({
    medicine_name: { type: String },
    medicine_times: [{
        time: String,
        day_time: String
    }],
    medicine_type: { type: String },
    strength: { type: String },
    image: { type: String },
    dose: { type: String },
    frequency: { type: String },
    duration: { type: String },
    beforeEat: { type: Boolean, default: false },
    note: { type: String },
});

const prescriptionSchema = mongoose.Schema({
    drugs: [drugSchema],
    instructions: { type: String },
    name: { type: String, },
    category: { type: String, },
    library: { type: Boolean, default: false },
});

module.exports = mongoose.model('Prescription', prescriptionSchema);

