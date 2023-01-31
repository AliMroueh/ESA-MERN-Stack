import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { refreshthetok, renewRefreshToken } from '../actions/refreshTokenAction';
import { deleteUser, getAllUser, signout } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function AdminUsers() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('')

  const userGetAll = useSelector(state => state.userGetAll);
  const {loading, user, error} = userGetAll;

  const userDelete = useSelector(state => state.userDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error : errorDelete
  } = userDelete;

  const userRefresh = useSelector(state => state.userRefresh);
  const {
    loading: loadingRefresh,
    refreshTheToken,
    error: errorRefresh
  } = userRefresh;

  useEffect(() => {
    dispatch(getAllUser())    
  }, [dispatch,successDelete]);

  // useEffect(() => {
  //   const rf = setInterval(() => 
  //     dispatch(renewRefreshToken()),1000 * 9
  //   )
  //   return () => clearInterval(rf)
  // })

  // if(!loadingRefresh){
  //   console.log(refreshTheToken.token)
  //   }
  
  const deleteHandler = (id)=>{
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  };
  let item = {
    imgColor:[{
      img: "imaginaBluey",
      color: 'blue'
    },
    {
      img: "imaginaRedy",
      color: 'red'
    },
    {
      img: "imaginaWhity",
      color: 'white'
    }]
  }
  let the = "white"
  const refreshtheToken = async() => {
    // dispatch(renewRefreshToken())
    // console.log(item.imgColor.find(it => it.color === the).img)
    // return () => clearInterval(rf)
  }
  // if(error == 401){
  //   dispatch(renewRefreshToken())
  //   if(!loadingRefresh){
  //     window.location.reload()
  //   }
  //   // dispatch(getAllUser())
  //   // 
  // }
 console.log(error)
 console.log(errorRefresh)
//  if(errorRefresh == 'Forbidden'){
//   dispatch(signout());
//   navigate('/signin');
//  }
  return (
    <div className='top'>
      <button onClick={refreshtheToken}>refresh</button>
      <input onChange={(e) => setName(e.target.value)} type="text"/>
      <div className='row adminTop'>
          <h1 className='adminTitle'>Users</h1>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {
      // loadingRefresh ? <LoadingBox></LoadingBox>
      // :
      loading ? <LoadingBox></LoadingBox>
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
