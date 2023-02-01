import "./Header.css"
import Search from "./Search"
import Navbar from "./Navbar"
import { useSelector } from "react-redux"
import AdminHeader from "./AdminHeader"
import { useLocation } from "react-router-dom"

const Header = ({ CartItem }) => {

  const {pathname} = useLocation();
  const userSignin = useSelector((state) => state.userSignin);
  const {loading,userInfo,error} = userSignin;
  return (
    <>
    {
      ((userInfo && !userInfo.isAdmin) || !userInfo) &&
      !(pathname.split('/')[1] === 'register' || pathname.split('/')[1] === 'signin') ? 
      <>
      <Search CartItem={CartItem} />
      <Navbar />
    </>  
      : 
      !(pathname.split('/')[1] === 'register' || pathname.split('/')[1] === 'signin') &&
      <AdminHeader/>
    }
    </>
  )
}

export default Header