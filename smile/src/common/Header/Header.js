import React from "react"
import "./Header.css"
import Search from "./Search"
import Navbar from "./Navbar"
import { useLocation } from "react-router-dom"

const Header = ({ CartItem }) => {
      // this is in react router v6 instead of props.location.search
      const {pathname} = useLocation();
      // console.log(pathname.split('/')[1] === 'register' || pathname.split('/')[1] === 'signin')

  return (
    <>
    {!(pathname.split('/')[1] === 'register' || pathname.split('/')[1] === 'signin') && 
    <header>
      <Search CartItem={CartItem} />
      <Navbar />
    </header>
    }
  </>
  )
}

export default Header