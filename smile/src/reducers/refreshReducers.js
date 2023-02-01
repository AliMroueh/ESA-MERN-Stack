import { USER_REFRESH_FAIL, USER_REFRESH_REQUEST, USER_REFRESH_SUCCESS } from "../constants/refreshConstants";

export const userRefreshReducer = (state = {refreshTheToken:''}, action) => {
    switch(action.type){
        case USER_REFRESH_REQUEST:
            return {loading: true};
        case USER_REFRESH_SUCCESS:
            return {loading: false, refreshTheToken: action.payload};
        case USER_REFRESH_FAIL:
            return {loading: false, error: action.payload};
            default:
                return state;
    }
}