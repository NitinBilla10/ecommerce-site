import React from 'react'
import speaker from './img/speaker.png'
import camera from './img/camera.png'
import laptop from './img/laptop.png'
import tv from './img/tv.png'
import './css/todaydeal.css'

function Todaydeal() {
  return (
    <div>
      <div><h3>Today's Deal : </h3></div>
      <div className='todaydeal'>
        <div className='card'>
            <p>Continue shooping ...</p>
             <img src={speaker}/>
             <p className='producttitle'>Zebronics ZEB-JUKE BAR DOLBY ATMOS Home Theater With Subwoofer</p>
             <span className='productprice'>259 $</span>
             <span className='productogprice'>399 $</span>
        </div>
        <div className='card'>
             <img src={camera}/>
             <p className='producttitle'>Sony Alpha ILCE 6600M 24.2 MP Mirrorless Digital SLR Camera with 18-135 mm Zoom Lens</p>
             <span className='productprice'>259 $</span>
             <span className='productogprice'>399 $</span>
        </div>
        <div className='card'>
             <img src={tv}/>
             <p className='producttitle'>OnePlus 80 cm (32 inches) Y Series HD Ready LED Smart Android TV 32Y1</p>
             <span className='productprice'>259 $</span>
             <span className='productogprice'>399 $</span>
        </div>
        <div className='card'>
             <img src={laptop}/>
             <p className='producttitle'>Lenovo Legion 5 11th Gen Intel Core i7 15.6"(39.62cm) FHD IPS Gaming Laptop</p>
             <span className='productprice'>259 $</span>
             <span className='productogprice'>399 $</span>
        </div>

      </div>

    </div>
  )
}

export default Todaydeal
