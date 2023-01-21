import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    // jsconfig.json = auto import functionality works perfect in your react project
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success : successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile;

    const dispatch = useDispatch();
//  console.log(user.name)
  
    useEffect(() => {
        if(!user){
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(detailsUser(userInfo._id));
        }else{
            setName(user.name);
            setEmail(user.email);
            }
    },[dispatch,userInfo._id,user]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if(password !== confirmPassword){
            alert('Password And Confirm Password Are Not Matched');
        }else{
        // dispatch(updateUserProfile({userId: user._id,name, email, password}))
        dispatch(
            updateUserProfile({
              userId: user._id,
              name,
              email,
              password,
            })
          );
        }
    }

    return (
        <div id='profile'>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {successUpdate && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
                    <div>
                    <div className='icon'>
                        <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        ></input>
                        <span><i className="fa-solid fa-user"></i></span>
                    </div>
                    </div>
                    {/* <div>
                        <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div> */}

                    <div>
                    <div className='icon'>
                        <input 
                        id="email" 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <span><i className="fa-solid fa-envelope"></i></span>
                    </div>
                    </div>

                    <div>
                    <div className='icon'>
                        <input id="password" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
                        <span><i className="fa-solid fa-lock"></i></span>
                    </div>
                    </div>

                    <div>
                    <div className='icon'>
                        <input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="Enter confirm password" 
                        onChange={(e) => setConfirmPassword(e.target.value)}></input>
                        <span><i className="fa-solid fa-lock"></i></span>
                    </div>
                    </div>

                    <div className='signIn'>
                        <label>Update</label>
                        <button className="primary" type="submit"><i className="fa-solid fa-arrow-right-long"></i></button>
                    </div>
                    {/* <div>
                        <label/>
                        <button className="primary" type="submit">Update</button>
                    </div> */}
                    </>
                }
            </form>
        </div>
    )
}