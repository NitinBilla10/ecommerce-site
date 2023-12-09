import React, { useEffect, useState } from 'react'
import './css/todaydeal.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Todaydeal() {
  const [products,setProducts]=useState();
  const navigate = useNavigate();
  const fetchapi = async()=>{
    try{
      const res = await axios.get("/v1/products/getproducts");
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
    <div>
      <div><h3>Today's Deal : </h3></div>
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
  )
}

export default Todaydeal
