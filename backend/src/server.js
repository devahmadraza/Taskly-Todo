import express from "express"
import connectDb from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import testRoutes from "./routes/testRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
import cors from "cors"
const app = express()
const PORT = process.env.PORT || 2001;

app.use(
    cors({
        origin: "https://taskly-todo-three.vercel.app",
    })
);
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/test", testRoutes);
app.use("/api/todos", todoRoutes);


app.get("/", (req, res) => {
    res.send("Backend Live")
})
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
