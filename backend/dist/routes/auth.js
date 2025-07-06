"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const auth_controller_1 = require("../controller/auth.controller");
const auth_controller_2 = require("../controller/auth.controller");
const router = express_1.default.Router();
router.post("/login", auth_controller_1.login);
router.get("/verify", auth_1.authenticate, auth_controller_2.verify);
exports.default = router;
//# sourceMappingURL=auth.js.map