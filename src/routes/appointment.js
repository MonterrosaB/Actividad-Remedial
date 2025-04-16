import express from "express";
import appointmentController from "../controllers/appointmentController.js"

const router = express.Router()

router.route("/")
.get(appointmentController.getAppointments)
.post(appointmentController.creareAppointment)

router.route("/:id")
.put(appointmentController.updateAppointment)
.delete(appointmentController.deleteAppointment)

export default router;