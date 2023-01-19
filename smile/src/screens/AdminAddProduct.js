import React, { useState } from 'react'

export default function AdminAddProduct() {

  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);

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
                        <label onClick={() => setOpen(true)}>
                          Image/Color
                        </label>
                    </div>
                    <div>
                    <button type="submit">Add Product</button>
                    </div>
                </div>
        </div>
      </div>
      {open && 
      <div className='img_color_Add'>
        <div className='add_items'>
            <span id='close' onClick={() => setOpen(false)}>
              <i className="fa-solid fa-circle-xmark"></i>
            </span>
            <div className='choose_img'>
              <div>
                  <input
                  type="file"
                  id="file"
                  required
                  alt='category image'
                  accept="image/*"
                  multiple
                  ></input>
                  <label id='img' htmlFor='file'>
                    Choose Images
                  </label>
              </div>
              {/* <div>
                <input type="color" onChange={(e) => console.log(e.target.value)}></input>
                <p>
                    #50f056
                  </p>
              </div> */}
              <div className='imgAndcolor'>
                <div>
                  <p>adkjo.png</p>
                  <p>
                    <input id='color' type="color" onChange={(e) => console.log(e.target.value)}
                    ></input>
                    <label htmlFor='color'>#806f69</label>
                  </p>
                </div>
                <div>
                  <p>adkjo.png</p>
                  <p>
                    <input id='color' type="color" onChange={(e) => console.log(e.target.value)}
                    ></input>
                    <label htmlFor='color'>#806f69</label>
                  </p>
                </div>
                <div>
                  <p>adkjo.png</p>
                  <p>
                    <input id='color' type="color" onChange={(e) => console.log(e.target.value)}
                    ></input>
                    <label htmlFor='color'>#806f69</label>
                  </p>
                </div>
                <div>
                  <p>adkjo.png</p>
                  <p>
                    <input id='color' type="color" onChange={(e) => console.log(e.target.value)}
                    ></input>
                    <label htmlFor='color'>#806f69</label>
                  </p>
                </div>
              </div>
              <div>
                <button>Save</button>
              </div>
            </div>
        </div>
      </div>
      }
    </div>
  )
}
