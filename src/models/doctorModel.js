/*
    nombre, especialidad, correo, contrasena
    
*/

import { Schema, model } from "mongoose";

const doctorModel = new Schema({
    name: {
        type : String,
        required : true
    },
    specialty : {
        type : String
    },
    email :  {
        type : String,
        required : true
    },
    password :  {
        type : String,
        required : true
    }
},
{
    timestamps : true,
    strict : false
}); 

export default model ("Doctor", doctorModel)