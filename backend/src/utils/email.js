
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
  port: 465,
  secure: true,
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export default transporter;
