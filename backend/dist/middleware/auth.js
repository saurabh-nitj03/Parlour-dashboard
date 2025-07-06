"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(500).json({
                success: false,
                message: "No token present"
            });
        }
        // console.log(token)
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "NO JWT found"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await User_1.default.findById(decoded.userId).select("-password");
        //  console.log(decoded); 
        //  console.log(user);
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Token is not valid"
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Token is invalid"
        });
    }
};
exports.authenticate = authenticate;
const authorize = (role) => {
    return (req, res, next) => {
        if (role !== req.user.role) {
            return res.status(500).json({
                success: false,
                message: "Access denied"
            });
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map