"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const Employee_1 = __importDefault(require("../models/Employee"));
const Task_1 = __importDefault(require("../models/Task"));
dotenv_1.default.config();
const seedDatabase = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/parlour-admin");
        console.log("Connected to MongoDB");
        // Clear existing data
        await User_1.default.deleteMany({});
        await Employee_1.default.deleteMany({});
        await Task_1.default.deleteMany({});
        // Create users
        const superAdmin = new User_1.default({
            name: "Super Admin",
            email: "superadmin@parlour.com",
            password: "admin123",
            role: "SUPER_ADMIN",
        });
        const admin = new User_1.default({
            name: "Admin User",
            email: "admin@parlour.com",
            password: "admin123",
            role: "ADMIN",
        });
        await superAdmin.save();
        await admin.save();
        // Create employees
        const employees = [
            {
                name: "Sarah Johnson",
                email: "sarah@parlour.com",
                phone: "+1234567890",
                position: "Hair Stylist",
                department: "Hair Care",
            },
            {
                name: "Emily Davis",
                email: "emily@parlour.com",
                phone: "+1234567891",
                position: "Nail Technician",
                department: "Nail Care",
            },
            {
                name: "Jessica Wilson",
                email: "jessica@parlour.com",
                phone: "+1234567892",
                position: "Esthetician",
                department: "Skin Care",
            },
            {
                name: "Amanda Brown",
                email: "amanda@parlour.com",
                phone: "+1234567893",
                position: "Massage Therapist",
                department: "Wellness",
            },
            {
                name: "Rachel Green",
                email: "rachel@parlour.com",
                phone: "+1234567894",
                position: "Receptionist",
                department: "Front Desk",
            },
        ];
        const savedEmployees = await Employee_1.default.insertMany(employees);
        // Create tasks
        const tasks = [
            {
                title: "Prepare treatment room",
                description: "Clean and sanitize treatment room for next client",
                assignedTo: savedEmployees[0]._id,
                priority: "HIGH",
                dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
                createdBy: superAdmin._id,
            },
            {
                title: "Inventory check",
                description: "Check nail polish inventory and reorder if needed",
                assignedTo: savedEmployees[1]._id,
                priority: "MEDIUM",
                dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
                createdBy: superAdmin._id,
            },
            {
                title: "Client consultation",
                description: "Prepare consultation materials for new client",
                assignedTo: savedEmployees[2]._id,
                priority: "LOW",
                dueDate: new Date(Date.now() + 72 * 60 * 60 * 1000),
                createdBy: superAdmin._id,
            },
        ];
        await Task_1.default.insertMany(tasks);
        console.log("Database seeded successfully!");
        console.log("Login credentials:");
        console.log("Super Admin: superadmin@parlour.com / admin123");
        console.log("Admin: admin@parlour.com / admin123");
        process.exit(0);
    }
    catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};
seedDatabase();
//# sourceMappingURL=seed.js.map