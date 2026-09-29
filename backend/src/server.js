import express from "express"
import connectDb from "./config/db.js"
const app=express()


app.get('/',(req ,res)=>{
res.send("Backend Live")

})

connectDb()
app.listen(2001,()=>{
console.log("Server is running on port 5001")
})