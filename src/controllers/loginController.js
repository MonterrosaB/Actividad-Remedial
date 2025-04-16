import doctorModel from "../models/doctorModel.js";
import patientModel from "../models/patientModel.js";

import bcrypt from "bcryptjs";
import jsonweb from "jsonwebtoken";
import {config} from "../config.js"

const loginController = {};

loginController.login = async(req, res) =>{
    const {
        email,
        password
    } = req.body;

    try {
        //validamos los niveles (Paciente, Doctor)
        let userFound;
        let userType;

        const doctorLogin = await doctorModel.findOne({email});

        if (doctorLogin) {
            userFound = doctorLogin
            userType = "doctor";
        } else {
            userFound =await patientModel.findOne({email});  
            userType = "patient"
        }
        
        if(!userFound){
            return res.json({message: "User not found"})
        }

        //Validar contraseña
        if(userType !== ""){
            const isEqual = await bcrypt.compare(password, userFound.password)
            if(!isEqual){
                return res.json({message: "invalid password or user"})
            }
        }

        //TOKEN
        jsonweb.sign(
            //Que voy a guardar
            {id: userFound._id, userType},
             //Secreto
             config.JWT.SECRET,
             //Cuano expira
             {expiresIn: config.JWT.EXPIRES},
             //Función flecha
             (error, token) =>{
                 if(error) console.log("error en login: "+ error);
                 res.cookie("authToken", token)
                 res.json({message: "Login successful"})
             }
        )


    } catch (error) {
        console.log("error: "+ error);
        res.json({message: "error login"});
    }
}

export default loginController;