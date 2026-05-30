import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      // Formats errors clearly to frontend client application profiles layout components targets
      res.status(400).json({
        success: false,
        message:
          "Request inputs schema parameter architecture payload verification checks criteria audit failed!",
        errors: result.error.format(),
      });
      return;
    }

    // Assign parsed data parameters safely back to req body sequence structure block configurations
    req.body = result.data;
    next();
  };
};
