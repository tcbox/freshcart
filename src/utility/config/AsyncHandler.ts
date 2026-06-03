import { NextFunction, Request, Response } from "express";
type AsyncHandlerType<T> = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<T>;

export const asyncHandler = <T>(fn: AsyncHandlerType<T>) => {
  // ikkada  fn ni tisukoni
  // next return chestundhi using express req,res,next tho
  return (req: Request, res: Response, next: NextFunction) => {
    // ippude a fn() ni 1st try chestadhi, if error oste next block lo catch chestadhi...
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
