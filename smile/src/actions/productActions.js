/* eslint-disable no-unused-vars */

import axios from "axios";
import Axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_ONE_REQUEST,
    PRODUCT_ONE_SUCCESS,
    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,
    PRODUCT_ONE_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,

    WISHLIST_ADD_REQUEST,
    WISHLIST_ADD_SUCCESS,
    WISHLIST_ADD_FAIL,
    WISHLIST_GET_REQUEST,
    WISHLIST_GET_SUCCESS,
    WISHLIST_GET_FAIL,
    WICHLIST_REMOVE_ITEM
} from '../constants/productConstants'
import { productId } from "../reducers/productReducers";

export const listProducts = ({
    pageNumber = '',
    seller = '',
    name = '',
    category = '',
    order = '',
    min = 0,
    max = 0,
    rating = 0,
}) => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        //const {data} = await Axios.get('/api/products');
        // const { data } = await Axios.get(`/api/products?seller=${seller}`);
        const { data } = await Axios.get(
            // `/api/products?seller=${seller}&name=${name}`        );
            // `/api/products?seller=${seller}&name=${name}&category=${category}`
            // `/api/products?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
            `/api/products?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
        );
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

// export const listProducts = () => async (dispatch) => {
//     try {
//         dispatch({ type: PRODUCT_LIST_REQUEST })

//         const { data } = await axios.get('/api/products')

//         dispatch({
//             type: PRODUCT_LIST_SUCCESS,
//             payload: data,
//         })
//     } catch (error) {

//         dispatch({
//             type: PRODUCT_LIST_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message
//         })
//     }
// }
export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productId
    });
    try {
        const { data } = await Axios.get(`/api/products/edit/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};
//insert product

export const listProductCategories = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_CATEGORY_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get(`/api/products/categories`);
        dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
    }
};

export const listProductDetails = (info) => async (dispatch, getState) => {
    const { userSignin: { token } } = getState();

    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })


        const { data } = await axios.post(`/api/products/addproduct`, info,
            {
                headers: { Authorization: `Bearer ${token}` },
                // headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } 
            }
        )


        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,


        })
    } catch (error) {

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



// UPDATE 
export const productUpdateAction = (id, info) => async (dispatch, getState) => {
    const { userSignin: { token } } = getState();

    dispatch({ type: PRODUCT_UPDATE_REQUEST })
    try {
        const { data } = await axios.put(`/api/products/update/${id}`, info,
            {
                headers: { Authorization: `Bearer ${token}` },
            });
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



//DELTE
export const productDeleteAction = (id) => async (dispatch, getState) => {
    const { userSignin: { token } } = getState();

    dispatch({ type: PRODUCT_DELETE_REQUEST })
    try {
        const { data } = await axios.delete(`/api/products/delete/${id}`, { headers: { Authorization: `Bearer ${token}` }, })

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



// GET UPDATE

export const getProducts = (id) => async (dispatch) => {

    dispatch({ type: PRODUCT_ONE_REQUEST })
    try {
        const { data } = await axios.get(`/api/products/edit/${id}`)

        dispatch({
            type: PRODUCT_ONE_SUCCESS,
            payload: data,
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_ONE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const getAllProductss = (data) => async (dispatch) => {
    dispatch({ type: "GET_PRODUCTS_REQUEST" });
    try {
        const { data } = await axios.get(`/api/products/getAllProducts`);
        dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: data });
    } catch (err) {
        dispatch({ type: "GET_PRODUCTS_FAIL", payload: err });
    }
};

export const addToWishlist = (_id, productId) => async (dispatch) => {
    dispatch({ type: WISHLIST_ADD_REQUEST })
    try {
        const { data } = await axios.put(`/api/products/wishlist`, { _id, productId })

        dispatch({
            type: WISHLIST_ADD_SUCCESS,
            payload: data.wishlist,
        })
    } catch (error) {

        dispatch({
            type: WISHLIST_ADD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const getWishList = (_id) => async (dispatch) => {

    dispatch({ type: WISHLIST_GET_REQUEST })
    try {
        const { data } = await Axios.post(`/api/products/get/Wishlist`, _id);
        dispatch({ type: WISHLIST_GET_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: WISHLIST_GET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const createReview = (productId, review) => async (
    dispatch,
    getState
) => {
    dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(
            `/api/products/${productId}/reviews`,
            review,
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
        );
        dispatch({
            type: PRODUCT_REVIEW_CREATE_SUCCESS,
            payload: data.review,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
    }
};
