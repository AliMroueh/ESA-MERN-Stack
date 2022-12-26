import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import data from '../data'
import axios from 'axios'

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
}
