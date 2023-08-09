import React from 'react'
import Navbar from './components/Navbar'
import Categories from './components/Categories'
import Headerbanners from './components/Headerbanners'
import './components/css/elektron.css'
import Todaydeal from './components/Todaydeal'
import Ourproducts from './components/Ourproducts'
import Footer from './components/Footer'

function Elektron() {
  return (
    <div>
    <div className='maincontainer'>
      <Navbar/>
      <Categories/>
      <Headerbanners/>
      <Todaydeal/>
      <Ourproducts/>
    </div>
    <Footer/>
    </div>
  )
}

export default Elektron
