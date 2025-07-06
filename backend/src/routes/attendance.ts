import express from "express"
import { authenticate } from "../middleware/auth"
import { getEmployees, punchAttendance, recentAttendance } from "../controller/attendance.controller"

const router = express.Router()

router.get("/employees",getEmployees)
router.post("/punch",punchAttendance )
router.get("/recent", authenticate,recentAttendance )

export default router
