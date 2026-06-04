import { Router } from "express";
import { authController } from "../controllers/authControllers";
import { validateRequest } from "../middleware/validate";
import { registerSchema } from "@/src/utility/validations/authValidation";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Register endpoint
router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register,
);

// Login endpoint
router.post("/login", authController.login);

// Logout endpoint
router.post("/logout", authController.logout);

// Get current user info
router.get("/me", authMiddleware, authController.getMe);

export default router;
