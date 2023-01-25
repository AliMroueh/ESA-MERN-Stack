import React from 'react'

export default function AdminAddCategory() {

  return (
    <div className='top'>
      <div className='row adminTop'>
          <h1 className='adminTitle'>Add Categories</h1>
      </div>
      <div className='row'>
        <div className='avatar'>
          <img src="images/Product-hunt-amico.svg" alt="categories"/>
        </div>
        <div className='addCat'>
                  <div className='input_style'>
                        <input
                        type="text"
                        id="catName"
                        placeholder="Enter category name"
                        required
                        ></input>
                </div>

                <div className='row'>
                  <div>
                        <input
                        type="file"
                        id="file"
                        required
                        alt='category image'
                        accept="image/*"
                        ></input>
                        <label htmlFor="file">
                          Choose Image
                        </label>
                    </div>
                    <div>
                    <button type="submit">Add Category</button>
                    </div>
                </div>
                <p id="num-of-files">No Files Chosen</p>
                {/* <img src='./images/p1.jpg' className='catImage' alt='category img'/> */}
        </div>
      </div>
    </div>
  )
}
