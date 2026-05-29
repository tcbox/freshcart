import { Request, Response } from "express";
import { authService } from "../services/authService";

export const authController = {
  // 1. User Registration Handler
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, phone, password, firstName, lastName } = req.body;

      // Basic fail-fast input check (Zod validator full integration layout later stage)
      if (!email || !phone || !password) {
        res.status(400).json({
          success: false,
          message: "Email, phone, and password are strictly required!",
        });
        return;
      }

      // Trigger business process layer
      const user = await authService.registerUser(
        email,
        phone,
        password,
        firstName,
        lastName,
      );

      // System Success Output Response (Never return passwordHash to client!)
      res.status(201).json({
        success: true,
        message: "User registered successfully!",
        data: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    } catch (error: unknown) {
      console.error("❌ Registration Controller Error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Internal registration pipeline error.";

      res.status(400).json({
        success: false,
        message,
      });
    }
  },
};
