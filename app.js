import express from "express";
import cookieParser from "cookie-parser";

import doctorR from "./src/routes/doctor.js" 
import patientR from "./src/routes/patient.js" 
import appointmentR from "./src/routes/appointment.js" 

import loginR from "./src/routes/login.js" 
import logoutR from "./src/routes/logout.js" 

const app = express();

app.use(cookieParser())

app.use(express.json());

app.use("/api/doctors", doctorR);
app.use("/api/patients", patientR);
app.use("/api/appointments", appointmentR);

app.use("/api/login", loginR);
app.use("/api/logout", logoutR);



export default app;