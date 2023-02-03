import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, Route } from 'react-router'
import { Navigate, useNavigate } from 'react-router-dom';
import { renewRefreshToken } from '../actions/refreshTokenAction';
import { signout } from '../actions/userActions';


const AdminRoute = ({children}) =>{

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo, refToken,token} = userSignin;

    const userRefresh = useSelector(state => state.userRefresh);
    const {
      loading: loadingRefresh,
      refreshTheToken,
      error: errorRefresh
    } = userRefresh;

    let ttt = localStorage.getItem("refToken") && JSON.parse(localStorage.getItem("refToken"))
    let lod = loadingRefresh;
    useEffect(() => {
      let ttt = localStorage.getItem("refToken") && JSON.parse(localStorage.getItem("refToken"))
      if(ttt && !lod){
        const rf = setInterval(() => 
          dispatch(renewRefreshToken(ttt)),1000 * 9 * 60
        )
        return () => clearInterval(rf)
      }
      },[dispatch,ttt,lod])

      // if(!loadingRefresh && errorRefresh === "Forbidden"){
      //   dispatch(signout())
      //   navigate('/signin')
      // }
      console.log(ttt)
      if(!loadingRefresh && ttt && errorRefresh === "Forbidden"){
        // dispatch(signout())
        // navigate('/signin')
        console.log(errorRefresh)
        console.log(refreshTheToken)
      }else{
        console.log(refreshTheToken)
      }
    //   if(!loadingRefresh){
    //     errorRefresh
    //     ?
    //     console.log(errorRefresh)
    //     : 
    //     dispatch(renewRefreshToken())
    //   }

    return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />
}

export default AdminRoute;

