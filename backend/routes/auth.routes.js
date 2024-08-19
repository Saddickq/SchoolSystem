import { Router } from "express";
import userAuth from "../controllers/auth.controller.js"

const router = Router()

router.post("/auth/signin", userAuth.signIn)

export default router;