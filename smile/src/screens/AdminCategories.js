import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom';
import { addCategory, getallCategoriesAction, deleteCategoryAction } from '../actions/categoryActions';
import { } from '../actions/categoryActions';
export default function AdminCategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getallCategories = useSelector((state) => state.getallCategories);

  const { loading, error, categories } = getallCategories;

  const deleteCategory = useSelector((state) => state.deleteCategory);
  const { loading: loadingDel, success, error: errorDel } = deleteCategory;

  useEffect(() => {

    dispatch(getallCategoriesAction())


  }, [dispatch, success])

  if (!loading) {
    console.log(categories)
  }




  const addHandler = () => {
    navigate('/addcategory')
  }

  const deleteHandler = (id) => {
    dispatch(deleteCategoryAction(id))
  }

  return (
    <div className='top'>
      <div className='row adminTop'>
        <h1 className='adminTitle'>Categories</h1>
        <button className='add' onClick={() => addHandler()}>Add Category</button>
      </div>
      {loading ?
        <div>loading...</div>
        :

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((row, index) =>
              <tr>
                <td>{row._id}</td>
                <td>{row.name}</td>
                <td>
                  <Link to={`/updatecategory/${row._id}`}>
                    <button
                      type="button"
                      className="edit"

                    >
                      Edit
                    </button>
                  </Link>
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
