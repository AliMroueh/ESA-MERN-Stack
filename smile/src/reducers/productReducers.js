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


    PRODUCT_ONE_REQUEST,
    PRODUCT_ONE_SUCCESS,
    PRODUCT_ONE_FAIL,


    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
    WISHLIST_ADD_REQUEST,
    WISHLIST_ADD_SUCCESS,
    WISHLIST_ADD_FAIL,
    WISHLIST_GET_REQUEST,
    WISHLIST_GET_SUCCESS,
    WISHLIST_GET_FAIL,



    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,
    PRODUCT_REVIEW_CREATE_RESET
} from '../constants/productConstants'


export const getAllProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case "GET_PRODUCTS_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "GET_PRODUCTS_SUCCESS":
        return {
          products: action.payload,
          loading: false,
        };
      case "GET_PRODUCTS_FAIL":
        return {
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };


// export const productListReducer = (state = { products: [] }, action) => {
//     switch (action.type) {
//         case PRODUCT_LIST_REQUEST:
//             return { loading: true, products: [] }

//         case PRODUCT_LIST_SUCCESS:
//             return { loading: false, products: action.payload }

//         case PRODUCT_LIST_FAIL:
//             return { loading: false, error: action.payload }

//         default: return state
//     }
// }

export const productListReducer = (state = {loading: true , products: []}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return { loading: true, success: false };
        case PRODUCT_LIST_SUCCESS:
            // return {loading: false, products : action.payload}
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page,
                success: true,
            };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload, success: false }
        default:
            return state;
    }
};

export const productCategoryListReducer = (
    state = { loading: true, products: [] },
    action
) => {
    switch (action.type) {
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case PRODUCT_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


//get update
export const productId = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_ONE_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_ONE_SUCCESS:
            return { loading: false, products: action.payload }

        case PRODUCT_ONE_FAIL:
            return { loading: false, error: action.payload }

        default: return state
    }
}


//

export const productDetailsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state, success: false }

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, products: action.payload, success: true }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload, success: false }

        default: return state
    }
}


//update
export const productUpdateReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true, ...state, success: false }

        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, products: action.payload, success: true }

        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false }

        default: return state
    }
}




/// delete
export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }

        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default: return state
    }
}

export const listWishlistReducer = (state = { favorite: [] }, action) => {
    switch (action.type) {
        case WISHLIST_ADD_REQUEST:
            return { loading: true, ...state }

        case WISHLIST_ADD_SUCCESS:
            return { loading: false, favorite: action.payload }

        case WISHLIST_ADD_FAIL:
            return { loading: false, error: action.payload }
        default: return state;
    }
}

export const getAllWishlistReducer = (state = {}, action) => {
    switch (action.type) {
        case WISHLIST_GET_REQUEST:
            return { loading: true, ...state }

        case WISHLIST_GET_SUCCESS:
            return { loading: false, favorites: action.payload }

        case WISHLIST_GET_FAIL:
            return { loading: false, error: action.payload }
        default: return state;
    }
}




export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_REVIEW_CREATE_REQUEST:
        return { loading: true };
      case PRODUCT_REVIEW_CREATE_SUCCESS:
        return { loading: false, success: true, review: action.payload };
      case PRODUCT_REVIEW_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_REVIEW_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };