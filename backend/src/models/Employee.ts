import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    joinDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },{ timestamps: true,}
)
const Employee=mongoose.model("Employee",employeeSchema);
export default Employee