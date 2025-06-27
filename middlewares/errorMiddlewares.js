class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
};

export const errorMiddleware = (err, req, res, next) => {       
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Mongoose bad ObjectId error
  if (err.name === "TokenExpiredError") {
    const statusCode = 400;
    const message = "Json Web Token is expired, try again";
    err = new ErrorHandler(message, statusCode);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const statusCode = 400;
    const message = 'Duplicate field value entered';
    err = new ErrorHandler(message, statusCode);
  }

  // Mongoose validation error
  if (err.name === "jasonwebtokenError") {
    const statusCode = 400;
    const message = "Json Web Token is invalid, try again";
    err = new ErrorHandler(message, statusCode);
  }

  if (err.name === "castError") {
    const statusCode = 400;
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, statusCode);
  }

  // If there are validation errors, send them and return immediately
  if (err.errors) {
    const errorMessage = Object.values(err.errors).map(error => error.message).join(" ");
    return res.status(err.statusCode).json({
      success: false,
      message: errorMessage,
    });
  }

  // Default error response
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default ErrorHandler;

