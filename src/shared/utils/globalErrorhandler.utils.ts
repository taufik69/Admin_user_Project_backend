import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.ts";

// this error show when you are working on production mode error size are more consize
const productionError = (error: any, res: Response) => {
  console.log("from production error funtion ", error);
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  } else {
    return res.status(error.statusCode).json({
      status: "error",
      message: "Something went wrong , please try agin later !!",
    });
  }
};
// this error only show when you are working on developement mode
const developementError = (error: any, res: Response) => {
  return res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
    status: error.status,
    isOperational: error.isOperationalError,
    data: error.data,
    errorStack: error.stack,
  });
};

export const globalErrorHandeler = (
  error: { statusCode: number },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error from Global Error Handler", error);
  error.statusCode = error.statusCode || 500;
  if (env.NODE_ENV == "developement") {
    developementError(error, res);
  } else if (env.NODE_ENV == "production") {
    productionError(error, res);
  }
};
