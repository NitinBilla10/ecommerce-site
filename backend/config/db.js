

import mongoose from "mongoose"



const connectDB = async ()=>{
    try { 
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected")}
    catch(err){
        console.log("Error", e)
    }


}

export default connectDB

