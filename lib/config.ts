// import dotenv from "dotenv"
// dotenv.config()
export const BACKEND_URL=process.env.BACKEND_URL || "http://localhost:5000"
if(!BACKEND_URL) throw new Error
console.log(BACKEND_URL);