/* eslint-disable react-hooks/rules-of-hooks */
import React ,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate, useParams } from 'react-router-dom';
import { PRODUCT_REVIEW_CREATE_RESET } from '../../constants/productConstants';
import { createReview, addToWishlist, detailsProduct} from '../../actions/productActions';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
//import items from './itemsData';
import './show.css';
import Rating from '../Rating';




const show = (props) => {
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open,setOpen] = useState(false);
    const [qty,setQuantity] = useState(1);
    const [img,setImg]= useState('');
    const [stock,setStock]= useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    const params = useParams();
    const {id:productId} = params;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, products} = productDetails;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
      loading: loadingReviewCreate,
      error: errorReviewCreate,
      success: successReviewCreate,
    } = productReviewCreate;
  
    useEffect( () =>{
        if (successReviewCreate) {
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
          }
        dispatch(detailsProduct(productId))
}, [dispatch, productId, successReviewCreate]);
    // eslint-disable-next-line no-unused-vars
    const Product = useSelector(state => state.product);
    /*useEffect( () =>{
        dispatch(productDetails(productId))
    }, [dispatch, productId]);*/
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


   useEffect(()=>{
         dispatch(detailsProduct(productId))
      },[])

  const likeHandler = () =>{
        dispatch(addToWishlist(userInfo._id,productId))
        navigate(`/like/${userInfo._id}`)
  }


       const changeImage = (index) => {
        setImg(products.imageColor[index].image)
      }


      const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
          dispatch(
            createReview(productId, { rating, comment, name: userInfo.name })
          );
        } else {
          alert('Please enter comment and rating');
        }
      };

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
            <div>
            <h2 id="reviews">Reviews</h2>
            {products.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {products.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </>
        )}
export default show