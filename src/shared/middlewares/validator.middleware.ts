import type { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';
import { ApiError } from "../utils/error.util.js";
import { HTTP_STATUS } from "../config/constants.js";

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err: { msg: any; }) => err.msg);
   throw new ApiError( errorMessages.join(', ') ,HTTP_STATUS.BAD_REQUEST);
  }

  next();
};