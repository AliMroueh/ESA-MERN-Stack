/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import {Swiper,SwiperSlide} from 'swiper/react'
import {FreeMode} from 'swiper'
import { useSwiper } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css';
import 'swiper/css/pagination';
import  data from '../../data';

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { param } from "express-validator";
import products from "./products";
import { addToWishlist } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";



const FlashCard= ({key,product}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams();
  const {id:productId} = params;
  const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin;
  //console.log(product)
  const addToCartHandler = (products) =>{
   navigate(`/product/${products._id}`)
  }
  const likeHandler = () =>{
    dispatch(addToWishlist(userInfo._id,productId))
    navigate(`/like/${userInfo._id}`)
}

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
            {product.map((products) => {

              return (
                <>
                <SwiperSlide key={products._id}>
                  <div className=' box2 d-flex'  key={products._id}>
                  <div className='picture mtop'>
                    <div className='img12'>
                      <img src={products.imageColor[0].image} alt='' className="img" />
                    </div>
                    <div className='product-details'>
                      <h1>{products.name}</h1>
                      <div className='price'>
                        <h1>${products.price}.00 </h1>
                        <button className="btn" onClick={() => navigate(`/product/${products._id}`)}>
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