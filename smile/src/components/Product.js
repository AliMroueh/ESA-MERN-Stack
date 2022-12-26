import React from 'react'
import {Link} from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';

function Product(props) {
    // let product = props.product; //or
    const {product} = props;

    return (

        <div key={product._id} className="card">
            <Link to= {`/product/${product._id}`}>
                <img className="medium" src={product.image} alt="product"/>
            </Link>
            <div className="card-body">
                <Link to= {`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </Link>
                {/* <Rating rating = {product.rating} numReviews = {product.numReviews}></Rating> */}
            {/* <div className="price">${product.price}</div> */}
            <div className="row">
          <div className="price">${product.price}</div>
          <div>
             <Link to={`/seller/${product._id}`}>
               {product.name}
            </Link>
          </div> 
        </div>
                
            </div>
            </div>
    )
}

export default Product
