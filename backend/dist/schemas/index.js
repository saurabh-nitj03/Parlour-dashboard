"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.taskSchema = exports.employeeSchema = void 0;
const zod_1 = require("zod");
exports.employeeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }).max(20, { message: "Name can be at max of 20 Characters" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }).max(30, { message: "Email can be at max of 30 Characters" }),
    phone: zod_1.z.string().min(1, { message: "Phone is required" }).max(10, { message: "Phone can be at max of 10 Characters" }),
    position: zod_1.z.string().min(1, { message: "Position is required" }).max(20, { message: "Position can be at max of 20 Characters" }),
    department: zod_1.z.string().min(1, { message: "Department is required" }).max(20, { message: "Department can be at max of 20 Characters" }),
    status: zod_1.z.enum(["ACTIVE", "INACTIVE"]),
});
exports.taskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title is required" }).max(20, { message: "Title can be at max of 20 Characters" }),
    description: zod_1.z.string().min(1, { message: "Description is required" }).max(30, { message: "Description can be at max of 30 Characters" }),
    assignedTo: zod_1.z.string().min(1, { message: "Please select an employee" }),
    status: zod_1.z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
    dueDate: zod_1.z.string().min(1, "Due date is required"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address").max(30, { message: "Email can be at max of 30 Characters" }),
    password: zod_1.z.string().min(1, "Password is required").max(20, { message: "Password can be at max of 20 Characters" }),
});
//# sourceMappingURL=index.js.map