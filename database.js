import dotenv from "dotenv";
import mongoose from "mongoose";
import { config } from "./src/config.js";

dotenv.config();

mongoose.connect(config.DB.URI);

const connection = mongoose.connection()

connection.once("open", () => {
    console.log("DB is connected");
})

connection.once("disconnected", () => {
    console.log("DB is disconnected");
})

connection.once("error", (error) =>{
    console.log("Error Found: "+ error);
})