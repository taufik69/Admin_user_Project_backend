import type { NextFunction, Request, Response } from "express";

export const asyncHandler = (fn: (arg0: any, arg1: any, arg2: any) => any) => {
  return (req: Request, res: Response, next: NextFunction ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};