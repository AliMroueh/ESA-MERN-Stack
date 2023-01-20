import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminProducts() {

  const navigate = useNavigate();

  const addHandler = () =>{
    navigate('/addproduct')
  }

  return (
    <div className='top'>
      <div className='row adminTop'>
          <h1 className='adminTitle'>Products</h1>
          <button className='add' onClick={() => addHandler()}>Add Product</button>
      </div>

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
              <tr>
                <td>53698547</td>
                <td>Toyota</td>
                <td>Cars</td>
                <td>200</td>
                <td>6</td>
                <td>2.5</td>
                <td>
                <button
                    type="button"
                    className="edit"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>53698547</td>
                <td>Toyota</td>
                <td>Cars</td>
                <td>200</td>
                <td>6</td>
                <td>2.5</td>
                <td>
                <button
                    type="button"
                    className="edit"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>53698547</td>
                <td>Toyota</td>
                <td>Cars</td>
                <td>200</td>
                <td>6</td>
                <td>2.5</td>
                <td>
                <button
                    type="button"
                    className="edit"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
          </tbody>
      </table>
    </div>
  )
}
