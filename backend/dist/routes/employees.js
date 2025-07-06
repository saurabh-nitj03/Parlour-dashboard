"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const attendance_controller_1 = require("../controller/attendance.controller");
const employees_controller_1 = require("../controller/employees.controller");
const router = express_1.default.Router();
router.get("/", auth_1.authenticate, attendance_controller_1.getEmployees);
router.post("/", auth_1.authenticate, (0, auth_1.authorize)("SUPER_ADMIN"), employees_controller_1.createEmployee);
router.put("/:id", auth_1.authenticate, (0, auth_1.authorize)("SUPER_ADMIN"), employees_controller_1.updateEmployee);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)("SUPER_ADMIN"), employees_controller_1.deleteEmployee);
exports.default = router;
//# sourceMappingURL=employees.js.map