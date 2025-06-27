

import cron from 'node-cron';
import { Borrow } from '../models/borrowModel.js';
import { Book } from '../models/bookModel.js';
import sendEmail from '../utils/sendEmail.js';
import { calculateFine } from "../utils/fineCalculator.js";


export const notifyUsers = () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const borrowers = await Borrow.find({
        dueDate: { $lte: oneDayAgo },
        notified: false,
        returnDate: null,
      }).populate("book");

      for (const element of borrowers) {
        if (element.user && element.user.email && element.book?.title) {
          // 💰 Calculate fine on-the-fly using dueDate
          const fineAmount = calculateFine(element.dueDate);

          await sendEmail({
            email: element.user.email,
            subject: "Book Return Reminder",
            message: `Dear ${element.user.name},\n\nYour borrowed book "${element.book.title}" is overdue.\nYour current fine is ₹${fineAmount}.\nPlease return it as soon as possible to avoid further fines.\n\nThank you!`
          });

          element.notified = true;
          element.fine = fineAmount; // Optional: Save it in DB
          await element.save();

          console.log(`Email sent to ${element.user.email} with fine ₹${fineAmount} for overdue book: ${element.book.title}`);
        }
      }

    } catch (error) {
      console.error("❌ Error while notifying users.", error);
    }
  });
};
