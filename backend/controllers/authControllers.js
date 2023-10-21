
import { comparepassword, hashpassword } from "../helpers/authhelper";
import userschema from "../models/userschema";
import JWT from "jsonwebtoken";


export const registerController = async (req,res)=>{
   try{
       const {name,email,password,phone,address,role} = req.body;
       if(!name){
        return res.send({ success:false,message:"name requires!!"})
       }
       if(!email){
        return  res.send({ success:false,message:"email requires!!"})
       }
       if(!password){
        return res.send({ success:false,message:"password requires!!"})
       }
       if(!phone){
        return res.send({ success:false,message:"phone requires!!"})
       }
       if(!address){
        return res.send({ success:false,message:"address requires!!"})
       }
         const existinguser = await userschema.findOne({email});
         if(existinguser){
            return res.send({ success:false,message:"Already Existing User, Please Login "});
         }
        const hashedpassword = await hashpassword(password)

         const user = new userschema({
            name,
            email,
            phone,
            address,
            password:hashedpassword,
         }).save();

         res.status(201).send({
            success:true,
            message:"User successfully registered",
            user
         })
   }
   catch(error){
    console.log(error)
    res.status(500).send({
        success: false,
        message:"Error in registration",
        error
    })

   }
}

 export const loginController= async (req,res)=>{

   try{
      const {email,password}=req.body;
      if(!email || !password){
         return res.status(404).send(
            {
               success:false,
               message:"Invalid Email or Password"
            }
         )  
      }
      const user = await userschema.findOne({email});
      if(!user){
         return res.status(404).send({
            success:false,
            message:"Email is not registered"
         });
      }
      const match = await comparepassword(password,user.password)
      if(!match){
        return res.status(200).send({
            success:false,
            message:"Invalid password"
         })
      }
      const token = await JWT.sign({_id:user._id},"HHAKSKNSJDJSHJJB3243234",{
         expiresIn:"7d"
       });
       res.status(200).send({
         success:true,
         message:"Logined Successfully",
         user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address
         },
         token
       })
       
   }
   catch(err){
      res.status(500).send({
         success:false,
         message:"ERROR IN LOGIN PAGE"
      });

   }

 }