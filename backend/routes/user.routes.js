import { Router } from "express";
import userCtrl from "../controllers/user.controller.js"

const router = Router()

router.post("/api/users", userCtrl.registerUser)

export default router;