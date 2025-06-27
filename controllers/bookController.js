// controllers/bookController.js

import { Book } from "../models/bookModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import fs from "fs";
import path from "path";

// Add new book (upload file)
export const addBook = catchAsyncErrors(async (req, res, next) => {
  const { title, description, author, price, quantity } = req.body;

  if (!req.file) {
    return next(new ErrorHandler("Please upload a file", 400));
  }

  const fileExtension = path.extname(req.file.originalname).substring(1).toLowerCase();
  const allowedTypes = ["pdf", "jpg", "jpeg", "png"];

  if (!allowedTypes.includes(fileExtension)) {
    fs.unlinkSync(req.file.path);
    return next(new ErrorHandler("Only PDF, JPG, JPEG, PNG files are allowed", 400));
  }

  const filePath = req.file.path;

  const book = await Book.create({
    title,
    author,
    description,
    price,
    quantity,
    availability: quantity > 0,
    filePath,
    fileType: fileExtension,
  });

  res.status(201).json({
    success: true,
    message: "Book uploaded successfully",
    book,
  });
});

// Get all books
export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    success: true,
    books,
  });
});

// Delete a book
export const deleteBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) return next(new ErrorHandler("Book not found", 404));

  // Delete the uploaded file from disk
  try {
    if (book.filePath) {
      fs.unlinkSync(book.filePath);
    }
  } catch (error) {
    console.error("Failed to delete book file:", error);
  }

  await book.deleteOne();

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
  });
});
