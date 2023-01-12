import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signin } from '../actions/userActions';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';

export default function SigninScreen() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')
    // const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    // this is in react router v6 instead of props.location.search
    const {search} = useLocation();
    // URLSearchParams convert it to string
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    // here convert it to number
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const userSignin = useSelector(state => state.userSignin);

    const {userInfo, loading, error} = userSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: signin action
        dispatch(signin(email, password));
    };
    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);
    return (
        <div id='signin'> 
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Hello</h1>
                    <p>Sign in to your account</p>
                </div>
                {/* {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>} */}
                <div className='email'>
                    {/* <label htmlFor="email">Email address</label> */}
                    <div className='icon'>
                        <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <span><i class="fa-solid fa-envelope"></i></span>
                    </div>
                </div>
                <div>
                    {/* <label htmlFor="password">Password</label> */}
                    <div className='icon'>
                    <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <span><i className="fa-solid fa-lock"></i></span>
                    </div>
                </div>
                <div className='signIn'>
                    <label>Sign in</label>
                    <button className="primary" type="submit"><i className="fa-solid fa-arrow-right-long"></i></button>
                </div>
                <div>
                    <label/>
                    <div>
                        Don't have an account? {' '}
                        <Link to={`/register?redirect=${redirect}`}>Create</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
