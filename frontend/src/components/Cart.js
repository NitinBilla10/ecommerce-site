import React, { useEffect, useState } from 'react'
import './css/cart.css'
import Navbar from './Navbar'
import Footer from './Footer'
import { useCart } from '../context/cart'
import axios from 'axios'
import { useAuth } from '../context/auth'
import { BraintreeDropIn } from "braintree-web-react"
import toast, { Toaster } from 'react-hot-toast'


function Cart() {
   const [cart,setCart]=useCart();
   const [clientToken,setClientToken]=useState("");
   const [instance,setInstance]=useState();
   const [auth,setAuth]=useAuth()




   const totalprice = ()=>{
    try{
        let sum=0;
        cart.map((_a)=>(
            sum=(+sum)+(+_a.price)))
       return sum.toLocaleString();     
    }
    catch(err){
    console.log(err);

    }
   }
   const handleremove = (pid)=>{
    try{
        let mycart=[...cart];
        let index=mycart.filter((c)=>c._id===pid);
        mycart.splice(index,1)
        setCart(mycart)
        localStorage.setItem('cart',JSON.stringify(mycart))
    }
    catch(err){
    console.log(err);

    }
   }


   const getToken= async ()=>{
       try{
          const {data}=  await axios.get('/v1/products/braintree/token');
          setClientToken(data.clientToken);
          console.log(data)
       }
       catch(err){
           console.log(err)   
       }
   }
   const handlepayment=async()=>{
      try{ const {nonce}= await instance.requestPaymentMethod();
       let email = auth.user.email;
       const {data} = await axios.post('/v1/products/braintree/payment',{
        nonce,
        cart,
        email
        
       })
       localStorage.removeItem('cart');
       toast.success("Payement Successfull");
       setCart([]);}
       catch(err){
        console.log(err)
       }
   }

   useEffect(()=>{
    getToken();
   },[auth?.token])

  return (
    <>
    
    <Navbar/>
    <Toaster/>
    <div className='cart'>
    <div class="card">
    
            <div class="row">
                <div class="col-md-8 cart">
                    <div class="title">
                        <div class="row">
                            <div class="col"><h4><b>Shopping Cart</b></h4></div>
                            <div class="col align-self-center text-right text-muted">{cart && cart.length} Items</div>
                        </div>
                    </div>    
                   { cart && cart.map((_a)=>(<div class="row border-top">
                        <div class="row main align-items-center">
                            <div class="col-2"><img class="img-fluid" src={_a.photo} alt='/'/></div>
                            <div class="col">
                                <div class="row text-muted">{_a.category}</div>
                                <div class="row">{_a.name}</div>
                            </div>
                            <div class="col">&euro; {_a.price} <span class="close" onClick={(e)=>(handleremove(_a._id))}>&#10005;</span></div>
                        </div>
                    </div>))}


                    <div class="back-to-shop"><a href="/"><span class="material-symbols-outlined">
                        arrow_back
                        </span></a><span class="text-muted">Back to shop</span></div>
                </div>
                <div class="col-md-4 summary">
                    <div><h5><b>Summary</b></h5></div>
                    <hr/>
                    <div class="row">
                        <div class="col" >ITEMS {cart.length}</div>
                        
                    </div>
                    { cart && cart.map((_a)=>(<div class="col text-right">&euro; {_a.price}</div>))}
                   
                    <div class="row" >
                        <b><div class="col">TOTAL PRICE</div>
                        <div class="col text-right">&euro; {totalprice()}</div></b>
                    </div>
                    {(cart.length&& clientToken && auth.user) && <div className=''>
                    <BraintreeDropIn
            options={{ authorization: clientToken }}
            onInstance={instance => setInstance(instance)}
          />
                   
                    <button className='btn' onClick={handlepayment}>Buy</button>
                    </div>}

                </div>
            </div>
            
        </div>
      
    </div>
    <Footer/>
    </>
  )
}

export default Cart
