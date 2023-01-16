import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHeader() {
  return (
        <header className="row">
          <div>
            Home Page
            </div>
            <div className='row end'>
            <div>
                <Link to="/dashboard">Home</Link>
              </div>
              <div>
              <Link to="/users">Users</Link>
              </div>
              <div>
              <Link to="/products">Products</Link>
              </div>
              <div>
              <Link to="/categories">Categories</Link>
              </div>
            </div>
        </header>
    )
}
