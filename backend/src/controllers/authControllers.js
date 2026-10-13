import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

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
            { expiresIn: "7d" }
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