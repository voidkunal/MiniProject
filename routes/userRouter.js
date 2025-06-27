
import express from 'express';
import {
  getAllUsers,
  registerNewAdmin,
  updateAvatar
} from "../controllers/userController.js";

import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";
import { imageUpload } from "../middlewares/imageUpload.js";

const userRouter = express.Router();

// ✅ Add middleware here:
userRouter.post(
  "/add/new-Admin",
  isAuthenticated,
  isAuthorized("Admin"),
  imageUpload, // 👈 REQUIRED for req.files to work
  registerNewAdmin
);

userRouter.get("/all", isAuthenticated, isAuthorized("Admin"), getAllUsers);
userRouter.put("/update-avatar", isAuthenticated, imageUpload, updateAvatar);

export default userRouter;
