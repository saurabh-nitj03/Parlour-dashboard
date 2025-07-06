"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployees = void 0;
const Employee_1 = __importDefault(require("../models/Employee"));
const schemas_1 = require("../schemas");
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee_1.default.find().sort({ updatedAt: -1 });
        res.status(200).json({
            success: true,
            message: "Employeees fetched successfully",
            employees
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error Occurred"
        });
    }
};
exports.getEmployees = getEmployees;
const createEmployee = async (req, res) => {
    try {
        const validationResult = schemas_1.employeeSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(500).json({
                success: false,
                message: "Schema Validation failed",
                errors: validationResult.error.errors
            });
        }
        const employee = new Employee_1.default(validationResult.data);
        await employee.save();
        res.status(200).json({
            success: true,
            message: "Employee is added",
            employee
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error ocurred while add employees"
        });
    }
};
exports.createEmployee = createEmployee;
const updateEmployee = async (req, res) => {
    try {
        const validationResult = schemas_1.employeeSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(500).json({
                success: false,
                message: "Schema Validation failed",
                errors: validationResult.error.errors
            });
        }
        const employee = await Employee_1.default.findByIdAndUpdate(req.params.id, validationResult.data, { new: true, runValidators: true });
        if (!employee) {
            return res.status(500).json({
                success: false,
                message: "Employee not found with this id"
            });
        }
        res.status(200).json({
            success: true,
            message: "Update done",
            employee
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error ocurred at updating employees"
        });
    }
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee_1.default.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(500).json({
                success: false,
                message: "Employee not found with this id"
            });
        }
        res.status(200).json({
            success: false,
            message: "Employee deleted successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Some error ocurred at Deleting employee" });
    }
};
exports.deleteEmployee = deleteEmployee;
//# sourceMappingURL=employees.controller.js.map