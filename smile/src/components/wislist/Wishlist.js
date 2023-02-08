// /* eslint-disable react-hooks/rules-of-hooks */
// import React from 'react'
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { addToWishlist ,wishlistDeleteAction} from '../../actions/productActions';
// import MessageBox from '../MessageBox';

// const wishlist = (props) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const listWishlist = useSelector(state => state.listWishlist);
//     const { loading, favorites, error } = listWishlist;

//     const params = useParams();
//     const {id:productId} = params;

//     useEffect( () =>{
//         if(productId){
//         // dispatch(addToWishlist(productId))
//         }
//     }, [dispatch, productId]);

//     const deleteWislistHandeler = (_id,productId) => {
//         // delete action
//         dispatch(addToWishlist(_id,productId))
//     }
//     const checkoutHandler = () => {
//         navigate('/signin?redirect=/shipping');
//     }
// return (
//     <div className="row1 top">
//     <div className='col-2'>
//         <h1>Your Wishlist Items</h1>
//         {error && <MessageBox variant="danger">{error}</MessageBox>}
//         {favorites.length === 0?
//         <MessageBox>Wishlist is empty. <Link to="/">Go Shopping</Link></MessageBox>
//     :
//     (
//         <ul>
//             {favorites.map(item => (
//                 <li key={item.product}>
//                     <div className="row">
//                         <div>
//                             <img src={item.image} alt='' className="small"></img>
//                         </div>
//                         <div className='min-30'>
//                             <Link to={`/wishlist/${item.product}`}>{item.name}</Link>
//                         </div>
//                         <div>
//                             <select value={item.qty} onChange={
//                                 e => dispatch(addToWishlist(item.product,Number(e.target.value)))
//                             }>
//                                 {[...Array(item.countInStock).keys()].map(x =>
//                                     <option key={x+1} value={x+1}>
//                                         {x+1}
//                                     </option>
//                                     )}
//                             </select>
//                         </div>
//                         <div>${item.price}</div>
//                         <div>
//                             <button type="button" onClick={() => deleteWislistHandeler(item.product)}>Delete</button>
//                         </div>
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     )
//     }
//     </div>
// </div>
// )
// }


// export default wishlist