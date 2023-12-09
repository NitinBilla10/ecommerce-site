import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './css/exploreproducts.css'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Slider from '@mui/material/Slider';


function Exploreproducts() {
    const [products,setProducts]=useState();
    const [checks,setChecks]=useState([]);
    const [price,setprice]=useState(999);
   

    const handlefilter=(check,value)=>{
      let all = [...checks];
   if(check){
        all.push(value);
   }
   else{
    
        all=all.filter((c)=>c!==(value || null)  );
   }
      setChecks(all);
    }
 
    const fetchapi = async()=>{
        try{
          const body = {checks,price};
          const res = await axios.post(`/v1/products/productbyfilter`,body);
                       setProducts(res.data.product)
                      
                       }
                       catch(err){
                        console.log(err,"Error in API fetching")
                       }
      }
      useEffect(
        ()=>{  fetchapi()
    
    },[checks,price])
    const navigate = useNavigate()
  return (
    <>
    <div className='exploreproducts'>
        <Navbar/>
     
      
        <h5>Explore Our Products</h5>
        <div className='maincontainer1'>
        <div className='filtersection'>
          <h4>Filters : </h4>
          <div className='categoryfilter'>
            <h4>
                Category :
            </h4>
            <div class="form-check">
            <input class="form-check-input" type="checkbox"  id="flexCheckDefault" value={'computer'}   onChange={(e)=>handlefilter(e.target.checked,e.target.value)} />
            <label class="form-check-label" for="flexCheckDefault">
              Computer
            </label>
           </div>
           <div class="form-check">
            <input class="form-check-input" type="checkbox"  id="flexCheckDefault" value={'phones'} onChange={(e)=>handlefilter(e.target.checked,e.target.value)} />
            <label class="form-check-label" for="flexCheckDefault">
              Phones
            </label>
           </div>
           <div class="form-check">
            <input class="form-check-input" type="checkbox"  id="flexCheckDefault" value={'watch'} onChange={(e)=>handlefilter(e.target.checked,e.target.value)}/>
            <label class="form-check-label" for="flexCheckDefault">
              Watch
            </label>
           </div>
           <div class="form-check">
            <input class="form-check-input" type="checkbox"  id="flexCheckDefault" value={'headphones'} onChange={(e)=>handlefilter(e.target.checked,e.target.value)} />
            <label class="form-check-label" for="flexCheckDefault">
              Headphones
            </label>
           </div>
           <div class="form-check">
            <input class="form-check-input" type="checkbox"  id="flexCheckDefault" value={'camera'} onChange={(e)=>handlefilter(e.target.checked,e.target.value)}/>
            <label class="form-check-label" for="flexCheckDefault">
              Camera
            </label>
           </div>
          </div>
          <div className='pricefilter'>
            <h4>
                Prices :

            </h4>

            <Slider min={0}  max={1000} defaultValue={999}  onChange={(e)=>(setprice(e.target.value))} aria-label="Default" valueLabelDisplay="auto" />
          </div>


        </div>
        <div className='productssection'>
        <div className='row'>
        {products&& products.map((_a)=>(
         
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
        
           
    </div>
    <Footer/>
    </>
  )
}

export default Exploreproducts
