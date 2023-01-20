import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function AdminUsers() {

  const dispatch = useDispatch();

  const userGetAll = useSelector(state => state.userGetAll);
  const {loading, user, error} = userGetAll;

  const userDelete = useSelector(state => state.userDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error : errorDelete
  } = userDelete;

  useEffect(() => {
    dispatch(getAllUser())
    // console.log(user.length)
  }, [dispatch,successDelete]);

  
  const deleteHandler = (id)=>{
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  };

  return (
    <div className='top'>
      <div className='row adminTop'>
          <h1 className='adminTitle'>Users</h1>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? <LoadingBox></LoadingBox>
      : error ? <MessageBox variant="danger">{error}</MessageBox> 
    :
    user.length === 0 ? 
      <MessageBox>There is no user in database</MessageBox>
      :
      <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ISADMIN</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map(user => 
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => deleteHandler(user._id)}
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
