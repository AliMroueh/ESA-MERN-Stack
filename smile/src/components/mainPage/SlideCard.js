import React from "react"
import './Categories.css'
import {Swiper,SwiperSlide} from 'swiper/react'
import {FreeMode} from 'swiper'
import { useSwiper } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css';
import 'swiper/css/pagination';


function SlideCard() {
  const Sdata=[
    {
     img:'images/mohammad-metri-E-0ON3VGrBc-unsplash.jpg',
     name:'50% Off For Your First Shopping'
    },
    {
      img:'images/giorgio-trovato-8krX0HkXw8c-unsplash.jpg',
      name:'50% Off For Your First Shopping'
    },
    {
      img:'images/ehimetalor-akhere-unuabona-lq19sZ5pQ-c-unsplash.jpg',
       name:'50% Off For Your First Shopping'
    },

]

  return (
    <>
    <Swiper
    freeMode={true}
    grabCursor={true}
    className='mySwiper'
    slidesPerView={1}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
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
