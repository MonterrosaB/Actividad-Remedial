import express, { Router } from "express";
import doctorController from "../controllers/doctorController.js"

const router = express.Router()

router.route("/")
.get()
.post()

router.route("/:id")
.put()
.delete()

export default Router;