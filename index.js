import app from "./app.js";
import "./database.js";
import dotenv from "dotenv";
import { config } from "./src/config.js";

dotenv.config();

async function main() {
    const port = config.SERVER.PORT;
    app.listen(port);
    console.log("Server on port: " +config.SERVER.PORT);
}

main();
