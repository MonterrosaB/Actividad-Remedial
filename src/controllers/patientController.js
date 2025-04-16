import patientModel from "../models/patientModel.js";

import jsonweb from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nmailer from "nodemailer";
import crypto from "crypto";
import { config } from "../config.js";

const patientController = {};

patientController.getPatients = async (req, res) => {
    const patients = await patientModel.find();
    res.json(patients)
}

//Insert
patientController.createtPatient = async (req, res) => {
    const {
        name,
        age,
        email,
        password,
        phoneNumber,
        isVerified
    } = req.body;

    try {
        const patientExists = await patientModel.findOne({ email })

        if (patientExists) {
            return res.json({ message: "Patient already exists." })
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const newPatient = new patientModel({
            name,
            age,
            email,
            password: passwordHashed,
            phoneNumber,
            isVerified: isVerified || false
        })

        await newPatient.save()

        const verificationCode = crypto.randomBytes(3).toString("hex");
        const expiresAt = Date.now() + 2 * 60 * 60 * 1000;

        //Token
        const tokenCode = jsonweb.sign({
            email,
            verificationCode,
            expiresAt
        },
            //Secreto
            config.JWT.SECRET,
            { expiresIn: config.JWT.EXPIRES }
        );

        res.cookie("verificationToken", tokenCode, {
            maxAge: 2 * 60 * 60 * 1000
        });

        //EnviarCorreo

        const transporter = nmailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.MAIL.USER,
                pass: config.MAIL.PASSWORD
            },
            tls: {
                rejectUnauthorized: false, // ⚠️ Solo usar en desarrollo
            },
        })

        const mailOptions = {
            from: config.MAIL.USER,
            to: email,
            subject: "MAIL VERIFICATION",
            html: `<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #4CAF50;">Verify Your Email Address</h2>
            <p>Hi there,</p>
            <p>Thank you for registering. Please use the verification code below to complete your sign-up:</p>
            <div style="text-align: center; margin: 20px 0;">
                <span style="font-size: 24px; font-weight: bold; background-color: #f0f0f0; padding: 10px 20px; border-radius: 5px; display: inline-block; text-transform: uppercase;">
                    ${verificationCode}
                </span>
            </div>
            <p>If you didn’t request this, you can safely ignore this email.</p>
            <p style="color: #777;">Best regards,<br>Your Company Team</p>
        </div>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log("error: " + error);
            res.json({ message: "Email sent" })
        })

        res.json({ message: "Patient registered. Please verify your email." })

    } catch (error) {
        res.json({ message: "error: " + error })
    }
}

//Delete
patientController.deletePatient = async (req, res) => {
    await patientModel.findOneAndDelete(req.params.id)
    res.json({ message: "Patient deleted" })
}
//Update
patientController.updatePatient = async (req, res) => {
    const { 
        name,
        age,
        email,
        password,
        phoneNumber,
        isVerified
     } = req.body;

    await patientModel.findByIdAndUpdate(req.params.id, {
        name,
        age,
        email,
        password,
        phoneNumber,
        isVerified
    } , {new : true});

    res.json({message : "Patient Updated"}) 
}

//Verificación 
patientController.verifyCodeEmail = async (req, res) => {
    const { verificationCode } = req.body;

    const token = req.cookies.verificationCode;

    if (!token) {
        return res.json({ message: "You must sign up" })
    }

    try {
        const decode = jsonweb.verify(token, config.JWT.SECRET)
        const { email, verificationCode: storeCode } = decode;

        if (verificationCode !== storeCode) {
            return res.json({ message: "Invalid Verification Code" })
        }

        const patient = await patientModel.findOne({ email })

        if (!patient) {
            return res.json({ message: "Patient not found" })
        }

        patientModel.isVerified = true;

        await patient.save();

        res.clearCookies("verificationCode");
        res.json({ message: "email verified" })
    } catch (error) {
        res.json({ message: "error: " + error })
    }
}

export default patientController;