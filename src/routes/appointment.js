import express, { Router } from "express";
import appointmentController from "../controllers/appointmentController.js"

const router = express.Router()

router.route("/")
.get()
.post()

router.route("/:id")
.put()
.delete()

export default Router;