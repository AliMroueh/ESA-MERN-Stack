/* eslint-disable react-hooks/rules-of-hooks */
import React ,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../actions/cartAction';
import items from './itemsData';
import './show.css';




const show = (props) => {
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open,setOpen] = useState(false);
    const [qty,setQuantity] = useState(1);
    const [img,setImg]= useState(false);
    const [stock,setStock]= useState(false);


    const params = useParams();
    const {id:productId} = params;
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {product} = props;

    // eslint-disable-next-line no-unused-vars
    const Product = useSelector(state => state.product);

    const addToCartHandler = async() =>{
        navigate(`/cart/${productId}?qty=${qty}`);
    };

   //description open and close
    const handleOpen = () => {
                setOpen(!open);
                };

   //quantity increment and decrement
    const handleIncrement = () =>{

        if( qty < 8)
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


    return(
        <>
        {items.map((items, index) => {
                return (
                    <>
                    <div className='content'>
                        <div className='Carousel'>
                        </div>
                        <div className='imgItem1'>
                            {img ?<img src='images/jump2.webp' alt='' className='img1'/>: <img src='images/jump2.webp' alt=''  className='img1'/>}
                        </div>
                        <div className='all'>
                        <h1 className='brand'>{items.brand}</h1>
                        <div className='title'>{items.name}</div>
                        <h1 className='price1'>Price</h1>
                        <h1 className='price2'>{items.price}</h1>
                        <h1 className='titre'>choose Color</h1>
                        <div className='sizeBtn'>
                            <button className='bleu'></button>
                            <button className='black'></button>
                        </div>
                        <div>
                            <h1 className='titre'>Quantity</h1>
                            <div className='IncAndDecBtn'>
                                <span className='minus' onClick={handleDecrement}>-</span>
                                <span className='num'>{qty}</span>
                                <span className='plus' onClick={handleIncrement} >+</span>
                            </div>
                            { stock &&
                            <div>
                                <div className='stock'>8 ITEM(S) IN STOCK</div>
                                <div className='stock2'>THE REMAINING ITEMS ARE CURRENTLY NOT AVAILABLE.</div>
                            </div>
                            }
                        </div>
                        <div className='addTo'>
                            <button className='bag' onClick={addToCartHandler}>Add To Bag</button>
                            <button className='like'  ><i class="fa-regular fa-heart"></i>Add To WishList</button>
                        </div>
                        <div className='description'>
                            {open ? 
                            <div className='description1'>
                            <div className='desctransition1'>
                            <button onClick={handleOpen}>Description</button>
                            <i className='fa fa-chevron-up'></i>
                            </div>
                            <div className='desc'>{items.description}</div>
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
                    </>
                    )
                })}
                    </>)}
export default show