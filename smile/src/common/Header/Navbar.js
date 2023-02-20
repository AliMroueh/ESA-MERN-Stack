import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { signout } from "../../actions/userActions"
import Categories from "./Categories"

const Navbar = () => {
  // Toogle Menu
  const dispatch = useDispatch()
  const [MobileMenu, setMobileMenu] = useState(false)
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
 
  
  const logOut = () =>{
    dispatch(signout())
  }
  return (
    <>
      <header className='header'>
        <div className='containerr d_flex'>
          <div className='catgrories'>
           <Categories/>
          </div>

          <div className='navlink'>
            <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/orderhistory'>Track My Order</Link>
              </li>
              <li>
                <Link to='/chat'>Chat</Link>
              </li>
              {userInfo &&
              <li onClick={logOut}>
              <Link>SignOut</Link>
            </li>
              }
              {userInfo && 
               <li>
              <Link to={`/Like/${userInfo._id}`}>
              WishList
              </Link>
            </li>
            }
            </ul>

            <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-btn' ></i> : <i className='fas fa-bars open'></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar