import "./Header.css"
import Search from "./Search"
import Navbar from "./Navbar"
<<<<<<< Updated upstream
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

=======
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
>>>>>>> Stashed changes
  )
}

export default Header