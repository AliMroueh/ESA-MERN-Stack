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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Bady from '../components/Bady'



const Home = () => {
  const navigate = useNavigate();

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
        navigate('/dashboard');
    }
}, [navigate, userInfo]);
  return (
    <>

    <Bady/>
    </>
  )
}

export default Home