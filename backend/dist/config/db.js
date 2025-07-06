"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/parlour-admin");
        console.log("MongoDB Connected");
    }
    catch (error) {
        console.error("Database connection error:", error);
        return;
    }
};
exports.default = db;
//# sourceMappingURL=db.js.map