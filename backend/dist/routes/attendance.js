"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const attendance_controller_1 = require("../controller/attendance.controller");
const router = express_1.default.Router();
router.get("/employees", attendance_controller_1.getEmployees);
router.post("/punch", attendance_controller_1.punchAttendance);
router.get("/recent", auth_1.authenticate, attendance_controller_1.recentAttendance);
exports.default = router;
//# sourceMappingURL=attendance.js.map