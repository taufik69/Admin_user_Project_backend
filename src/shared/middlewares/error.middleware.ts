
import type { Response } from "express";
import { logger } from "../config/logger.config.ts";
import { ApiResponse } from "../utils/apiResponse.util.ts";



export const errorHandler = (err: { statusCode: number; status: string; message: string; stack: any; isOperational: any; }, req: { originalUrl: any; method: any; }, res: Response<any, Record<string, any>>, next: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });
  // Development error
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      success: false,
      error: err,
    
      message: err.message,
      stack: err.stack,
    });
  }

  // Production error
  if (err.isOperational) {
    ApiResponse.error(res, err.statusCode, err.message);
   
  } else {
    // Programming or unknown error
    console.error("ERROR HANDLER", err);
    ApiResponse.error(res, 500, "Something went very wrong!");
  }
};

export const notFound = (req:any, res:Response, next: (arg0: Error) => void) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};