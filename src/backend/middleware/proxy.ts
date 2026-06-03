import { ApiError } from "@/src/utility/config/AppError";
import { Request, Response, NextFunction } from "express";

// IDI MIDDLEWARE FUNCTION
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Okavela vachina error nuvvu create chesina 'ApiError' aithe, daantlo unna STATUS_CODE ni teeskuntundi
  let statusCode = err.STATUS_CODE || 500;
  let message = err.message || "Internal Server Error";

  // Actual ga client ki response pampedhi ee middleware function ey!
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
