import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHeader() {
  return (
        <header className="admin row1">
            <div className='homeAdmin'>
            Home Page
            </div>
            <div className='row1 links'>
                <div>
                  <Link to="/dashboard">Dashboard</Link>
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
                <div>
                  <Link to="/orders">Orders</Link>
                </div>
            </div>
        </header>
    )
}
