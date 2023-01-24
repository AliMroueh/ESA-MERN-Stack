import React from 'react'

export default function CartItemScreen() {
  return (
    <div className='cart'>
        <h1>Shopping Cart</h1>
        <div className='row color-1'>
            <div>
                <img src="./images/p1.jpg" alt="hello"             className="small"></img>
            </div>
            <div>
                <h3>Pants</h3>
                <p>Color: </p><p>Red</p>
            </div>
            <div>
                <h3>$251.00</h3>
            </div>
            <div>
            <select value="20">
                    <option value="1">
                        1
                    </option>
                    <option value="2">
                        2
                    </option>
                    <option value="3">
                        3
                    </option>
                    <option value="4">
                        4
                    </option>
            </select>
            </div>
            <div>
                <h3>$215.00</h3>
                <p><i className="fa-solid fa-trash"></i></p>
            </div>
        </div>
        <div className='row end m-t'>
        <div className="card card-body">
            <ul>
                <li>
                    <h2>
                        Subtotal (7 items) : $800
                    </h2>
                </li>
                <li>
                    <button type="button" className="primary block" >
                        Proceed to Checkout
                    </button>
                </li>
            </ul>
            </div>
        </div>
    </div>
  )
}
