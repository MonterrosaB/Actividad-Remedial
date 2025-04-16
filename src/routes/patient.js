import express from "express";
import patientController from "../controllers/patientController.js"

const router = express.Router()

router.route("/")
.get(patientController.getPatients)
.post(patientController.createtPatient)

router.route("/:id")
.put(patientController.updatePatient)
.delete(patientController.deletePatient)

router.route("/verifyCodeEmail").post(patientController.verifyCodeEmail)


export default router;