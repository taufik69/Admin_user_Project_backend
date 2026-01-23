import express from "express";
const router = express.Router();
import { userController } from "./user.controller.ts";

router.route("/getallusers").get(userController.getAllUsers);

export const userRoute = router;
