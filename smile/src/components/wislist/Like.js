/*import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import MessageBox from '../../components/MessageBox';
import {wishlistDeleteAction} from '../../actions/productActions'


const Like = () => {
    
    const dispatch = useDispatch();
    const whishlist = useSelector(state => state.whishlist);
    const { wishlistItems, error } = whishlist;
    const params = useParams();
    const {id:productId} = params;



    const deleteWishlistHandler = (id) => {
        
    }


  return (
    <div className="row top">
    <div className='col-2'>
        <h1>Your Wishlist Items</h1>
      {error && <MessageBox variant="danger">{error}</MessageBox>}
        {wishlistItems.length === 0?
        <MessageBox> wishlist is empty. <Link to="/">Go Shopping</Link></MessageBox>
    :
    (
        <ul>
            {wishlistItems.map(item => (
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
                            <button type="button" onClick={()=>deleteWishlistHandler(productId)}>Delete</button>
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

export default Like*/