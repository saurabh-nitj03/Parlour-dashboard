import express from "express"
import { authenticate, authorize } from "../middleware/auth"
import { createTask, deleteTask, getTasks, updateTask } from "../controller/tasks.controller"

const router = express.Router()

router.get("/", authenticate,getTasks)
router.post("/", authenticate, authorize("SUPER_ADMIN"),createTask)
router.put("/:id", authenticate, authorize("SUPER_ADMIN"),updateTask)
router.delete("/:id", authenticate, authorize("SUPER_ADMIN"),deleteTask)

export default router
