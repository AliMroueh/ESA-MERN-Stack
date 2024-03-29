import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteOrder, listOrders } from '../actions/orderAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteOrder, listOrders } from '../actions/orderActions';

export default function AdminOrders(props) {
  const navigate = useNavigate();
  // const {pathname} = useLocation()
  // const sellerMode = pathname.indexOf('/seller') >= 0;
  // pathname is in react router v6 instead of props.match.path
  // const sellerMode = props.match.path.indexOf('/seller') >= 0;
  // console.log(sellerMode)
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
  //   dispatch(listOrders());
  // }, [dispatch, successDelete]);
    dispatch(listOrders(''));
}, [dispatch, successDelete, userInfo._id]);
  const deleteHandler = (order) => {
    // TODO: delete handler
    if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteOrder(order._id));
      }
  };
  console.log(orders)
  return (
    <div className='top'>
      <div className='row1 adminTop'>
      <h1 className='adminTitle'>Orders</h1>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                {order.user ? 
                <td>{order.user.name}</td>
                 :
                 <td>User is Deleted</td> }
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? 
                // order.paidAt.substring(0, 10) 
                order.paidAt.substring(0, 10)
                : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small edit"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small delete"
                    onClick={() => deleteHandler(order)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}