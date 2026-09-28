import express from "express"
const app=express()


app.get('/',(req ,res)=>{
res.send("Backend Live")

})

app.listen(2001,()=>{
console.log("Server is running on port 5001")


})