import React from 'react'
import Navbar from './components/Navbar'
import Categories from './components/Categories'
import Headerbanners from './components/Headerbanners'
import './components/css/elektron.css'
import Todaydeal from './components/Todaydeal'

function Elektron() {
  return (
    <div>
    <div className='maincontainer'>
      <Navbar/>
      <Categories/>
      <Headerbanners/>
      <Todaydeal/>
    </div>
    </div>
  )
}

export default Elektron
