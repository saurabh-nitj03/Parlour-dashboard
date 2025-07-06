import express from "express"
import { authenticate } from "../middleware/auth"
import { getStats } from "../controller/dashboard.controller"

const router = express.Router()
router.get("/stats",authenticate,getStats)
export default router
