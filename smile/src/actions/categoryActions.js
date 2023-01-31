import axios from "axios";
import {
GET_ALL_CATEGORIES_REQUEST,
GET_ALL_CATEGORIES_SUCCESS,
GET_ALL_CATEGORIES_FAILURE,

ADD_NEW_CATEGORY_REQUEST  ,
ADD_NEW_CATEGORY_SUCCESS  ,
ADD_NEW_CATEGORY_FAILURE  ,

UPDATE_CATEGORIES_REQUEST ,
UPDATE_CATEGORIES_SUCCESS ,
UPDATE_CATEGORIES_FAILURE ,

DELETE_CATEGORIES_REQUEST ,
DELETE_CATEGORIES_SUCCESS ,
DELETE_CATEGORIES_FAILURE ,

GET_ONE_CATEGORIES_REQUEST,
GET_ONE_CATEGORIES_SUCCESS,
GET_ONE_CATEGORIES_FAILURE
} from '../constants/categoryConstants'



export const getallCategoriesAction = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_CATEGORIES_REQUEST })

        const { data } = await axios.get('/api/categories/get')

        dispatch({
            type: GET_ALL_CATEGORIES_SUCCESS,
            payload: data,
        })
    } catch (error) {

        dispatch({
            type: GET_ALL_CATEGORIES_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//insert category

export const addCategoryAction = (info) => async (dispatch) => {
    try {
        dispatch({ type: ADD_NEW_CATEGORY_REQUEST })

        const { data } = await axios.post(`/api/categories/create`, info, { headers: {'Content-Type': 'multipart/form-data'}})


        dispatch({
            type: ADD_NEW_CATEGORY_SUCCESS,
            payload: data,
        })
    } catch (error) {

        dispatch({
            type: ADD_NEW_CATEGORY_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



// UPDATE 
export const updateCategoryAction = ( id,info) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORIES_REQUEST })

        const { data } = await axios.put(`/api/categories/category/update/${id}`, info)

        dispatch({
            type: UPDATE_CATEGORIES_SUCCESS,
            payload: data,
        })
    } catch (error) {

        dispatch({
            type: UPDATE_CATEGORIES_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



//DELTE
export const deleteCategoryAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORIES_REQUEST })

        const { data } = await axios.delete(`/api/categories/category/delete/${id}`)

        dispatch({
            type: DELETE_CATEGORIES_SUCCESS,
            payload: data,
        })
    } catch (error) {

        dispatch({
            type: DELETE_CATEGORIES_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



