import { Router } from "express";
import { authController } from "../controllers/authControllers";
import { validateRequest } from "../middleware/validate";
import { registerSchema } from "@/src/utility/validations/authValidation";

const router = Router();

// Endpoint definitions: POST /api/auth/register
router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register,
);
export default router;
