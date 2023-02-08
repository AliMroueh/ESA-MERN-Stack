import React from 'react'

export default function AdminOrders() {

  return (
    <div className='top'>
      <div className='row1 adminTop'>
          <h1 className='adminTitle'>Orders</h1>
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
                    Details
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
                    Details
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
                    Details
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
