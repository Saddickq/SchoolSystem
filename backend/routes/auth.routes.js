import { Router } from "express";
import AuthController from "../controllers/auth.controller.js"

const router = Router()

router.post("/api/v1/register-admin", AuthController.register)

router.post("/api/v1/login", AuthController.login)

router.get("/api/v1/logout", AuthController.logout)

export default router