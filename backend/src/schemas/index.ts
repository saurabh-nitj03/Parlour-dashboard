import { z } from "zod"

export const employeeSchema = z.object({
  name: z.string().min(1, {message:"Name is required"}).max(20,{message:"Name can be at max of 20 Characters"}),
  email: z.string().email({message : "Invalid email address"}).max(30,{message:"Email can be at max of 30 Characters"}),
  phone: z.string().min(1, {message: "Phone is required"}).max(10,{message:"Phone can be at max of 10 Characters"}),
  position: z.string().min(1,{message: "Position is required"}).max(20,{message:"Position can be at max of 20 Characters"}),
  department: z.string().min(1,{message: "Department is required"}).max(20,{message:"Department can be at max of 20 Characters"}),
  status: z.enum(["ACTIVE", "INACTIVE"]),
})

export type EmployeeFormData = z.infer<typeof employeeSchema>

export const taskSchema = z.object({
  title: z.string().min(1, {message:"Title is required"}).max(20,{message:"Title can be at max of 20 Characters"}),
  description: z.string().min(1, {message:"Description is required"}).max(30,{message:"Description can be at max of 30 Characters"}),
  assignedTo: z.string().min(1, {message: "Please select an employee"}),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
  dueDate: z.string().min(1, "Due date is required"),
})

export type TaskFormData = z.infer<typeof taskSchema>

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").max(30,{message:"Email can be at max of 30 Characters"}),
  password: z.string().min(1, "Password is required").max(20,{message:"Password can be at max of 20 Characters"}),
})

export type LoginFormData = z.infer<typeof loginSchema>
