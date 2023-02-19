import Axios from "axios";
import { USER_STRIPE_FAIL, USER_STRIPE_REQUEST, USER_STRIPE_SUCCESS } from "../constants/stripeConstants";

export const payStripe = () => async (dispatch,getState) => {
    dispatch({type: USER_STRIPE_REQUEST});
    // const {userSignin: {userInfo}} = getState();
    try{
        const {data} = await Axios.post(`/api/stripe/create-checkout-session`
        // ,{
        //     headers: {Authorization: `Bearer ${token}`},
        // }
        );
        dispatch({type: USER_STRIPE_SUCCESS, payload: data});
    }catch(error){
        dispatch({type : USER_STRIPE_FAIL, 
        payload: 
        error.response && error.response.data.message
        ? error.response.data.message : error.message, 
        });
    }
}