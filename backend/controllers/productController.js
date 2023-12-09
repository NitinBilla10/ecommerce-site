import slugify from "slugify";
import productschema from "../models/productschema.js"
import 'dotenv/config';


configDotenv();


export const createProductController= async (req,res)=>{
   try{
       const {name,description,price,quantity,category,email,photo,slug}=req.body;
     
   
       switch(true){
        case !name:
            return res.status(500).send({success:false,message:"Product Name Required"})
        case !description:
            return res.status(500).send({success:false,message:"Product Description Required"})
        case !price:
            return res.status(500).send({success:false,message:"Product Price Required"})
        case !quantity:
            return res.status(500).send({success:false,message:"Product Quantity Required"})
        case !category:
            return res.status(500).send({success:false,message:"Product Category Required"})
        case !email:
                return res.status(500).send({success:false,message:"User Required"})
        case photo && photo.size>1000000:
            return res.status(500).send({success:false,message:"Product Photo Required or Photo should be less than 1mb"})


}
 const products = new productschema({...req.body, slug:slugify(name)})


await products.save()
res.status(201).send({
    success:true,
    message:"Product Successfully Created",
    products,
    
})

   }catch(err){
    console.log(err)
     res.status(500).send({
        success:false,
        message:"Error in creating Product"
     })
   }
}
export const getproductController=async (req,res)=>{
    try {
        const products = await productschema.find({}).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            message:"Successfully Fetched All Products",
            products,
            totalproducts:products.length
        }) 

    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"Product can't be fetched"
        })
    }
}

export const singleproductController=async(req,res)=>{
    try{
       const product = await productschema.findOne({
        slug:req.params.slug
       })
       res.status(200).send({
        success:true,
        message:"Single Product Fetched",
        product
       })
    }
    catch(err){
       console.log(err)
       res.status(500).send({
        success:false,
        message:"Error During Single Product Fetching"
       })
    }

}

export const deleteproductController=async(req,res)=>{
    try{
     await productschema.findByIdAndDelete(req.params.pid);
     res.status(200).send({
        success:true,
        message:"Product deleted successfully"
     })

    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"Error in Product Deleting"
        })
        
    }

}
export const getproductsbyemail= async (req,res)=>{
    try{
       const product=await productschema.find({email:req.params.email})
        res.status(200).send({
            success:true,
            message:"Products by email got successfully",
            product
            
           })
      
       
    }
    catch(err){
      console.log(err)
      res.status(500).send({
        success:false,
        message:"Error in Products by email"
        
      })
    }
}

export const getProductbycategory= async (req,res)=>{
    try{
        const products = await productschema.find({category:req.params.category});
        res.status(200).send({
            success:true,
            message:"Successfull Category API fetched",
            products
        })

    }catch(error){
           console.log(error,"Error in Getting Products By Category");
           res.status(500).send({
            success:false,
            message:"Error Get Category API"
           })
    }
}
export const productfilter = async (req,res)=>{
   
    try {  
        const {checks,price} = req.body;
           let args={}
           if(checks.length) {args.category=checks;}
           args.price={$gt:"0", $lte:price};
           
           const product = await productschema.find(args);
       
           res.status(200).send({
            success:true,
            message:"Products Filtered Successfully",
            product
           })
    }
    catch(error){
        console.log(error,"Error in Getting Products By Filter");
        res.status(500).send({
         success:false,
         message:"Error Get Filter Api"
        })

    }
}

import braintree from "braintree";
import orderschema from "../models/orderschema.js";
import { configDotenv } from "dotenv";

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANTID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const braintreeController =(req,res)=>{
    try{
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err)
            }
            else{
                res.send(response)
            }
         })


    }
    catch(error){
        console.log(error)

    }
}
export const braintreepaymentController =async (req,res)=>{
    try{
         const {cart,nonce,email}= req.body;
         let total = 0;
         cart.map((i)=>{total+=i.price})
         let newtransaction = gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                     submitForSettlement:true,
            },
         },function(err,result){
            if(result){
                const order = new orderschema({
                    products:cart,
                    payment:result,
                    buyer:email
                }).save();
                res.json();
            }

         })
    }
    catch(error){
        console.log(error)

    }
}

export const myorderController=async (req,res)=>{
    try{
        const product=await orderschema.find({buyer:req.params.email})
         res.status(200).send({
             success:true,
             message:"Products by email got successfully",
             product
             
            })
       
        
     }
     catch(err){
       console.log(err)
       res.status(500).send({
         success:false,
         message:"Error in Products by email"
         
       })
     }
}