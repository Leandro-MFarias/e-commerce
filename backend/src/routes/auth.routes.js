import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { logoutSession } from "../utils/jwt.js";
import {
  forgotPasswordController,
  registerUserController,
  resetPasswordController,
  signInController,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", signInController);
router.post("/logout", auth, logoutSession);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController)
export default router;
