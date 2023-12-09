import React, { useEffect, useState } from 'react'
import './css/ourproduct.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Ourproducts() {
  const [products,setProducts]=useState();
  const navigate = useNavigate();
  const fetchapi = async()=>{
    try{const res = await axios.get("/v1/products/getproducts");
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
    <div className='ourproducts'>
        <p className='headertitle'>Explore Our Products</p>
         <div className='ourproductslist'>
          <div className='container'>
            <div className='row'>
              {products&& products.map((_a,index)=>(
              (index<8)&&(
            <div class='col-md-3'>
              <div className='card' onClick={()=>navigate(`/product/${_a.slug}`)}>
                <div className='ourproductimg'><img src={_a.photo}/>
                </div>
                <div className='ourproductdescription'>
                 <p className='producttitle'>{_a.name}</p>
                  <p className='productprice'>${_a.price}</p>                 
                </div>
              </div>
            </div>)))}
            
            </div>
            </div>
            <button type="button" class="btn btn-outline-primary" onClick={()=>navigate('/exploreproducts')}>See More</button>
         </div>
      
    </div>
  )
}

export default Ourproducts
