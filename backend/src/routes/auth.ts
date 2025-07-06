import express from "express"
import { authenticate } from "../middleware/auth"
import { login } from "../controller/auth.controller"
import {verify} from "../controller/auth.controller"

const router = express.Router()

router.post("/login",login )
router.get("/verify", authenticate, verify)
export default router
