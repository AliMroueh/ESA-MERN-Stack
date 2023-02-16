import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { productDeleteAction } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import PayButton from '../components/PayButton';

export default function AdminProducts() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList)
  // constracture
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDel, success, error: errorDel } = productDelete;
  const {
    pageNumber = 1,
  } = useParams();

  useEffect(() => {

    dispatch(listProducts({
      pageNumber
    }))
    // console.log(products)
  }, [dispatch, success])

  if (!loading) {
    console.log(products)
  }

  const addHandler = () => {
    navigate('/addproduct')
  }





  const deleteHandler = (id) => {
    dispatch(productDeleteAction(id))
  }

  if (!loading) {
    console.log(products)
  }

  return (
    <div className='top'>
      <div className='row1 adminTop'>
        <h1 className='adminTitle'>Products</h1>
        <button className='add' onClick={() => addHandler()}>Add Product</button>
      </div>
      {loading ?
        <LoadingBox></LoadingBox>
        :

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>Category</th>
              <th>Price</th>
              <th>Count In Stock</th>
              <th>Rating</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {products.map((row, index) =>
              <tr>
                <td>{row._id}</td>
                <td>{row.name}</td>
                <td>{row.brand}</td>
                <td>{row.price}</td>
                <td>{row.description}</td>
                <td>{row.countInStock}</td>
                <td>

                  <Link to={`/edit/${row._id}`} className="edit">edit</Link>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => deleteHandler(row._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </div>
  )
}

