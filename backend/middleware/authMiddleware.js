import  JWT from "jsonwebtoken";
import userschema from "../models/userschema.js";
import 'dotenv/config';

export const requireSignIn=async(req,res,next)=>{
    
    try{
    const decode = JWT.verify(req.headers.authorization,process.env.JSW_SCERETKEY)
    req.user =decode;
    next();
    }
    catch(err){
        console.log(err);
    }
}
export const isAdmin= async (req,res,next)=>{
    try{
    const user = await userschema.findById(req.user._id);
    if(user.role != 1){
        return res.status(401).send({
            success:false,
            message:"Unauthorized Access"
        })

    }
    else{
        next();
    }
    }
catch(err){
    console.log(err)

}

}

export const testController = (req,res)=>{
    try{
            res.send("Protected Routes")
    }
    catch(err){
        console.log(err);
        res.send({err});

    }

}