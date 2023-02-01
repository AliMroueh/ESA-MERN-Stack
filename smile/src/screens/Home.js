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
import React from 'react'
import Bady from '../components/mainPage/Bady'
import FlashDeals from '../components/flashSale/FlashDeals'
import TopCate from '../components/new arrival/TopCat' 
import Wrapper from '../components/final/Wrapper'
//import Picture from '../components/custemer picture/Picture'
const Home = () => {
  return (
    <>
    <Bady/>
    <FlashDeals/>
    <TopCate/>
    <Wrapper/>
    </>
  )
}

export default Home