import express from "express"
import { authenticate, authorize } from "../middleware/auth"
import { getEmployees } from "../controller/attendance.controller"
import { createEmployee, deleteEmployee, updateEmployee } from "../controller/employees.controller"

const router = express.Router()
router.get("/", authenticate,getEmployees)
router.post("/", authenticate, authorize("SUPER_ADMIN"),createEmployee)
router.put("/:id", authenticate, authorize("SUPER_ADMIN"),updateEmployee)
router.delete("/:id",authenticate, authorize("SUPER_ADMIN"),deleteEmployee)

export default router
