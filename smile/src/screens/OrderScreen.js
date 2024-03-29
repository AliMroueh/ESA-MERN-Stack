import Axios from 'axios'
// import {PayPalButton} from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions'
import axios from 'axios'


export default function OrderScreen(props) {
//    const orderId = props.match.params.id;
    const params = useParams();
    const {id:orderId} = params;
//    const [sdkready, setSdkready] = useState(false);
   const orderDetails = useSelector(state => state.orderDetails);
   const {order, loading, error} = orderDetails;
   const userSignin = useSelector(state => state.userSignin);
   const {userInfo} = userSignin;

   const orderPay = useSelector(state => state.orderPay);
   const {loading: loadingPay, error: errorPay, success: successPay} = orderPay;
   const orderDeliver = useSelector(state => state.orderDeliver);
   const {
       loading: loadingDeliver,
       error: errorDeliver,
       success: successDeliver,
   } = orderDeliver;
 
   const dispatch = useDispatch();
   useEffect(() => {
    //    const addPayPalScript = async () => {
    //        const {data} = await Axios.get('/api/config/paypal');
    //        const script = document.createElement('script');
    //        script.type = 'text/javascipt';
    //        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    //        script.async = true;
    //        script.onload = () =>{
    //            setSdkready(true);
    //        };
    //        document.body.appendChild(script);
    //    };
       if(!order || successPay || successDeliver || (order && order._id !== orderId)){
           dispatch({type: ORDER_PAY_RESET});
           dispatch({ type: ORDER_DELIVER_RESET});
           dispatch(detailsOrder(orderId));
       }
    //    else{
    //        if(!order.isPaid){
    //            if(!window.paypal){
    //                addPayPalScript();
    //            }else{
    //                setSdkready(true);
    //            }
    //        }
    //    }
      
   }, [dispatch, orderId, order, successPay, successDeliver]);
   const successPaymentHandler = () => {
    //    dispatch pay order
    // dispatch(payOrder(order, paymentResult));
    axios.post(`/api/stripe/create-checkout-session`,{
        orderId: orderId
      })
      .then((res) => {
        if(res.data.url){
          window.location.href = res.data.url;
        console.log(res.data.isPay)

        }
      })
      .catch((err) => alert(err.message));
   };
   const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  const successAdPayHandler = () => {
    dispatch(payOrder(order._id))
  }


    return loading ? <LoadingBox></LoadingBox>
    :
    error ? 
    <MessageBox variant="danger">{error}</MessageBox> : (
        <div>
            <h1>Order {order._id}</h1>
            <div className="row1 top">
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name : </strong>{order.shippingAddress.fullName} <br />
                                    <strong>Address : </strong>{order.shippingAddress.address}, {order.shippingAddress.city}
                                </p>
                                {
                                    order.isDelivered ?
                                    <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                                    :
                                    <MessageBox variant="danger">Not Delivered</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method : </strong>{order.paymentMethod}
                                </p>
                                {
                                    order.isPaid ?
                                    <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                    :
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                <ul>
                    {order.orderItems.map(item => (
                        <li key={item.product}>
                            <div className="row1">
                                <div>
                                    <img src={item.image} alt={item.name}
                                    className="small"></img>
                                </div>
                                <div className='min-30'>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>
                                
                                <div>{item.qty} x ${item.price} = ${item.qty*item.price}</div>
                            </div>
                        </li>
                    ))}
                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                    <ul> 
                        <li>
                        <h2>Order Summary</h2>
                        </li>
                        <li>
                            <div className="row1">
                            <div>Items</div>
                            <div>${order.itemsPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row1">
                            <div>Shipping</div>
                            <div>${order.shippingPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                        <div className="row1">
                            <div>Tax</div>
                            {/* <div>${order.taxPrice.toFixed(2)}</div> */}
                        </div>
                        </li>
                        <li>
                        <div className="row1">
                            <div><strong>Order Total</strong></div>
                            <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                        </div>
                        </li>
                        {userInfo.isAdmin && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Order
                  </button>
                </li>
              )}
              

                {userInfo && userInfo.isAdmin && !order.isPaid && (
                    <li>
                   {loadingPay && <LoadingBox></LoadingBox>}
                  {errorPay && (
                    <MessageBox variant="danger">{errorPay}</MessageBox>
                  )}
                    <button
                    type="button"
                    className="primary block"
                    onClick={successAdPayHandler}
                  >
                    Paid
                  </button>
                    </li>
                )}
                
                {userInfo && !userInfo.isAdmin && !order.isPaid && (
                <li>
                  {loadingPay && <LoadingBox></LoadingBox>}
                  {errorPay && (
                    <MessageBox variant="danger">{errorPay}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={successPaymentHandler}
                  >
                    Pay Order
                  </button>
                </li>
              )}
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
