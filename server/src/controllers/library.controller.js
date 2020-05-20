//model
const Treatment = require("../models/treatment.model");
const Consultation = require("../models/consultation.model");
const Diagnose = require("../models/diagnose.model");
const Category = require("../models/categories.model");
const Prescription = require("../models/prescription.model");
//middleware
const asyncMiddleware = require("../middleware/async");

async function saveCategory(title) {
    try {
        let c = await Category.findOne({title});
        if(!c) await Category.create({ title });
    } catch(e) {
        console.error(e);
    }
}

async function getLibraryItem(Schema, title) {
    try {
        const trObj = {};
        let cns = await Schema.find({ library: true });
        cns = cns.map(item => {
            let obj = JSON.parse(JSON.stringify(item));
            obj.folder = title;
            item = obj;
            return item;
        })
        // console.log(cns)
        let cnsSet = new Set();
        cns.forEach(item => {
            cnsSet.add(item.category);
        })
        let x = []
        for (let category of cnsSet) {
            let obj = {}
            obj.children = cns.filter(c => c.category === category)
            obj.name = category;
            x.push(Object.assign({}, obj))
        }
        trObj.name = title;
        trObj.children = x;
        return trObj;
    } catch(e) {
        console.error(e);
    }
}

function addId(arr, id) {
    console.log('arr', arr)
    arr.id = id++;
    arr.children.forEach(item => {
        item.id = id++;
        if(item.children) item.children.forEach(ch => {
            ch.id = id++
            if(ch.children) ch.children.forEach(cc => {
                cc.id = id++
            })
        })
    })
    return {arr, id};
}

exports.list = asyncMiddleware(async (req, res) => {
    let consultation = await getLibraryItem(Consultation, 'Consultation');
    let treatment = await getLibraryItem(Treatment, 'Treatment');
    let diagnose = await getLibraryItem(Diagnose, 'Diagnose');
    let prescription = await getLibraryItem(Prescription, 'Prescription');

    let cns = addId(consultation, 0);
    consultation = cns.arr;

    let trt = addId(treatment, cns.id);
    treatment = trt.arr;

    let dgs = addId(diagnose, trt.id);
    diagnose = dgs.arr;

    let prs = addId(prescription, dgs.id);
    prescription = prs.arr;
    
    let a = []
    a.push(consultation);
    a.push(treatment);
    a.push(diagnose);
    a.push(prescription);
    return res.status(200).send(a);
});

exports.listCategory = asyncMiddleware(async (req, res) => {
    const t = await Category.find()
    return res.status(200).send(t);
});

exports.createPrescription = asyncMiddleware(async (req, res) => {
    const t = await Prescription.create(req.body)
    saveCategory(req.body.category);
    return res.status(200).send(t);
});

exports.createConsultation = asyncMiddleware(async (req, res) => {
    const t = await Consultation.create(req.body)
    saveCategory(req.body.category)
    return res.status(200).send(t);
});

exports.createTreatment = asyncMiddleware(async (req, res) => {
    const t = await Treatment.create(req.body);
    saveCategory(req.body.category)
    return res.status(200).send(t);
});

exports.createDiagnose = asyncMiddleware(async (req, res) => {
    const t = await Diagnose.create(req.body);
    saveCategory(req.body.category)
    return res.status(200).send(t);
});


exports.updateConsultation = asyncMiddleware(async (req, res) => {
    const t = await Consultation.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send(t);
});

exports.updateTreatment = asyncMiddleware(async (req, res) => {
    const t = await Treatment.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send(t);
});

exports.updateDiagnose = asyncMiddleware(async (req, res) => {
    const t = await Diagnose.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send(t);
});

exports.updatePrescription = asyncMiddleware(async (req, res) => {
    const t = await Prescription.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send(t);
});


exports.getConsultation = asyncMiddleware(async (req, res) => {
    const t = await Consultation.findById(req.params.id);
    return res.status(200).send(t);
});

exports.getTreatment = asyncMiddleware(async (req, res) => {
    const t = await Treatment.findById(req.params.id);
    return res.status(200).send(t);
});

exports.getDiagnose = asyncMiddleware(async (req, res) => {
    const t = await Diagnose.findById(req.params.id);
    return res.status(200).send(t);
});

exports.getPrescription = asyncMiddleware(async (req, res) => {
    const t = await Prescription.findById(req.params.id);
    return res.status(200).send(t);
});


exports.removeConsultation = asyncMiddleware(async (req, res) => {
    const t = await Consultation.findByIdAndRemove(req.params.id);
    return res.status(200).send(t);
});

exports.removeTreatment = asyncMiddleware(async (req, res) => {
    const t = await Treatment.findByIdAndRemove(req.params.id);
    return res.status(200).send(t);
});

exports.removeDiagnose = asyncMiddleware(async (req, res) => {
    const t = await Diagnose.findByIdAndRemove(req.params.id);
    return res.status(200).send(t);
});

exports.removePrescription = asyncMiddleware(async (req, res) => {
    const t = await Prescription.findByIdAndRemove(req.params.id);
    return res.status(200).send(t);
});