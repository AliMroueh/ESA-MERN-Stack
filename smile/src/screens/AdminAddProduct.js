import React, { useState } from 'react'

export default function AdminAddProduct() {

  const [category, setCategory] = useState('');

  const imageHandler = () => {
    
  }

  return (
    <div className='top'>
      <div className='row adminTop'>
          <h1 className='adminTitle'>Add Product</h1>
      </div>
      <div className='row'>
        <div className='avatar'>
          <img src="images/product-quality-animate.svg" alt="categories"/>
        </div>
        <div className='addCat'>
                <div className='input_style'>
                        <input
                        type="text"
                        id="catName"
                        placeholder="Enter product name"
                        required
                        ></input>
                </div>
                <div className='input_style'>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value='car'>
                          car
                      </option>
                      <option value='volvo'>
                          volvo
                      </option>
                      <option value='pickup'>
                          pickup
                      </option>
                    </select>
                </div>
                <div className='input_style'>
                        <input
                        type="number"
                        id="price"
                        placeholder="Enter product price"
                        required
                        ></input>
                </div>
                <div className='input_style'>
                        <input
                        type="number"
                        id="countInStock"
                        placeholder="Enter Count In Stock"
                        required
                        ></input>
                </div>

                <div className='row'>
                  <div>
                        {/* <input
                        type="file"
                        id="file"
                        required
                        alt='category image'
                        accept="image/*"
                        ></input> */}
                        <label onClick={imageHandler()}>
                          Image/Color
                        </label>
                    </div>
                    <div>
                    <button type="submit">Add Product</button>
                    </div>
                </div>
                {/* <p id="num-of-files">No Files Chosen</p> */}
                {/* <img src='./images/p1.jpg' className='catImage' alt='category img'/> */}
        </div>
      </div>
    </div>
  )
}
