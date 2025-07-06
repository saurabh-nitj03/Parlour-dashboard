"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Employee_1 = __importDefault(require("./Employee"));
const User_1 = __importDefault(require("./User"));
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedTo: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: Employee_1.default,
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: User_1.default,
        required: true,
    },
}, { timestamps: true });
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
//# sourceMappingURL=Task.js.map