import dotenv from "dotenv"

dotenv.config()

export const config = {
    DB : {
        URI : process.env.DB_URI

    },
    SERVER : {
        PORT : process.env.PORT
    },
    JWT : {
        SECRET : process.env.JWT_SECRET, 
        EXPIRES : process.env.JWT_EXPIRES
    },
    MAIL : {
        USER : process.env.USER,
        PASSWORD : process.env.PASSWORD
    } 
}