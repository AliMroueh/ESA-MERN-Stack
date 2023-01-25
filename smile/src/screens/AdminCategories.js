import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdminCategories() {

  const navigate = useNavigate();

  const addHandler = () =>{
    navigate('/addcategory')
  }

  return (
    <div className='top'>
      <div className='row adminTop'>
          <h1 className='adminTitle'>Categories</h1>
          <button className='add' onClick={() => addHandler()}>Add Category</button>
      </div>
            <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>53698547</td>
                  <td>Toyota</td>
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
