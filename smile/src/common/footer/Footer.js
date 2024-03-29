import React from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import "./footer.css";
function Footer() {
  const {pathname} = useLocation();

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  return (
    <>

        {((userInfo && !userInfo.isAdmin) || !userInfo) &&
        !(pathname.split('/')[1] === 'register' || pathname.split('/')[1] === 'signin') && 

   <footer>
    <div className='container18 d-flex'>
      <div className='box2'>
        <h1>S M I L Y</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.</p>
        <div className='icon3 f_flex'>
          <div className='img1 d_flex'>
            <i className='fa-brands fa-app-store-ios'></i>
            <span>App Store</span>
          </div>
          <div className='img1 d_flex'>
            <i className='fa-brands fa-google-play'></i>
            <span>Google Play</span>
          </div>
    </div>
      </div>

      <div className='box2'>
        <h2>About Us</h2>
        <ul>
          <li>Careers</li>
          <li>Our Stores</li>
          <li>Our Cares</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className='box2'>
        <h2>Customer Care</h2>
        <ul>
          <li>Help Center </li>
          <li>How to Buy </li>
          <li>Track Your Order </li>
          <li>Corporate & Bulk Purchasing </li>
          <li>Returns & Refunds </li>
        </ul>
      </div>
      <div className='box2'>
        <h2>Contact Us</h2>
        <ul>
          <li>lebanon Nabtieh</li>
          <li>Email: smily.help@gmail.com</li>
          <li>Phone: +961 76345678</li>
        </ul>
      </div>
    </div>
  </footer>
}

  </>
)
}

export default Footer

  