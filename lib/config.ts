// import dotenv from "dotenv"
// dotenv.config()
export const BACKEND_URL=process.env.BACKEND_URL || "https://parlour-dashboard-83dz.onrender.com"
if(!BACKEND_URL) throw new Error
console.log(BACKEND_URL);