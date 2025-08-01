import express from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  updatePassword,
  updateProfile,
} from "../controller/userController";

const userRouter = express.Router();

//Public Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

//private routes protect also
userRouter.get("/me", getCurrentUser);
userRouter.put("/profile", updateProfile);
userRouter.put("/password", updatePassword);
