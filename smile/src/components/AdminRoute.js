import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, Route } from 'react-router';
import { Navigate } from 'react-router-dom';
import { renewRefreshToken } from '../actions/refreshTokenAction';
import { signout } from '../actions/userActions';

const AdminRoute = ({children}) =>{

    const dispatch = useDispatch()
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    // const userRefresh = useSelector(state => state.userRefresh);
    // const {
    //   loading: loadingRefresh,
    //   refreshTheToken,
    //   error: errorRefresh
    // } = userRefresh;
    // useEffect(() => {
    //   let ttt = localStorage.getItem("refToken") && JSON.parse(localStorage.getItem("refToken"))
    //   if(!loadingRefresh){
    //     const rf = setInterval(() => 
    //       dispatch(renewRefreshToken(ttt)),1000 * 9
    //     )
    //     return () => clearInterval(rf)
    //   }
    //   },[dispatch,loadingRefresh])

    //   if(!loadingRefresh && errorRefresh){
    //     console.log(errorRefresh)
    //     if(errorRefresh === 'Forbidden'){
    //       dispatch(signout())
    //     }
        
    //   }else if(!loadingRefresh){
    //     console.log(refreshTheToken)
    //   }

    const userRefresh = useSelector(state => state.userRefresh);
    const {
      loading: loadingRefresh,
      refreshTheToken,
      error: errorRefresh
    } = userRefresh;
    useEffect(() => {
      let ttt = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"))
      console.log(ttt.rToken)
      if(!loadingRefresh){
        
        const rf = setInterval(() => 
          dispatch(renewRefreshToken(ttt.rToken)),1000 * 9
        )
        return () => clearInterval(rf)
      }
      },[dispatch,loadingRefresh])

      if(!loadingRefresh && errorRefresh){
        console.log(errorRefresh)
        if(errorRefresh === 'Forbidden'){
          dispatch(signout())
        }
        
      }else if(!loadingRefresh){
        console.log(refreshTheToken)
      }

    return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />
}

export default AdminRoute;
