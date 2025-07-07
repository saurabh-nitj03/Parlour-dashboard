"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = void 0;
const Employee_1 = __importDefault(require("../models/Employee"));
const Task_1 = __importDefault(require("../models/Task"));
const Attendance_1 = __importDefault(require("../models/Attendance"));
const getStats = async (req, res) => {
    try {
        const totalEmployees = await Employee_1.default.countDocuments({ status: "ACTIVE" });
        const totalTasks = await Task_1.default.countDocuments();
        const pendingTasks = await Task_1.default.countDocuments({ status: "PENDING" });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayAttendance = await Attendance_1.default.aggregate([
            {
                $match: { updatedAt: { $gte: today }, },
            },
            { $sort: { updatedAt: -1 }, },
            {
                $group: {
                    _id: "$employee",
                    lastAction: { $first: "$action" },
                },
            },
            { $match: { lastAction: "IN", }, },
        ]);
        const presentToday = todayAttendance.length;
        res.status(200).json({
            success: true,
            message: "Dashboard stats fetched successfully",
            stats: {
                totalEmployees,
                totalTasks,
                pendingTasks
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred"
        });
    }
};
exports.getStats = getStats;
//# sourceMappingURL=dashboard.controller.js.map
