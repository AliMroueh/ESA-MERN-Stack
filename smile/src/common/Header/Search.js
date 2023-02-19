import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const Search = () => {

  const [search, setSearch] = useState('');
  const navigate = useNavigate()
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })
  const cartState = useSelector(state => state.cart);

  const clickHandler = () => {
    navigate(`/search/name/${search}`)
  }


  return (
    <>
     <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <h3>S M I L E</h3>
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search '></i>
            <input type='text' placeholder='Search and hit enter...' onChange={(e) => setSearch(e.target.value)}/>
            {/* <span>All Category</span> */}
            <button className="searchBtn" onClick={clickHandler}>All Category</button>
          </div>

          <div className='icon f_flex width'>
          <Link to='/profile'>
            <i className='fa fa-user icon-circle fa-2x '></i>
            </Link>
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle fa-2x'></i>
                {cartState.cartItems.length > 0
                && 
                <span>{cartState.cartItems.length}</span>
                }
                
              </Link>
            </div>
            <Link to='/Likes'>
            <i className="fa-solid fa-heart fa-2x"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
      )
}

export default Search