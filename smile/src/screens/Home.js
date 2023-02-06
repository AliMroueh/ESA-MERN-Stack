/* eslint-disable react/jsx-no-undef */
/*import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import data from '../data'
import axios from 'axios'

*/
/*export default function Home() {

import { useSelector } from 'react-redux';
export default function Home() {

  const [products, setProducts] = useState([]);

  // const products = [];

  useEffect(()=>{
    const fetchData = async () => {
      const {data} = await axios.get('/api/products');
      setProducts(data);
    }
    fetchData();
  },[]);
  return (
    <div>
      {products.map(product => 
        <Product key={product._id} product={product}></Product>
        )}
    </div>
  )
}*/
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import Bady from '../components/Bady'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';



const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList)
  // constracture
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts({
      pageNumber:0
    }))
    // console.log(products)
  }, [dispatch])

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
        navigate('/dashboard');
    }
}, [navigate, userInfo]);
  return (
    <div>
 {loading?
        <LoadingBox></LoadingBox> :
        error?
      <MessageBox variant='danger'>{error}</MessageBox> : 
        <>
        {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
          </div>
          </>
}
<div className='both'></div>
    </div>
  )
}

export default Home