import express, { Router } from "express";
import patientController from "../controllers/patientController.js"

const router = express.Router()

router.route("/")
.get()
.post()

router.route("/:id")
.put()
.delete()

export default Router;