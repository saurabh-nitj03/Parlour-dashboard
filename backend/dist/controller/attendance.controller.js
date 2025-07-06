"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentAttendance = exports.punchAttendance = exports.getEmployees = void 0;
const Employee_1 = __importDefault(require("../models/Employee"));
const Attendance_1 = __importDefault(require("../models/Attendance"));
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee_1.default.find({ status: "ACTIVE" });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const employeesWithStatus = await Promise.all(employees.map(async (employee) => {
            const lastAttendance = await Attendance_1.default.findOne({
                employee: employee._id,
                updatedAt: { $gte: today },
            }).sort({ updatedAt: -1 });
            return {
                _id: employee._id,
                name: employee.name,
                email: employee.email,
                phone: employee.phone,
                position: employee.position,
                department: employee.department,
                joinDate: employee.updatedAt,
                status: employee.status,
                isPresent: lastAttendance?.action === "IN",
                lastPunchTime: lastAttendance?.updatedAt,
            };
        }));
        // console.log(employeesWithStatus);
        res.status(200).json({
            success: true,
            message: "Attendance of employees fetched",
            employeesWithStatus
        });
    }
    catch (error) {
        console.error("Get attendance employees error:", error);
        res.status(500).json({
            success: false,
            message: "Some error occurred"
        });
    }
};
exports.getEmployees = getEmployees;
const punchAttendance = async (req, res) => {
    try {
        const { employeeId, action } = req.body;
        const employee = await Employee_1.default.findById(employeeId);
        if (!employee) {
            return res.status(500).json({
                success: false,
                message: "Employee does not exist"
            });
        }
        // console.log("Employee" + employee);
        const attendance = new Attendance_1.default({
            employee: employeeId,
            action,
        });
        // console.log(attendance);
        await attendance.save();
        const io = req.app.get("io");
        if (io) {
            io.emit("attendance-update", {
                _id: attendance._id,
                employee: {
                    name: employee.name,
                    position: employee.position,
                    _id: employee._id
                },
                action,
                timestamp: attendance.updatedAt,
            });
        }
        res.status(200).json({
            success: true,
            message: "Attendance recorded successfully",
            timestamp: attendance.updatedAt,
        });
    }
    catch (error) {
        console.error("Punch error:", error);
        res.status(500).json({
            success: false,
            message: "Some error occurred"
        });
    }
};
exports.punchAttendance = punchAttendance;
const recentAttendance = async (req, res) => {
    try {
        const records = await Attendance_1.default.find().populate("employee", "name position").sort({ updatedAt: -1 }).limit(10);
        // console.log(records);
        res.status(200).json({
            success: true,
            message: "Last 10 records fetched",
            records
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred at getting request"
        });
    }
};
exports.recentAttendance = recentAttendance;
//# sourceMappingURL=attendance.controller.js.map