import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import data from "./data";
// import { composeWithDevTools } from 'redux-devtools-extension';
import { userDeleteReducer, userDetailsReducer, userGetAllReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from "./reducers/userReducers";
import {getallcategoriesReducer,addcategoryReducer,updatecategoryReducer,deletecategoryReducer} from "./reducers/categoryReducers";

import { productListReducer, productDetailsReducer, productDeleteReducer, productId, productUpdateReducer } from "./reducers/productReducers";


const initialState = {
    userSignin: {
        userInfo: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,
    }
};
const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userGetAll : userGetAllReducer,
    userDelete : userDeleteReducer,
    getallCategories:getallcategoriesReducer,
    addCategory:addcategoryReducer,
    updateCategory:updatecategoryReducer,
    deleteCategory:deletecategoryReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productid: productId,
    productUpdate: productUpdateReducer

})



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk)));

export default store;
