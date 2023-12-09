import mongoose from "mongoose"

const orderschema = new mongoose.Schema(
    { 
    products:[
      
    ],
    payment:{},
    buyer:{
        type:String,
        require:true
    }},
    {
        timestamps:true
    }

  
)
export default mongoose.model("orders", orderschema);