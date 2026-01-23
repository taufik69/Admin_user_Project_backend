import type { Request, Response } from "express";
import { userService } from "./user.service.ts";
import { asyncHandler } from "../../shared/utils/asyncHandler.util.ts";
import { ApiResponse } from "../../shared/utils/apiResponse.util.ts";
import { HTTP_STATUS } from "../../shared/config/constants.ts";

class UserController {
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    console.log("req", req);
    const data = await userService.getAllUsers();
    ApiResponse.success(
      res,
      HTTP_STATUS.OK,
      "Users retrieved successfully",
      data,
    );
  });
}

export const userController = new UserController();
