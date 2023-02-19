import axios, { Axios } from 'axios';
import { USER_REFRESH_FAIL, USER_REFRESH_REQUEST, USER_REFRESH_SUCCESS } from '../constants/refreshConstants';

    export const renewRefreshToken = (refToken) => async (dispatch,getState) => {
        dispatch({type: USER_REFRESH_REQUEST});
        try{
            // const refToken = localStorage.getItem("refToken")
            // && JSON.parse(localStorage.getItem("refToken"));
            const {userSignin: {userInfo}} = getState();
            // const ref = refToken.slice(1,refToken.length-1)
            const {data} = await axios.get(`/api/refresh/${refToken}`);
            dispatch({type: USER_REFRESH_SUCCESS, payload: data});
            let token = data.token;
            localStorage.setItem('userInfo',JSON.stringify({...userInfo,token}))
            
            // localStorage.setItem("userInfo", JSON.stringify(userInfo))
        }catch(error){
            dispatch({type : USER_REFRESH_FAIL, 
            payload: 
            error.response && error.response.data.message
            ? error.response.data.message : error.message, 
            });
        }
    }

      // Keep checking after a certain time
    //   export const refreshthetok = () => {
    //   return setInterval(() => {
    //     renewRefreshToken();
    //   }, ACCESS_TOKEN_EXPIRES_TIME);
    
    // //   return () => clearInterval(intervalId);
    // }
    