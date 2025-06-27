
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Borrow } from "../models/borrowModel.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
import { calculateFine } from "../utils/fineCalculator.js";

export const recordBorrowedBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;

  const book = await Book.findById(id);
  if (!book) return next(new ErrorHandler("Book not found.", 404));

  const user = await User.findOne({ email, accountVerified: true });
  if (!user) return next(new ErrorHandler("User not found.", 404));

  if (book.quantity === 0)
    return next(new ErrorHandler("Book not available.", 400));

  const isAlreadyBorrowed = user.borrowedBooks.find(
    (b) => b.bookId.toString() === book._id.toString() && !b.returned
  );
  if (isAlreadyBorrowed)
    return next(new ErrorHandler("Book already borrowed.", 400));

  book.quantity -= 1;
  book.availability = book.quantity > 0;
  await book.save();

  user.borrowedBooks.push({
    bookId: book._id,
    bookTitle: book.title,
    borrowedDate: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });
  await user.save();

  await Borrow.create({
    user: { id: user._id, name: user.name, email: user.email },
    book: book._id,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    price: book.price,
  });

  res.status(200).json({
    success: true,
    message: "Borrowed Book recorded successfully.",
  });
});

export const borrowedBooks = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, borrowedBooks: req.user.borrowedBooks });
});

export const getBorrowedBooksForAdmin = catchAsyncErrors(async (req, res, next) => {
  const all = await Borrow.find();
  res.status(200).json({ success: true, borrowedBooks: all });
});

export const returnBorrowBook = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) return next(new ErrorHandler("Book not found.", 404));

  const user = await User.findOne({ email, accountVerified: true });
  if (!user) return next(new ErrorHandler("User not found.", 404));

  const borrowed = user.borrowedBooks.find(
    (b) => b.bookId.toString() === bookId && !b.returned
  );
  if (!borrowed) return next(new ErrorHandler("This book was not borrowed by the user.", 400));

  borrowed.returned = true;
  await user.save();

  book.quantity += 1;
  book.availability = book.quantity > 0;
  await book.save();

  const borrowRecord = await Borrow.findOne({
    book: bookId,
    "user.email": email,
    returnDate: null,
  });

  if (!borrowRecord) {
    return next(new ErrorHandler("This book is not borrowed by you.", 400));
  }

  borrowRecord.returnDate = new Date();
  const fine = calculateFine(borrowRecord.dueDate);
  borrowRecord.fine = fine;
  await borrowRecord.save();

  res.status(200).json({
    success: true,
    message:
      fine !== 0
        ? `The book has been returned. Total fine is ₹${book.price + fine}.`
        : `The book has been returned. Total charges is ₹${book.price}.`,
  });
});