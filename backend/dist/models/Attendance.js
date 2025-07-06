"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Employee_1 = __importDefault(require("./Employee"));
const attendanceSchema = new mongoose_1.default.Schema({
    employee: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: Employee_1.default,
        required: true,
    },
    action: {
        type: String,
        enum: ["IN", "OUT"],
        required: true,
    },
}, { timestamps: true });
const Attendance = mongoose_1.default.model("Attendance", attendanceSchema);
exports.default = Attendance;
//# sourceMappingURL=Attendance.js.map