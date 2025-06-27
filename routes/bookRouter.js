
// import express from "express";
// import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";
// import upload from "../middlewares/fileUpload.js";
// import {
//   addBook,
//   getAllBooks,
//   deleteBook,
// } from "../controllers/bookController.js";

// const router = express.Router();

// router.post(
//   "/admin/add",
//   isAuthenticated,
//   isAuthorized("Admin"),
//   upload.single("file"), // accepts pdf/jpg/jpeg/png
//   addBook
// );

// router.get("/all", isAuthenticated, getAllBooks);

// router.delete(
//   "/delete/:id",
//   isAuthenticated,
//   isAuthorized("Admin"),
//   deleteBook
// );

// export default router;


import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/fileUpload.js";
import {
  addBook,
  getAllBooks,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.post(
  "/admin/add",
  isAuthenticated,
  isAuthorized("Admin"),
  upload.single("file"),
  addBook
);

router.get("/all", isAuthenticated, getAllBooks);

router.delete(
  "/delete/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  deleteBook
);

export default router;
