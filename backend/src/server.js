import express from "express"
import connectDb from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import testRoutes from "./routes/testRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express()
const PORT = process.env.PORT || 2001;


const allowedOrigins = [
  "https://taskly-todo-three.vercel.app",
  "https://taskly-todo-frontend.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as Postman
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
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
