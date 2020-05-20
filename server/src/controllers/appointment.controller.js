const moment = require('moment')
const today = moment().startOf('day')
//model
const Appointment = require("../models/appointments.model");
const Treatment = require("../models/treatment.model");
const Consultation = require("../models/consultation.model");
const Diagnose = require("../models/diagnose.model");
const Prescription = require("../models/prescription.model");
//middleware
const asyncMiddleware = require("../middleware/async");

exports.list = asyncMiddleware(async (req, res) => {
    let date =  new Date(parseInt(req.query.date))
    console.log('date', date)
    // let endDate =  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

    let startOf = moment(date).startOf('day').toDate();
    let endOf = moment(date).endOf('day').toDate();

    console.log(startOf, endOf);
    const appointments = await Appointment.find({ date_time: { $gte: startOf, $lte: endOf, } }).populate('patient');
    if(appointments.length) {
        let x = appointments[0].date_time;
        console.log('x', x, new Date(x));
    }
    return res.status(200).send(appointments);
});

exports.upcoming = asyncMiddleware(async (req, res) => {
    const appointments = await Appointment.find({ date_time: { $gte: today.toDate(), } }).populate('patient');
    return res.status(200).send(appointments);
});

exports.single = asyncMiddleware(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id).populate('patient consultation diagnose treatment prescription');
    return res.status(200).send(appointment);
});

exports.update = asyncMiddleware(async (req, res) => {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body).populate('patient consultation diagnose treatment prescription');
    return res.status(200).send(appointment);
});

exports.add = asyncMiddleware(async (req, res) => {
    //create blank consultation
    const consultation = await Consultation.create({ details: " " });
    //create blank Diagnose
    const diagnose = await Diagnose.create({ details: " " });
    //create blank Treatment
    const treatment = await Treatment.create({ details: " " });
    //create blank Prescription
    const prescription = await Prescription.create({ instructions: " " });

    let obj = {}
    obj.consultation = consultation._id;
    obj.diagnose = diagnose._id;
    obj.treatment = treatment._id;
    obj.prescription = prescription._id;
    obj.patient = req.body.patient;
    obj.date_time = req.body.date_time;
    obj.note = req.body.note;

    const appointment = await Appointment.create(obj);

    return res.status(200).send(appointment);
});