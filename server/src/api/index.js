const express = require("express");
const router = express.Router();

//controllers
const authController = require('../controllers/auth.controller')
const sentencesController = require('../controllers/sentences.controller')
const medicineController = require('../controllers/medicine.controller')
const filesController = require('../controllers/files.controller')
const libraryController = require('../controllers/library.controller')
const patientController = require('../controllers/patient.controller')
const appointmentController = require('../controllers/appointment.controller')
//middleware
const validate = require('../middleware/validation.middleware')
const { uploadFiles } = require("../middleware/fileUpload");
const { uploadFilesCk } = require("../middleware/fileUploadCk");
const checkAuthorization = require('../middleware/auth.check.middleware')
//validation
const userLoginValidaton = require('../validations/user.login.validation')
const createSentenceValidaton = require('../validations/sentence.create.validation')
const createMedicineValidaton = require('../validations/medicine.create.validation')
const profileValidaton = require('../validations/profile.validation')

//dummy registration
// router.post("/register", authController.register);

//login with email/password
router.post("/login", validate(userLoginValidaton), authController.login);

router.put("/profile", checkAuthorization, validate(profileValidaton), authController.UpdateProfile);
router.get("/profile", checkAuthorization, authController.profile);


//-- sentences
// list
router.get("/sentences/list", checkAuthorization, sentencesController.list);
// create new
router.post("/sentences", validate(createSentenceValidaton), sentencesController.add);
// update
router.put("/sentences/:id", validate(createSentenceValidaton), sentencesController.update);
// remove
router.delete("/sentences", checkAuthorization, sentencesController.remove);


//-- medicines
// list
router.get("/medicines/list", checkAuthorization, medicineController.list);
// create new
router.post("/medicines", checkAuthorization, validate(createMedicineValidaton), medicineController.add);
// update
router.put("/medicines/:id", checkAuthorization, validate(createMedicineValidaton), medicineController.update)
router.delete("/medicines", checkAuthorization,  medicineController.remove);


//-- patient
// create
router.post("/patients", checkAuthorization, patientController.add);
// list
router.get("/patients", checkAuthorization, patientController.list);
// list
router.get("/patients/:id", checkAuthorization, patientController.item);

//-- appointments
// create
router.post("/appointments", checkAuthorization, appointmentController.add);
// update
router.put("/appointments/:id", checkAuthorization, appointmentController.update);
// list
router.get("/appointments/list", checkAuthorization, appointmentController.list);
// upcoming
router.get("/appointments/upcoming", checkAuthorization, appointmentController.upcoming);
// get single 
router.get("/appointments/single/:id", checkAuthorization, appointmentController.single);

//-- files
// upload new
router.post("/files", checkAuthorization, uploadFiles, filesController.upload);
// upload new
router.post("/upload", checkAuthorization, uploadFilesCk, filesController.upload);
// upload new
router.post("/drawings", checkAuthorization, uploadFiles, filesController.drawing);

router.get("/drawings", checkAuthorization, filesController.drawingList);
// delete files
router.post("/files/remove", checkAuthorization, filesController.remove);

//-- library
router.get("/library", checkAuthorization, libraryController.list);
router.get("/category", checkAuthorization, libraryController.listCategory);

router.post("/prescription", checkAuthorization, libraryController.createPrescription);
router.post("/consultation", checkAuthorization, libraryController.createConsultation);
router.post("/treatment", checkAuthorization, libraryController.createTreatment);
router.post("/diagnose", checkAuthorization, libraryController.createDiagnose);

router.get("/consultation/:id", checkAuthorization, libraryController.getConsultation);
router.get("/treatment/:id", checkAuthorization, libraryController.getTreatment);
router.get("/diagnose/:id", checkAuthorization, libraryController.getDiagnose);
router.get("/prescription/:id", checkAuthorization, libraryController.getPrescription);

router.put("/consultation/:id", checkAuthorization, libraryController.updateConsultation);
router.put("/treatment/:id", checkAuthorization, libraryController.updateTreatment);
router.put("/diagnose/:id", checkAuthorization, libraryController.updateDiagnose);
router.put("/prescription/:id", checkAuthorization, libraryController.updatePrescription);

router.delete("/consultation/:id", checkAuthorization, libraryController.removeConsultation);
router.delete("/treatment/:id", checkAuthorization, libraryController.removeTreatment);
router.delete("/diagnose/:id", checkAuthorization, libraryController.removeDiagnose);
router.delete("/prescription/:id", checkAuthorization, libraryController.removePrescription);



module.exports = router;