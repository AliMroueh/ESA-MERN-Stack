import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, Route } from 'react-router';
import { Navigate } from 'react-router-dom';
import { renewRefreshToken } from '../actions/refreshTokenAction';

const AdminRoute = ({children}) =>{

    const dispatch = useDispatch()
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
      if(!loadingRefresh){
        const rf = setInterval(() => 
          dispatch(renewRefreshToken(ttt)),1000 * 9
        )
        return () => clearInterval(rf)
      }
      },[dispatch,loadingRefresh])

      // if(!loadingRefresh && errorRefresh === "Forbidden"){
      //   dispatch(signout())
      //   navigate('/signin')
      // }
      console.log(refToken)
      if(!loadingRefresh){
        console.log(errorRefresh)
        console.log(refreshTheToken)
      }

    return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />
}

export default AdminRoute;
