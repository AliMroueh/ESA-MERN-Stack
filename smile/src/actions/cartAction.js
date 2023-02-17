import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_ADD_ITEM_FAIL, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants"
import { detailsProduct } from "./productActions";
//  getState is to get access to redux store
export const addToCart = (productId, qty, color) => async (dispatch, getState)=>{
        const {data} = await Axios.get(`/api/products/edit/${productId}`);
        const {
                cart: { cartItems },
              } = getState();
               
                dispatch({
                  type: CART_ADD_ITEM,
                  payload: {
                    name: data.name,
                    price: data.price,
                    image:data.imageColor[0].image,
                    color: color,
                    countInStock: data.countInStock,
                    product: data._id,
                    qty,
                  },
                });
                localStorage.setItem(
                  'cartItems',
                  JSON.stringify(getState().cart.cartItems)
                );
              }


export const removeFromCart = (productId) => async (dispatch, getState) =>{
        dispatch({type : CART_REMOVE_ITEM, payload : productId});
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
  localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data});
}