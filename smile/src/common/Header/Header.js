import "./Header.css"
import Search from "./Search"
import Navbar from "./Navbar"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import AdminHeader from "./AdminHeader"

const Header = ({ CartItem }) => {
      // this is in react router v6 instead of props.location.search
      const {pathname} = useLocation();
      // console.log(pathname.split('/')[1] === 'register' || pathname.split('/')[1] === 'signin')

      const userSignin = useSelector(state => state.userSignin);
      const {userInfo} = userSignin;
  

  return (
    <>
    {
      userInfo && userInfo.isAdmin ?
      <AdminHeader />
      : 
      !(pathname.split('/')[1] === 'register' || pathname.split('/')[1] === 'signin') && 
    <header>
      <Search CartItem={CartItem} />
      <Navbar />
    </header>
    }
  </>

  )
}

export default Header