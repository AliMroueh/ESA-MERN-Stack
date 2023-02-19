import { USER_STRIPE_FAIL, USER_STRIPE_REQUEST, USER_STRIPE_SUCCESS } from "../constants/stripeConstants";

export const stripePayReducer = (state = {}, action) => {
    switch(action.payload){
        case USER_STRIPE_REQUEST:
            return {loading: true};
        case USER_STRIPE_SUCCESS:
            return {loading: false, url: action.payload}
        case USER_STRIPE_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}