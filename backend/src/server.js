import express from "express"
import connectDb from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import testRoutes from "./routes/testRoutes.js";
import cors from "cors"
const app=express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/test", testRoutes);
app.get("/",(req,res)=>{
    res.send("Backend Live")
})
connectDb()
app.listen(2001,()=>{
console.log("Server is running on port 5001")
})