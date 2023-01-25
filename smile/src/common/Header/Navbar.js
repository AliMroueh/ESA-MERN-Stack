import React, { useState } from "react"
import { Link } from "react-router-dom"
import Categories from "./Categories"

const Navbar = () => {
  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false)
  return (
    <>

      <div className='header'>
        <div className='containerr d_flex'>
          <div className='catgrories'>
           <Categories/>
          </div>

          <div className='navlink'>
            <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
              <li>
                <Link to='/'>home</Link>
              </li>
              <li>
                <Link to='/pages'>pages</Link>
              </li>
              <li>
                <Link to='/user'>user account</Link>
              </li>
              <li>
                <Link to='/vendor'>vendor account</Link>
              </li>
              <li>
                <Link to='/track'>track my order</Link>
              </li>
              <li>
                <Link to='/contact'>contact</Link>
              </li>
            </ul>

            <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fas fa-bars open'></i>}
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Navbar