import React, { useState } from 'react'
import './css/vendorpage.css'
import { useAuth } from '../context/auth'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import moment from 'moment';


function VendorPage() {
  const [auth,setAuth]=useAuth()
  const[profile,setProfile]=useState(true)
  const[myorders,setMyorders]=useState(false)
  const[orders,setOrders]=useState()
  const[createproduct,setCreateproduct]=useState(false)
  const[myproducts,setMyproducts]=useState(false)
  const[proname,setProname]=useState()
  const[prodescription,setDescription]=useState()
  const[proprice,setProprice]=useState()
  const[proquantity,setQuantity]=useState()
  const[procategory,setCategory]=useState()
  const[prophoto,setProphoto]=useState()
  const[products,setProducts]=useState()
  const[prophotourl,setProphotourl]=useState()
 
 
 const handlemyproducts = async ()=>{
  const res = await axios.get(`/v1/products/getproductsbyemail/${auth.user.email}`)
  setProducts(res.data.product)
  setProfile(false)
  setMyproducts(true)
  setMyorders(false)
  setCreateproduct(false)
 }
 const handlemyorders = async ()=>{
  const res = await axios.get(`/v1/products/myorders/${auth.user.email}`)
  setOrders(res.data.product)
  console.log(orders)
 }

  


  const handlecreateproduct=async()=>{
    try{
      let imgbase64 = "";
      let reader = new FileReader();
      reader.readAsDataURL(prophotourl);
      reader.onload = function () {
      imgbase64 = reader.result;
      setProphoto(imgbase64);
      setProphotourl();
      // console.log(imgbase64);
  };
      const body = {
      "email":auth.user.email,
      "name":proname,
      "description":prodescription,
      "price":proprice,
      "quantity":proquantity,
      "category":procategory,
      "photo":prophoto
    }
      const res = await axios.post("/v1/products/createproduct",body)
    console.log(res)
    if(res.data.success){
      toast.success(res.data.message);
      handlemyproducts();
    }
    else{
      toast.error(res.data.message)
    } 
    }
    catch(err){
         console.log(err,"Error in vendor page")
         

    }
       
  }
  return (
    <div className='vendorpage'>
      <Toaster/>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Dashboard</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link"  onClick={()=>(setProfile(true),setMyorders(false),setMyproducts(false),setCreateproduct(false))}>Profile</a>
        <a class="nav-link"  onClick={()=>(handlemyorders(),setProfile(false),setMyorders(true),setMyproducts(false),setCreateproduct(false))}>My Orders</a>
        <a class="nav-link"  onClick={()=>(setProfile(false),setMyorders(false),setMyproducts(false),setCreateproduct(true))}>Create Products</a>
        <a class="nav-link" onClick={()=>handlemyproducts()} > My Products</a>
      </div>
    </div>
  </div>
</nav>


<div className='tabscontainer'>
 
{auth.user&&profile&&<div className='profile'>
<span class="material-symbols-outlined">
account_circle
</span>
<p><b>Name :</b> {auth.user.name}</p>
<p><b>E-mail :</b> {auth.user.email}</p>
<p><b>Phone :</b> {auth.user.phone}</p>
<p><b>Address :</b> {auth.user.address} </p>
</div>}

{createproduct && <div className='productform'>
<h5>Create Product</h5>
<div class="form-floating mb-3">
  <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" value={proname} onChange={(e)=>setProname(e.target.value)}/>
  <label for="floatingInput">Product Title</label>
</div>
<div class="form-floating">
  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '100px'}} value={prodescription} onChange={(e)=>setDescription(e.target.value)}></textarea>
  <label for="floatingTextarea2">Product Description</label>
</div>
<select class="form-select" aria-label="Default select example" value={procategory} onChange={(e)=>setCategory(e.target.value)}>
  <option selected>Category</option>
  <option value="phones">Phones</option>
  <option value="computer">Computer</option>
  <option value="watch">Watch</option>
  <option value="headphones">headphones</option>
  <option value="camera">Camera</option>
</select>
<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="text" placeholder="Product Price" pattern="[0-9]" class="form-control" aria-label="Amount (to the nearest dollar)" value={proprice} onChange={(e)=>setProprice(e.target.value)}/>
  <span class="input-group-text">.00</span>
  
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Quantity</span>
  <input type="text" class="form-control" aria-label="Sizing example input" pattern="[0-9]" aria-describedby="inputGroup-sizing-default" value={proquantity} onChange={(e)=>setQuantity(e.target.value)}/>
</div>
<div class="input-group mb-3">
  <input type="file" class="form-control" id="inputGroupFile01" accept='image/*' onChange={(e)=>setProphotourl(e.target.files[0])}/>
</div>
<button type="button" class="btn btn-outline-primary" onClick={handlecreateproduct}>Create</button>
</div>

}
{
  myorders && (<div className='myorders'>
             <h5>My Orders</h5>
         
             {orders && orders.map((_a)=>(<p><b>Ordered On</b> :- {moment(_a.createdAt).format('MM/DD/YYYY')} {_a.products.map((_b)=>(<div class="row border-top">
                        <div class="row main align-items-center">
                            <div class="col-2"><img class="img-fluid" src={_b.photo} alt='/'/></div>
                            <div class="col">
                                <div class="row text-muted">{_b.category}</div>
                                <div class="row">{_b.name}</div>
                            </div>
                            <div class="col"><b>&euro; {_b.price}</b> </div>
                        </div>
                </div>))}</p>))}
                
             


  </div>)
}





{myproducts &&<div className="myproducts">
  <div className='container'>
<div className='row'>
 {  products && products.map((_a)=>(<div className='col-4'>
 
  <div className='card1'>
             <img src={_a.photo} alt='/'/> 
             <p className='producttitle'>{_a.name}</p>
             <span className='productprice'>{_a.price} $</span>
             <span className='productogprice'><del>399 $</del></span>
             <span className='productprice'><b>Quantity :</b>{_a.quantity}</span>
      </div>
  </div>))
  }
 

</div>
</div>

</div>}
</div>
    </div>
  )
}

export default VendorPage
