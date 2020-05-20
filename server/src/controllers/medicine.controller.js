//model
const Medicine = require("../models/medicine.model");
//middleware
const asyncMiddleware = require("../middleware/async");

exports.list = asyncMiddleware(async (req, res) => {
    const medicine = await Medicine.find({}).exec();
    return res.status(200).send(medicine);
});

exports.add = asyncMiddleware(async (req, res) => {
    const s = await Medicine.findOne({ medicine_name: req.body.medicine_name });
    if(s) throw new Error('ITEM_IS_ALREADY_EXIST');
    const medicine = await Medicine.create(req.body);
    return res.status(200).send(medicine);
});

exports.remove = asyncMiddleware(async (req, res) => {
    const medicine = await Medicine.deleteMany({ _id: req.body }).exec();
    if(!medicine) throw new Error('NOT_FOUND');
    return res.status(200).send(medicine);
});

exports.update = asyncMiddleware(async (req, res) => {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    if(!medicine) throw new Error('NOT_FOUND');
    return res.status(200).send(req.body);
});