"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.login = void 0;
const User_1 = __importDefault(require("../models/User"));
const schemas_1 = require("../schemas");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (req, res) => {
    try {
        const validationResult = schemas_1.loginSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(500).json({
                success: false,
                message: "Schema Validation failed",
                errors: validationResult.error.errors
            });
        }
        const { email, password } = validationResult.data;
        // console.log(email, password);
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "No user exists with this email"
            });
        }
        // console.log(user);
        // console.log(password,user.password);
        const isMatch = password === user.password;
        // console.log(isMatch)
        if (!isMatch) {
            return res.status(500).json({
                success: false,
                message: "Wrong Password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || "fallback-secret", { expiresIn: "7d" });
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some Internal error occurred"
        });
    }
};
exports.login = login;
const verify = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: " Error ocurred while verifying"
        });
    }
};
exports.verify = verify;
//# sourceMappingURL=auth.controller.js.map