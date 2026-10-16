import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import transporter from "../utils/email.js";
import crypto from "crypto";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (
            typeof name !== "string" ||
            !name.trim() ||
            typeof email !== "string" ||
            !email.trim() ||
            typeof password !== "string" ||
            !password.trim()
        ) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                message: "Please enter a valid email address",
            });
        }
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters and include an uppercase letter, a number, and a special character",
            });
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })



        console.log("New User:", name, email)


    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password", });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password, user.password //Comparision of both database||frontend
        )
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "5min" }
        )
        res.status(200).json({
            message: "Login Successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
    } catch {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) { return res.status(404).json({ message: "User not found", }); }
        return res.status(200).json({ user, });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch profile", });
    }


}


export const forgotPassword = async (req, res) => {
  try {
    console.log("FORGOT PASSWORD CONTROLLER REACHED");

    const { email } = req.body;

    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        message: "Please enter your email",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    const message =
      "If an account exists for that email, a reset link will be sent.";

    if (!user) {
      console.log("Forgot password: no matching account");
      return res.status(200).json({ message });
    }

    // Generate a secure token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store only the token hash in MongoDB
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await user.save();

    // Check frontend URL
    const frontendUrl = process.env.FRONTEND_URL;

    if (!frontendUrl) {
      throw new Error("FRONTEND_URL is not configured");
    }

    // Define resetUrl BEFORE sending the email
    const resetUrl =
      `${frontendUrl.replace(/\/$/, "")}/reset-password/${resetToken}`;

    // Send exactly one email
    const info = await transporter.sendMail({
      from: `"Taskly" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Reset your Taskly password",
      text: `You requested a password reset for Taskly.

Open this link within 15 minutes to reset your password:
${resetUrl}

If you did not request this, you can ignore this email.`,
      html: `
        <h2>Reset your Taskly password</h2>
        <p>You requested a password reset.</p>
        <p><a href="${resetUrl}">Reset Password</a></p>
        <p>This link expires in 15 minutes.</p>
        <p>If you did not request this, you can ignore this email.</p>
      `,
    });

    // Temporary delivery diagnostics
    console.log("Taskly email accepted:", info.accepted.length > 0);
    console.log("Taskly email rejected:", info.rejected.length > 0);
    console.log("Taskly email message ID:", info.messageId);
    console.log("Taskly SMTP response:", info.response);

    return res.status(200).json({ message });
  } catch (error) {
    console.error("Forgot password error:", error.message);

    return res.status(500).json({
      message: "Unable to process your request. Please try again later.",
    });
  }
};
