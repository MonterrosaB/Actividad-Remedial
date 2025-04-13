/*
nombre, edad, correo, contrasena, telefono, verificación
*/

import { Schema, model } from "mongoose";

const patientModel = new Schema({
    name: {
        type : Date,
        required : true
    },
    age : {
        type : String
    },
    email :  {
        type : String,
        required : true
    },
    password :  {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    isVerified : {
        type : Boolean,
        required : true
    }
},
{
    timestamps : true,
    strict : false
}); 

export default model ("Patient", patientModel)