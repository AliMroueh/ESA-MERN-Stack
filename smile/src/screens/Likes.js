import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToWishlist, getWishList } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const Likes = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const getAllWishlist = useSelector(state => state.getAllWishlist);
  const { loading, favorites, error } = getAllWishlist;
  const params = useParams();
  const {id} = params;
  
// console.log(_id)
  useEffect(() => {
      dispatch(getWishList({_id:id}))
  }, [dispatch,id])
  console.log(name)
  if(!loading){
    if(favorites){
      console.log(console.log(favorites.wishlist))
    }
    
    // console.log(Axios.post('/api/products/get/Wishlist',{name}))
  }
  return (
    <div className="row top">
      {loading&& <LoadingBox></LoadingBox>} 
      { error && <MessageBox variant="danger">{error}</MessageBox> } 
      
    <div className='col-2'>
        <h1>Your Wishlist Items</h1>
        {favorites &&
        favorites.wishlist.length === 0?
        <MessageBox> wishlist is empty. <Link to="/">Go Shopping</Link></MessageBox>
    :
    (
        <ul>
            {favorites && favorites.wishlist.map(item => (
                <li key={item.product}>
                    <div className="row">
                        <div>
                            <img src={item.image} alt=''
                            className="small"></img>
                        </div>
                        <div className='min-30'>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        <div>
                            <select value={item.qty} >
                                {[...Array(item.countInStock).keys()].map(x =>
                                    <option key={x+1} value={x+1}>
                                        {x+1}
                                    </option>
                                    )}
                            </select>
                        </div>
                        <div>${item.price}</div>
                        <div>
                            <button type="button" 
                            onClick={()=>addToWishlist(id,item._id)}
                            >Delete</button>
                            <button>Add To Cart</button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
    }
    </div>

</div>
  )
}

export default Likes