import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './css/productsbycategory.css'
import Navbar from './Navbar';
import Footer from './Footer';

function ProductsbyCategory() {
    const [products,setProducts]=useState();
    const params = useParams();
    const navigate = useNavigate();
    const fetchapi = async()=>{
      try{
        const res = await axios.get(`/v1/products/getproductbycategory/${params.category}`);
                     setProducts(res.data.products)
                     }
                     catch(err){
                      console.log(err,"Error in API fetching")
                     }
    }
    useEffect(
      ()=>{  fetchapi()
  
  },[])


  return (
    <>
    <Navbar/>
    <h5>Products By Category: {params.category}</h5>
    <div className='productsbycategory'>
        
       <div className='todaydeal'>
      
        <div className='row'>
        {products&& products.map((_a,index)=>(
         (index<6)&&
        (<div className='col-4' >
        <div className='card' onClick={()=>navigate(`/product/${_a.slug}`)} >
             <img src={_a.photo} alt=''/>
             <p className='producttitle'>{_a.name}</p>
             <span className='productprice'>{_a.price}</span>
             <span className='productogprice'>399 $</span>
         
        </div>
        </div>)
        ))} 
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default ProductsbyCategory
