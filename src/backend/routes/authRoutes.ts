import { Router } from "express";
import { authController } from "../controllers/authControllers";

const router = Router();

// Endpoint definitions: POST /api/auth/register
router.post("/register", authController.register);

export default router;
