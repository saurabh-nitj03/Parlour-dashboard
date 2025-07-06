import mongoose from "mongoose"
import Employee from "./Employee"

const attendanceSchema = new mongoose.Schema(
  { 
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Employee,
      required: true,
    },
    action: {
      type: String,
      enum: ["IN", "OUT"],
      required: true,
    },
  },{ timestamps: true}
)

const Attendance=mongoose.model("Attendance" , attendanceSchema);
export default Attendance
