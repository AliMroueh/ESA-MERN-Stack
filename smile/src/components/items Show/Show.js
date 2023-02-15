/* eslint-disable react-hooks/rules-of-hooks */
import React ,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate, useParams } from 'react-router-dom';
//import { PRODUCT_REVIEW_CREATE_RESET } from '../../constants/productConstants';
import { createReview, addToWishlist, detailsProduct} from '../../actions/productActions';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
//import items from './itemsData';
import './show.css';
//import Rating from '../Rating';




const show = (props) => {
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open,setOpen] = useState(false);
    const [qty,setQuantity] = useState(1);
    const [img,setImg]= useState('');
    const [stock,setStock]= useState(false);

    //Rating and Comment
    /*const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');*/


    const params = useParams();
    const {id:productId} = params;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, products} = productDetails;


    // eslint-disable-next-line no-unused-vars
    const Product = useSelector(state => state.product);
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin;
    const addToCartHandler = async() =>{
        navigate(`/cart/${productId}?qty=${qty}`);
    };

   //description open and close
    const handleOpen = () => {
                setOpen(!open);
                };

   //quantity increment and decrement
    const handleIncrement = () =>{
        if(qty < products.countInStock)
        {
         setQuantity(prevCount => prevCount + 1)
        }else{
            setStock(true)
        }

    }
    const handleDecrement = () =>{
        if( qty > 1)
        {
         setStock(false)
         setQuantity(prevCount => prevCount - 1)
        }
    }

//Details product
   useEffect(()=>{
         dispatch(detailsProduct(productId))
      },[])

 //Add to wishlist
  const likeHandler = () =>{
        dispatch(addToWishlist(userInfo._id,productId))
        navigate(`/like/${userInfo._id}`)
  }

//images with color
  const changeImage = (index) => {
  setImg(products.imageColor[index].image)
}

    return(
                    <>
                        { loading ? (
                            <LoadingBox></LoadingBox> 
                        ) : error ? (
                        <MessageBox variant='danger'>{error}</MessageBox> 
                        ) : (
                    <div className='content'>
                        <div className='imgItem1'>

                            <img src={
                                img.length === 0 ? 
                                products.imageColor && products.imageColor[0].image : img
                                } 
                                alt='' className='img1'>
                                </img>

                        </div>
                        <div className='all'>
                        <h1 className='brand'>{products.brand}</h1>
                        <div className='title'>{products.name}</div>
                        <h1 className='price1'>Price</h1>
                        <h1 className='price2'>{products.price}</h1>
                        <h1 className='titre'>choose Color</h1>
                        <div className='sizeBtn'>
                            {products.imageColor && products.imageColor.map((data,index) =>
                            
                           <button  className='bleu' style={{backgroundColor:  data.color }} onClick={()=>changeImage(index)} key={index}></button>
                            //<button className='black'></button>
                            )}
                        </div>
                        <div>
                            <h1 className='titre'>Quantity</h1>
                            <div className='IncAndDecBtn'>
                                <span className='minus' onClick={handleDecrement}>-</span>
                                <span className='num' onChange={e=>setQuantity(e.target.value)}>{qty}</span>
                                <span className='plus' onClick={handleIncrement} >+</span>
        
                            </div>
                                    <div>
                                        {stock &&
                                        (
                                            <>
                                            <div className='stock'>{products.countInStock} ITEM(S) IN STOCK</div>
                                            <div className="danger">THE REMAINING ITEMS ARE CURRENTLY NOT AVAILABLE.</div>
                                            </>
                                        )}    
                                    </div>
                        </div>
                        <div className='addTo'>
                            <button className='bag' onClick={addToCartHandler}>Add To Bag</button>
                            <button className='like' onClick={ likeHandler } ><i className="fa-regular fa-heart"></i>Add To WishList</button>
                        </div>
                        <div className='description'>
                            {open ? 
                            <div className='description1'>
                            <div className='desctransition1'>
                            <button onClick={handleOpen}>Description</button>
                            <i className='fa fa-chevron-up'></i>
                            </div>
                            <div className='desc'>{products.description}</div>
                            </div>
                            :
                            <div className='desctransition'>
                            <button onClick={handleOpen}>Description</button>
                            <i className='fa fa-chevron-down'></i>
                            </div>
                            }
                        </div>
                        </div>
                    </div>
                    )}
            
        </>
        )}
export default show