//model
const Sentence = require("../models/sentence.model");
//middleware
const asyncMiddleware = require("../middleware/async");

exports.list = asyncMiddleware(async (req, res) => {
    const sentences = await Sentence.find({}).exec();
    return res.status(200).send(sentences);
});

exports.add = asyncMiddleware(async (req, res) => {
    const s = await Sentence.findOne({ sentence: req.body.sentence });
    if(s) throw new Error('ITEM_IS_ALREADY_EXIST');
    const sentence = await Sentence.create({ sentence: req.body.sentence });
    return res.status(200).send(sentence);
});

exports.remove = asyncMiddleware(async (req, res) => {
    const sentence = await Sentence.deleteMany({ _id: req.body }).exec();
    if(!sentence) throw new Error('NOT_FOUND');
    return res.status(200).send(sentence);
});

exports.update = asyncMiddleware(async (req, res) => {
    const s = await Sentence.findOne({ sentence: req.body.sentence });
    if(s && s._id.toString() !== req.params.id) throw new Error('ITEM_IS_ALREADY_EXIST');
    const sentence = await Sentence.findByIdAndUpdate(req.params.id, { sentence: req.body.sentence }, { new: true }).exec();
    if(!sentence) throw new Error('NOT_FOUND');
    return res.status(200).send(sentence);
});