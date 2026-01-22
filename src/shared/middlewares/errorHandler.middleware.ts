
import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/error.util.js';
import { HTTP_STATUS } from '../config/constants.js';
import { env } from '../config/env.js';


export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let isOperational = false;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    isOperational = err.isOperational;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Validation Error';
  }

  // Mongoose Duplicate Key Error
  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    message = 'Duplicate field value entered';
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Token expired';
  }

  // Log error in development
  if (env.NODE_ENV === 'development') {
    console.error('❌ Error:', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};