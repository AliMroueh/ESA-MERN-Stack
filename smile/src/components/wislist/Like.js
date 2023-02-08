// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import MessageBox from '../../components/MessageBox';


// const Like = () => {
    
//     const dispatch = useDispatch();
//     const getWishlist = useSelector(state => state.getWishlist);
//     const { loading, favorites, error } = getWishlist;
//     const params = useParams();
//     const {id} = params;

//     useEffect(() => {
//         dispatch(getWishlist(id))
//     }, [])
    

//   return (
//     <div className="row1 top">
//     <div className='col-2'>
//         <h1>Your Wishlist Items</h1>
//       {error && <MessageBox variant="danger">{error}</MessageBox>}
//         {favorites.length === 0?
//         <MessageBox> wishlist is empty. <Link to="/">Go Shopping</Link></MessageBox>
//     :
//     (
//         <ul>
//             {favorites.map(item => (
//                 <li key={item.product}>
//                     <div className="row">
//                         <div>
//                             <img src={item.image} alt=''
//                             className="small"></img>
//                         </div>
//                         <div className='min-30'>
//                             <Link to={`/product/${item.product}`}>{item.name}</Link>
//                         </div>
//                         <div>
//                             <select value={item.qty} >
//                                 {[...Array(item.countInStock).keys()].map(x =>
//                                     <option key={x+1} value={x+1}>
//                                         {x+1}
//                                     </option>
//                                     )}
//                             </select>
//                         </div>
//                         <div>${item.price}</div>
//                         <div>
//                             <button type="button" onClick={()=>deleteWishlistHandler(productId)}>Delete</button>
//                             <button>Add To Cart</button>
//                         </div>
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     )
//     }
//     </div>
// </div>
//   )
// }

// export default Like