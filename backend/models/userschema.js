import mongoose from "mongoose"

const userschema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    
    email: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    phone: {
        type:String,
        required:true,
    },

    address: {
        type:String,
        required:true,
    },
    role:{
        type:Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
export default mongoose.model("users", userschema)