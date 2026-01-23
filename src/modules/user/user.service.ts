import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/config/constants.ts";
import { ApiError } from "../../shared/utils/error.util.ts";
import { User } from "./user.model.ts";

class UserService {
  getAllUsers = async () => {
    const users = {
      ok: "ok",
    };
    // return ApiResponse.success(HTTP_STATUS.OK, ERROR_MESSAGES.SUCCESS, users);
    return users;
  };
}

export const userService = new UserService();
