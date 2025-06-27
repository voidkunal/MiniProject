
import express from "express";
import {
  borrowedBooks,
  getBorrowedBooksForAdmin,
  recordBorrowedBook,
  returnBorrowBook,
} from "../controllers/borrowController.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/record-borrow-book/:id",
  isAuthenticated,
  isAuthorized("Admin", "user"),
  recordBorrowedBook
);

router.get(
  "/borrowed-books-users",
  isAuthenticated,
  isAuthorized("Admin"),
  getBorrowedBooksForAdmin
);

router.get(
  "/my-borrowed-books",
  isAuthenticated,
  borrowedBooks
);

router.put(
  "/return-borrow-book/:bookId",
  isAuthenticated,
  isAuthorized("Admin", "user"),
  returnBorrowBook
);

export default router;
