/* eslint-disable no-unused-vars */
import React from "react"
import {Swiper,SwiperSlide} from 'swiper/react'
import {FreeMode} from 'swiper'
import { useSwiper } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css';
import 'swiper/css/pagination';


/*const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  )
}*/

const FlashCard= () => {
    // eslint-disable-next-line no-unused-vars
    const products=[
      {
          name:"Watch",
          price:'200',
          discount:'20',
          cover:'images/flash-5.webp'
      },
      {
          name:"Watch",
          price:'400',
          discount:'30',
          cover:'images/flash-4.webp'
      },
      {
          name:"Watch",
          price:'300',
          discount:'50',
          cover:'images/flash-2.webp'
      },
      {
          name:"Watch",
          price:'400',
          discount:'20',
          cover:'images/flash-3.webp'
      },
      {
          name:"Watch",
          price:'250',
          discount:'20',
          cover:'images/discount-2.webp'
      },
      {
          name:"Watch",
          price:'200',
          discount:'20',
          cover:'images/flash-1.webp'
      }]
  
      const swiper = useSwiper();
    return (
        <>
        <Swiper
        freeMode={true}
        grabCursor={true}
        className='mySwiper'
        slidesPerView={3}
        spaceBetween={20}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
            {products.map((products, index) => {
              return (
                <>
                <SwiperSlide>
                  <div className=' box2 d-flex'  key={index}>
                  <div className='picture mtop'>
                    <div className='img1'>
                     <div className="sales f-flex">
                      <span className='discount '>{products.discount}% Off</span>
                      <i className='fa-regular fa-heart fa-2x'></i></div>
                      <img src={products.cover} alt='' className="img" />
                    </div>
                    <div className='product-details'>
                      <h1>{products.name}</h1>
                      <div className='price'>
                        <h1>${products.price}.00 </h1>
                        <button className="btn">
                          Add to Cart
                        </button>
                      </div>
                      <div className='rate'>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                      </div>
                    </div>
                  </div>
                  </div>
                  </SwiperSlide>
                  </>
              )
             
            })} 
            </Swiper>
        </>
       
      )
   
}
export default FlashCard