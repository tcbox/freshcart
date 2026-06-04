import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "@/src/utility/config/env";
import { STATUS_CODE } from "@/src/utility/constants/constants";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: "admin" | "customer";
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(STATUS_CODE.UNAUTHORIZED).json({
        success: false,
        message: "No token found. Please login.",
      });
      return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (typeof decoded === "object" && decoded !== null) {
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    }

    next();
  } catch (error) {
    res.status(STATUS_CODE.UNAUTHORIZED).json({
      success: false,
      message: "Invalid token. Please login again.",
    });
  }
};

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(STATUS_CODE.FORBIDDEN).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
    return;
  }
  next();
};
