
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {getWishList} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const Likes = () => {
  const [name, setName] = useState('');
  const[qty,setQuantity] = useState(1)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAllWishlist = useSelector(state => state.getAllWishlist);
  const { loading, favorites, error } = getAllWishlist;
  const params = useParams();
  const {id:productId} = params;
  const {id} = params

  
// console.log(_id)
  useEffect(() => {
      dispatch(getWishList({_id:id}))
  }, [dispatch,id])
  console.log(name)
  if(!loading){
    if(favorites){
      console.log(console.log(favorites.wishlist))
    }
  }
  const addToCartHandler = async() =>{
    navigate(`/cart/${productId}?qty=${qty}`);
};

  return (
    <div className="row1 top">
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
                    <div className="row1 color-1">
                        <div>
                            <img src={
                                item.imageColor && item.imageColor[0].image 
                                } alt=''
                            className="small"></img>
                        </div>
                        <div className='min-30'>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        <div>
                            <select value={item.qty} className='select' onChange={e=>setQuantity(e.target.value)}>
                                {[...Array(item.countInStock).keys()].map(x =>
                                    <option key={x+1} value={x+1}>
                                        {x+1}
                                    </option>
                                    )}
                            </select>
                        </div>
                        <div>${item.price}</div>
                        <div>
                           <i className="fa-solid fa-trash" ></i>
                           <span className='add1' onClick={addToCartHandler}><i className="fa-solid fa-plus" style={{padding:"10px 4px"}}></i></span>
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
