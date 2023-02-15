
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductss } from "../../actions/productActions";
import FlashCard from "./FlashCard"
import "./style.css"


const FlashDeals = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const product = useSelector((state) => state.getAllProductss);
  //const {products} = product;
  console.log(products);
  useEffect(() => {
    dispatch(getAllProductss());
  }, [dispatch]);

  return (
    
    <>
      <section className='flash'>
        <i className='fa fa-bolt fa-2x'></i>
        <h1 className="title5">Flash Delas</h1>
        <div className='container'>
          <div className='heading f_flex'>
          </div>
          {products.map((product) => (
          <FlashCard key={product._id} product={product}/>
          ))}
        </div>
      </section>
    </>
  )
}

export default FlashDeals