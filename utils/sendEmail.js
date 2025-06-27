import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, message }) => {
  if (!email) throw new Error("Recipient email is required");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject || "No Subject",
    html: message || "No Content", // use html if you are using templates
  });
};

export default sendEmail;
