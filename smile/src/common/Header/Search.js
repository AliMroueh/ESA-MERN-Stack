import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Search = () => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })

  const dispatch = useDispatch();
  const cartState = useSelector(state => state.cart)


  return (
    <>
     <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <h3>S M I L Y</h3>
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search '></i>
            <input type='text' placeholder='Search and hit enter...' />
            <span>All Category</span>
          </div>

          <div className='icon f_flex width'>
            <i className='fa fa-user icon-circle fa-2x '></i>
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle fa-2x'></i>
                {cartState.cartItems.length > 0
                && 
                <span>{cartState.cartItems.length}</span>
                }
                
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search