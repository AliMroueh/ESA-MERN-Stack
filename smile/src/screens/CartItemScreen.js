import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartAction';
import MessageBox from '../components/MessageBox';

    const CartItemScreen  = (props)=> {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems, error } = cart;
    const params = useParams();
    const {id:productId} = params;
   
    const {search} = useLocation();
    const qtyInUrl = new URLSearchParams(search).get('qty');

    const qty = qtyInUrl ? Number(qtyInUrl) : 1;

    const color = new URLSearchParams(search).get('color');
    // console.log(color.length)
    // console.log(search)
    
    useEffect( () =>{
        if(productId){
        dispatch(addToCart(productId, qty, color))
        }
    }, [dispatch, productId, qty, color]);

    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }
    return (
        <div className="row1 top">
            <div className='col-2'>
                <h1>Shopping Cart</h1>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {cartItems.length === 0?
                <MessageBox>Cart is empty. <Link to="/">Go Shopping</Link></MessageBox>
            :
            (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.product}>
                            <div className="row1 color-1">
                                <div>
                                    <img src={item.image} alt={item.name}
                                    className="small"></img>
                                </div>
                                <div className='min-30'>
                                    <h3>{item.name}</h3>
                                    <p>color:{item.color}</p>
                                </div>
                                <div>
                                    <select value={item.qty} onChange={
                                        e => dispatch(addToCart(item.product,Number(e.target.value),item.color))
                                    }>
                                        {[...Array(item.countInStock).keys()].map(x =>
                                            <option key={x+1} value={x+1}>
                                                {x+1}
                                            </option>
                                            )}
                                    </select>
                                </div>
                                <div>${item.price}</div>
                                <div>
                                    <i className="fa-solid fa-trash" onClick={() => removeFromCartHandler(item.product)}></i>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )
            }
            </div>
          <div className='row1 end m-t'>
            <div className="card card-body">
            <ul>
                <li>
                    <h2>
                        Subtotal ({cartItems.reduce((a,c) => a + c.qty, 0)} items) : ${cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
                    </h2>
                </li>
                <li>
                    <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>
                        Proceed to Checkout
                    </button>
                </li>
            </ul>
            </div>
        </div>  
        </div>
    )
}
export default CartItemScreen
