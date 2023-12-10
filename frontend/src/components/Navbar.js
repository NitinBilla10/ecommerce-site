import React from 'react'
import './css/navbar.css'
import { useAuth } from '../context/auth'
import {useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
function Navbar() {


  const navigate=useNavigate()
  const[auth,setAuth]=useAuth()
 const[cart]=useCart();
 
  const handlelogout=()=>{
    setAuth({...auth,user:null,token:""})
    localStorage.removeItem('auth')
    navigate("/login")
  }
  return (
    <div>
     <div className='navbar'>
      <div className='logo'><p>elek<span>Tron</span></p></div>
      <div className='searchbar'>  
      </div>
      <div className='menu_cont'>
      <button type="button" class="btn btn-outline-primary" onClick={()=>navigate('/exploreproducts')}>View all</button>
      <div className='menu'>
      
       

       <button  class="btn position-relative" onClick={()=>navigate('/cart')}>
       <span class="material-symbols-outlined">
        shopping_cart 

       </span>
      {cart && <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
             {cart.length}    
           </span>}
       </button>
       <button onClick={()=>navigate('/profile')}>
       <span class="material-symbols-outlined">
       person
       </span>
       </button>
      </div>
      { !auth.user? (<><button type="button" class="btn btn-outline-secondary" onClick={()=>navigate('/login')}>Log In</button></>):(<><button type="button" class="btn btn-outline-secondary" onClick={handlelogout}>Log Out</button></>)
      }
      </div>
     </div>
    </div>
  )
}

export default Navbar
