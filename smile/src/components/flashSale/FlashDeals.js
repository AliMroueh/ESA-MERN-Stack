
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductss } from "../../actions/productActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import FlashCard from "./FlashCard"
import "./style.css"


const FlashDeals = () => {
  const dispatch = useDispatch();
  //const [products, setProducts] = useState([]);
  const product = useSelector((state) => state.getAllProducts);
  const {loading , products , error} = product;
  
  
  useEffect(() => {
    dispatch(getAllProductss());
  }, [dispatch]);
  if(!loading){
    console.log(products);
  }

  return (
      <>
       {
      loading ? <LoadingBox></LoadingBox>
      :
      error ? <MessageBox variant="danger">{error}</MessageBox>
      :
      (
      <section className='flash'>
        <i className='fa fa-bolt fa-2x'></i>
        <h1 className="title5">Flash Delas</h1>
        <div className='container'>
          <div className='heading f_flex'>
          </div>
          <FlashCard key={products._id} product={products}/>
        </div>
      </section>
        )}
    </>
  )
}

export default FlashDeals