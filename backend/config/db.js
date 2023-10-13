

import mongoose from "mongoose"
const url = "mongodb+srv://admin:admin@cluster0.bufl8pk.mongodb.net/ecommerce-site?retryWrites=true&w=majority"


const connectDB = async ()=>{
    try { 
        const conn = mongoose.connect(url)
        console.log("MongoDB Connected")}
    catch(err){
        console.log("Error", e)
    }


}

export default connectDB

