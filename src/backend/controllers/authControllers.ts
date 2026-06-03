import { Request, Response } from "express";
import { authService } from "../services/authService";
import { asyncHandler } from "@/src/utility/config/AsyncHandler";

export const register = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, phone, password, firstName, lastName } = req.body;

    if (!email || !phone || !password) {
      res.status(400).json({
        success: false,
        message: "Email, phone, and password are strictly required!",
      });
      return;
    }

    const user = await authService.registerUser({
      email,
      phone,
      passwordPlain: password,
      firstName,
      lastName,
    });

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
  },
);
