"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const tasks_controller_1 = require("../controller/tasks.controller");
const router = express_1.default.Router();
router.get("/", auth_1.authenticate, tasks_controller_1.getTasks);
router.post("/", auth_1.authenticate, (0, auth_1.authorize)("SUPER_ADMIN"), tasks_controller_1.createTask);
router.put("/:id", auth_1.authenticate, (0, auth_1.authorize)("SUPER_ADMIN"), tasks_controller_1.updateTask);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)("SUPER_ADMIN"), tasks_controller_1.deleteTask);
exports.default = router;
//# sourceMappingURL=tasks.js.map