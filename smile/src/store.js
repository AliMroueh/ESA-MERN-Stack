import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import data from "./data";
// import { composeWithDevTools } from 'redux-devtools-extension';
import { userDeleteReducer, userDetailsReducer, userGetAllReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from "./reducers/userReducers";

import { getAllProductsReducer,productListReducer, productDetailsReducer, productDeleteReducer, productId, productUpdateReducer, productCategoryListReducer, listWishlistReducer, getAllWishlistReducer , productReviewCreateReducer} from "./reducers/productReducers";
import { userRefreshReducer } from "./reducers/refreshReducers";
import { addcategoryReducer, deletecategoryReducer, getallcategoriesReducer, updatecategoryReducer } from "./reducers/categoryReducers";
import { cartReducer } from "./reducers/cartReducers";
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer, orderSummaryReducer } from "./reducers/orderReducers";
import { stripePayReducer } from "./reducers/stripeReducers";



const initialState = {
    userSignin: {
        userInfo: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,
        refToken: localStorage.getItem("refToken")
            ? JSON.parse(localStorage.getItem("refToken"))
            : null,
        token: localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null,
    },
     cart :{
        cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] ,

        shippingAddress : localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : [] ,

         paymentMethod : 'PayPal',
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
    getAllProducts : getAllProductsReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    userRefresh : userRefreshReducer,
    productCategoryList: productCategoryListReducer,
    listWishlist: listWishlistReducer,
    getAllWishlist: getAllWishlistReducer,
    cart :cartReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderMineList : orderMineListReducer,
    orderSummary: orderSummaryReducer,
    stripePay: stripePayReducer
})



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk)));

export default store;
