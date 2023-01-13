import React from 'react'
import { useSelector } from 'react-redux';
// import { Redirect, Route } from 'react-router'
import { Navigate } from 'react-router-dom';


const AdminRoute = ({children}) =>{
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />
}

export default AdminRoute;

