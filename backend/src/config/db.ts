import mongoose from "mongoose"

const db = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/parlour-admin")
    console.log("MongoDB Connected")
  } catch (error) {
    console.error("Database connection error:", error)
    return 
  }
}

export default db
