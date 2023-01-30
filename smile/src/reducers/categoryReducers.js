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

export const getallcategoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_REQUEST:
            return { loading: true, categories: [] }

        case GET_ALL_CATEGORIES_SUCCESS:
            return { loading: false, categories: action.payload }

        case GET_ALL_CATEGORIES_FAILURE:
            return { loading: false, error: action.payload }

        default: return state
    }
}



//Add

export const addcategoryReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case ADD_NEW_CATEGORY_REQUEST:
            return { loading: true, ...state }

        case ADD_NEW_CATEGORY_SUCCESS:
            return { loading: false, categories: action.payload }

        case ADD_NEW_CATEGORY_FAILURE:
            return { loading: false, error: action.payload }

        default: return state
    }
}


//update
export const updatecategoryReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case UPDATE_CATEGORIES_REQUEST:
            return { loading: true, ...state }

        case UPDATE_CATEGORIES_SUCCESS:
            return { loading: false, categories: action.payload }

        case UPDATE_CATEGORIES_FAILURE:
            return { loading: false, error: action.payload }

        default: return state
    }
}




/// delete

export const deletecategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CATEGORIES_REQUEST:
            return { loading: true, ...state }

        case DELETE_CATEGORIES_SUCCESS:
            return { loading: false, success: true }

        case DELETE_CATEGORIES_FAILURE:
            return { loading: false, error: action.payload }

        default: return state
    }
}