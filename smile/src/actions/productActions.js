
import axios from "axios";
import Axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

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
    PRODUCT_ONE_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
} from '../constants/productConstants'

export const listProducts = ({
    pageNumber = '1',
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
        // const {data} = await Axios.get('/api/products');
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

export const listProductDetails = (info) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })


        const { data } = await axios.post(`/api/products/addproduct`, info, { headers: { 'Content-Type': 'multipart/form-data' } })


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
export const productUpdateAction = (id, info) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })

        const { data } = await axios.put(`/api/products/update/${id}`, info)

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
export const productDeleteAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })

        const { data } = await axios.delete(`/api/products/delete/${id}`)

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
    try {
        dispatch({ type: PRODUCT_ONE_REQUEST })

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

