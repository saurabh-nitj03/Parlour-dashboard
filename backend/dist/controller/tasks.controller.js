"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const schemas_1 = require("../schemas");
const getTasks = async (req, res) => {
    try {
        const tasks = await Task_1.default.find().populate("assignedTo", "_id name").populate("createdBy", "name").sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error ocurred"
        });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    try {
        const validationResult = schemas_1.taskSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(500).json({
                success: false,
                message: "Schema Validation failed",
                errors: validationResult.error.errors
            });
        }
        const task = new Task_1.default({ ...validationResult.data, createdBy: req.user._id, });
        await task.save();
        const populatedTask = await Task_1.default.findById(task._id).populate("assignedTo", "name").populate("createdBy", "name");
        res.status(200).json({
            success: true,
            message: 'Task added successfully',
            populatedTask
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error ocurred at adding task"
        });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    try {
        const validationResult = schemas_1.taskSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validationResult.error.errors
            });
        }
        const populatedTask = await Task_1.default.findByIdAndUpdate(req.params.id, validationResult.data, { new: true, runValidators: true })
            .populate("assignedTo", "name")
            .populate("createdBy", "name");
        if (!populatedTask) {
            return res.status(500).json({
                success: false,
                message: "Task not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Task added successfully",
            populatedTask
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error ocurred while updating"
        });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const task = await Task_1.default.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(500).json({
                success: false,
                message: "Task not found with this id"
            });
        }
        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
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
exports.deleteTask = deleteTask;
//# sourceMappingURL=tasks.controller.js.map