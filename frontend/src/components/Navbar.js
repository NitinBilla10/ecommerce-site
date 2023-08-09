import React from 'react'
import './css/navbar.css'

function Navbar() {
  return (
    <div>
     <div className='navbar'>
      <div className='logo'><p>elek<span>Tron</span></p></div>
      <div className='searchbar'>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search...." aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      </div>
      <div className='menu'>
       <button>
       <span class="material-symbols-outlined">
       favorite
       </span>
       </button>
       <button>
       <span class="material-symbols-outlined">
        shopping_cart
       </span>
       </button>
       <button>
       <span class="material-symbols-outlined">
       person
       </span>
       </button>
       
       
      </div>


     </div>
    </div>
  )
}

export default Navbar
