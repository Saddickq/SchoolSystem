import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/utils.js";

const router = Router();

router.get("/api/v1/profile", verifyToken, UserController.profile);

router.get(
  "/api/v1/profileFromToken/:invitationCode",
  verifyToken,
  UserController.profile
);

router.post("/api/v1/invite-user", UserController.inviteUser);

router.post(
  "/api/v1/activate-account/:invitationCode",
  verifyToken,
  UserController.activateAccount
);

export default router;
