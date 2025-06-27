// // import express from 'express';
// // import { config } from 'dotenv';
// // import cors from "cors";
// // import { connectDB } from './database/db.js';
// // import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
// // import authRouter from './routes/authRouter.js';
// // import bookRouter from './routes/bookRouter.js';
// // import borrowRouter from './routes/borrowRouter.js';
// // import userRouter from "./routes/userRouter.js";
// // import multer from 'multer';
// // import { notifyUsers } from './services/notifyUsers.js';
// // import { removeUnverifiedAccounts } from './services/removeUnverifiedAccounts.js';
// // import cookieParser from "cookie-parser";
// // import sendEmail from './utils/sendEmail.js';





// // export const app = express();

// // config({ path: "./config/config.env"});


// // app.use(cors({
// //   origin: process.env.FRONTEND_URL || "http://localhost:5173",
// //   credentials: true,
// //   methods: ["GET", "POST", "PUT", "DELETE"],
// // }));

// // app.use(cookieParser());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));



// // app.use("/api/v1/auth", authRouter);
// // app.use("/api/v1/book", bookRouter);
// // app.use("/api/v1/borrow", borrowRouter);
// // app.use("/api/v1/user", userRouter);




// // app.use((err, req, res, next) => {
// //   if (err instanceof multer.MulterError) {
// //     return res.status(400).json({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// //   next(err);  
// // });


// // notifyUsers();
// // removeUnverifiedAccounts();
// // connectDB();

// // app.use(errorMiddleware);

// import express from 'express';
// import { config } from 'dotenv';
// import cors from 'cors';
// import { connectDB } from './database/db.js';
// import { errorMiddleware } from './middlewares/errorMiddlewares.js';
// import authRouter from './routes/authRouter.js';
// import bookRouter from './routes/bookRouter.js';
// import borrowRouter from './routes/borrowRouter.js';
// import userRouter from './routes/userRouter.js';
// import multer from 'multer';
// import { notifyUsers } from './services/notifyUsers.js';
// import { removeUnverifiedAccounts } from './services/removeUnverifiedAccounts.js';
// import cookieParser from 'cookie-parser';
// import sendEmail from './utils/sendEmail.js';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Get __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Initialize app
// export const app = express();

// // Load environment variables
// config({ path: './config/config.env' });

// // Enable CORS with credentials
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   })
// );

// // Middleware for parsing cookies and request bodies
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Serve the uploads folder statically
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/book', bookRouter);
// app.use('/api/v1/borrow', borrowRouter);
// app.use('/api/v1/user', userRouter);

// // Multer error handler
// app.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
//   next(err);
// });

// // Background tasks
// notifyUsers();
// removeUnverifiedAccounts();

// // Connect DB
// connectDB();

// // Global error middleware
// app.use(errorMiddleware);


import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { connectDB } from './database/db.js';
import { errorMiddleware } from './middlewares/errorMiddlewares.js';
import authRouter from './routes/authRouter.js';
import bookRouter from './routes/bookRouter.js';
import borrowRouter from './routes/borrowRouter.js';
import userRouter from './routes/userRouter.js';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import { notifyUsers } from './services/notifyUsers.js';
import { removeUnverifiedAccounts } from './services/removeUnverifiedAccounts.js';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Initialize Express App
export const app = express();

// ✅ Load .env variables
config({ path: './config/config.env' });

// ✅ Middleware: CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// ✅ Middleware: JSON, URL Encoding, Cookies
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/book', bookRouter);
app.use('/api/v1/borrow', borrowRouter);
app.use('/api/v1/user', userRouter);

// ✅ Multer Error Handling Middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  next(err);
});

// ✅ Background Services
notifyUsers();
removeUnverifiedAccounts();

// ✅ Database Connection
connectDB();

// ✅ Global Error Middleware
app.use(errorMiddleware);
