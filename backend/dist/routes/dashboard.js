"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const dashboard_controller_1 = require("../controller/dashboard.controller");
const router = express_1.default.Router();
router.get("/stats", auth_1.authenticate, dashboard_controller_1.getStats);
exports.default = router;
//# sourceMappingURL=dashboard.js.map