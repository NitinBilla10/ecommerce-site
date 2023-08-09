import React from 'react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import  headerbannner1 from'./img/headerbanner1.jpg';

import './css/headerbanner.css'

function Headerbanners() {
  return (
    <div >

       <Swiper 
       
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        style={{height:400}
      }
        
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={headerbannner1} alt=''/></SwiperSlide>
        <SwiperSlide><img src={''} alt=''/></SwiperSlide>
        <SwiperSlide><img src={''} alt='' /></SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Headerbanners
