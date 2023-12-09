import mongoose from "mongoose"

const productschema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    
    slug: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    price: {
        type:Number,
        required:true,
    },

    quantity: {
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    email:{
     type:String,
     required:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
export default mongoose.model("products", productschema);