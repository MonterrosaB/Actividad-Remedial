//Archivos
import doctorModel from "../models/doctorModel.js";
import { config } from "../config.js";

//Librerías
import jsonweb from "jsonwebtoken";
import bcrypt from "bcryptjs";

const doctorController = {};

//Select

doctorController.getDoctors = async (req, res) => {
    const doctors = await doctorModel.find();
    res.json(doctors)
}

//Insert
doctorController.createtDoctor = async (req, res) => {
    const {
        name,
        specialty,
        email,
        password
    } = req.body;

    try {
        const doctorExists = await doctorModel.findOne({ email })

        if (doctorExists) {
            return res.json({ message: "Doctor already exists." })
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const newDoctor = new doctorModel({
            name,
            specialty,
            email,
            password: passwordHashed
        })

        await newDoctor.save()

        jsonweb.sign(
            { id: newDoctor._id },
            config.JWT.SECRET,
            { expiresIn: config.JWT.EXPIRES },
            (error, token) => {
                if (error) console.log("error: " + error);
                res.cookie("authToken", token);
                res.json({ message: "Doctor saved" })

            }
        )
    } catch (error) {
        res.json({ message: "error: " + error })
    }
}

//Delete
doctorController.deleteDoctor = async (req, res) => {
    await doctorModel.findOneAndDelete(req.params.id)
    res.json({ message: "Doctor deleted" })
}
//Update
doctorController.updateDoctor = async (req, res) => {
    const { name, specialty, email, password } = req.body;

    await doctorModel.findByIdAndUpdate(req.params.id, {
        name,
        specialty,
        email,
        password
    }, {new : true});

    res.json({message : "Doctor Updated"}) 

}
export default doctorController;