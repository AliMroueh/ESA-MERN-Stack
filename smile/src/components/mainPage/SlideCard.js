import React from "react"
import './Categories.css'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper';
import {FreeMode} from 'swiper'
import { useSwiper } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css';
import 'swiper/css/pagination';


function SlideCard() {
  const Sdata=[
    {
     img:'images/sale4.webp'
    },
    {
      img:'images/mohammad-metri-E-0ON3VGrBc-unsplash.jpg',
    },
    {
      img:'images/iphone.jpg',
    },

]
SwiperCore.use([Autoplay])
  return (
    <>
    <Swiper
    freeMode={true}
    grabCursor={true}
    className='mySwiper'
    slidesPerView={1}
    loop={true}
    autoplay={{
        delay: 5000,
        disableOnInteraction: true
    }}
  >
        {Sdata.map((Sdata, index) => {
          return (
            <>
            <SwiperSlide>
              <div className='d-block'  key={index}>
                  <img src={Sdata.img} alt='' className="picture4" />
              </div>
            </SwiperSlide>
             </>
          )
         
        })} 
        </Swiper>
    </>
  );
}

export default SlideCard;
