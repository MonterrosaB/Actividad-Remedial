/*
    fecha, hora, motivo, doctorAsignado, pacienteAsignado
    
*/

import { Schema, model } from "mongoose";

const appointmentModel = new Schema({
    date: {
        type : Date,
        required : true
    },
    time : {
        type : String
    },
    reason :  {
        type : String,
        required : true
    },
    asignedDoctor :  {
        type : Schema.Types.ObjectId,
        required : true
    },
    asignedPatient : {
        type : Schema.Types.ObjectId,
        required : true
    }
},
{
    timestamps : true,
    strict : false
}); 

export default model ("Appointment", appointmentModel)