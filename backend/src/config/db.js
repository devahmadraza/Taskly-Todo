import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const connectDb = async() =>{
 try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Database Connected")
 } catch (error) {
    console.log("Error in connecting database",error.message)

 }
    

}
export default connectDb;