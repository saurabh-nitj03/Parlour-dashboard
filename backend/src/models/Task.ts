import mongoose from "mongoose"
import Employee from "./Employee"
import User from "./User"
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Employee,
      required: true,
    },
      status: {
        type: String,
        enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
        default: "PENDING",
      },
      dueDate: {
          type: Date,
          required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true,
          },
        },{ timestamps: true},
      )
      const Task=mongoose.model("Task",taskSchema);
      export default Task