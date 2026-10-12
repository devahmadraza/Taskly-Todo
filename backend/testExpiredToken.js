
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from .env");
}

const expiredToken = jwt.sign(
  { userId: "68a123456789abcdef123456" },
  process.env.JWT_SECRET,
  { expiresIn: "-1s" }
);

console.log("Expired token:");
console.log(expiredToken);