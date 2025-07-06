import { z } from "zod";
export declare const employeeSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    position: z.ZodString;
    department: z.ZodString;
    status: z.ZodEnum<["ACTIVE", "INACTIVE"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    position: string;
    phone: string;
    department: string;
    status: "ACTIVE" | "INACTIVE";
}, {
    name: string;
    email: string;
    position: string;
    phone: string;
    department: string;
    status: "ACTIVE" | "INACTIVE";
}>;
export type EmployeeFormData = z.infer<typeof employeeSchema>;
export declare const taskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    assignedTo: z.ZodString;
    status: z.ZodEnum<["PENDING", "IN_PROGRESS", "COMPLETED"]>;
    dueDate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    title: string;
    assignedTo: string;
    dueDate: string;
}, {
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    title: string;
    assignedTo: string;
    dueDate: string;
}>;
export type TaskFormData = z.infer<typeof taskSchema>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type LoginFormData = z.infer<typeof loginSchema>;
//# sourceMappingURL=index.d.ts.map