import type { Response } from 'express';

interface ApiResponseData {
  success: boolean;
  message: string;
  statusCode?: number;
  data?: any;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class ApiResponse {
  static success(res: Response, statusCode: number, message: string, data?: any) {
    const response: ApiResponseData = {
      success: true,
      statusCode,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  static error(res: Response, statusCode: number, message: string, data?: any) {
    const response: ApiResponseData = {
      success: false,
      message,
      statusCode,
      data,
    };
    return res.status(statusCode).json(response);
  }

  static paginated(
    res: Response,
    statusCode: number,
    message: string,
    data: any[],
    page: number,
    limit: number,
    total: number
  ) {
    const response: ApiResponseData = {
      success: true,
      message,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
    return res.status(statusCode).json(response);
  }
}