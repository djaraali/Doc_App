//model
const Patient = require("../models/patient.model");
const Appointment = require("../models/appointments.model");
//middleware
const asyncMiddleware = require("../middleware/async");

exports.list = asyncMiddleware(async (req, res) => {
    const patients = await Patient.find({}).exec();
    return res.status(200).send(patients);
});

exports.item = asyncMiddleware(async (req, res) => {
    const patient = await Patient.findById(req.params.id).exec();
    const appointments = await Appointment.find({ patient: patient._id }).populate('patient consultation diagnose treatment prescription');
    return res.status(200).send({ patient, appointments });
});

exports.add = asyncMiddleware(async (req, res) => {
    const p = await Patient.findOne({}).sort({ 'createdAt': -1 });

    if(!p) req.body.id = 'Patient-001'
    else {
        let st = parseInt(p.id.split('-')[1]);
        st++;
        if(st < 10) st = `Patient-00${st}`;
        else if(st < 100) st = Patient-`0${st}`;
        if(st < 100) st = `Patient-${st}`;
        req.body.id = st;
    }
    const patient = await Patient.create(req.body);

    return res.status(200).send(patient);
});