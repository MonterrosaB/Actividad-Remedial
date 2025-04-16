import express from "express";
import doctorController from "../controllers/doctorController.js"

const router = express.Router()

router.route("/")
.get(doctorController.getDoctors)
.post(doctorController.createtDoctor)

router.route("/:id")
.put(doctorController.updateDoctor)
.delete(doctorController.deleteDoctor)

export default router;