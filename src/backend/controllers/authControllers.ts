import { Request, Response } from "express";
import { authService } from "../services/authService";
import { asyncHandler } from "@/src/utility/config/AsyncHandler";

export const authController = {
  register: asyncHandler(async (req: Request, res: Response): Promise<void> => {
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
  }),

  login: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required!",
      });
      return;
    }

    const result = await authService.loginUser(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      data: {
        user: result.user,
        token: result.token,
      },
    });
  }),

  logout: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful!",
    });
  }),

  getMe: asyncHandler(
    async (req: Request & { user?: any }, res: Response): Promise<void> => {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Not authenticated",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: req.user,
      });
    },
  ),
};
