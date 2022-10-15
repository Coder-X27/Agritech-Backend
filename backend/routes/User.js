import express from "express";
import {
  addCrop,
  fetchAllCrops,
  login,
  logout,
  updateUser,
} from "../controller/User.js";
import { isAuthenticated } from "../middlewares/auth.js";
export const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/admin/update").put(isAuthenticated, updateUser);
userRouter.route("/crop/add").post(isAuthenticated,addCrop);
// userRouter.route("/crop/fetchcrops").get(isAuthenticated,fetchAllCrops);
userRouter.route("/crop/fetchcrops").get(fetchAllCrops);

