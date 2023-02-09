import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_ADD_ITEM_FAIL } from "../constants/cartConstants"
//  getState is to get access to redux store
export const addToCart = (productId, qty) => async (dispatch, getState)=>{
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
