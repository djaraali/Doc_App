const config = require('../config/config')
//model
const File = require("../models/file.model");
//middleware
const asyncMiddleware = require("../middleware/async");

const removeFile = require("../jobs/removeFile")

exports.upload = asyncMiddleware(async (req, res) => {
    // console.log(req.files)
    // if its single upload
    if(req.files.length === 1) {
        const file = req.files[0];
        let obj = await File.create({ url: `${config.staticUrl}${file.filename}`, filename: file.filename, size: file.size })
        return res.status(200).send(obj);
    }
    
});

exports.drawing = asyncMiddleware(async (req, res) => {
    // console.log(req.files)
    // if its single upload
    if(req.files.length === 1) {
        const file = req.files[0];
        let obj = await File.create({ url: `${config.staticUrl}${file.filename}`, filename: file.filename, size: file.size, drawing: true })
        return res.status(200).send(obj);
    }
    
});

exports.drawingList = asyncMiddleware(async (req, res) => {
    let files = await File.find({ drawing: true }).sort({'createdAt': -1})
    return res.status(200).send(files);
});

exports.remove = asyncMiddleware(async (req, res) => {
    req.body.forEach(fileName => {
        let s = path.join(__dirname, `../../files/${fileName}`);
        removeFile(s);
    });
    const fl = await File.deleteMany({ filename: req.body }).exec();
    return res.status(200).send(fl);
});