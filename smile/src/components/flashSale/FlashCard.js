/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import {Swiper,SwiperSlide} from 'swiper/react'
import {FreeMode} from 'swiper'
import { useSwiper } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css';
import 'swiper/css/pagination';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import  data from '../../data';
import { productId, productListReducer } from "../../reducers/productReducers";
import LoadingBox from '../LoadingBox';
import { getProducts } from "../../actions/productActions";








const FlashCard= () => {


   
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
            {data.products.map((products) => {
              return (
                <>
                <SwiperSlide>
                  <div className=' box2 d-flex'  key={products.index}>
                  <div className='picture mtop'>
                    <div className='img12'>
                     <div className="sales f-flex">
                      <span className='discount '>{products.discount}% Off</span>
                      <i className='fa-regular fa-heart fa-2x'></i></div>
                      <img src={products.image} alt='' className="img" />
                    </div>
                    <div className='product-details'>
                      <h1>{products.name}</h1>
                      <div className='price'>
                        <h1>${products.price}.00 </h1>
                        <button className="btn">
                          View Item
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