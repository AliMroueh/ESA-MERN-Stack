
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  addCategoryAction } from '../actions/categoryActions';
export default function AdminAddCategory() {
  
  const [categoryImage, setCategoryImage] = useState();
 
  const [name, setName] = useState('');
  
    const dispatch = useDispatch();
  const addCategory = useSelector((state) => state.addCategory);
  const { loading, error, categories } = addCategory;
  useEffect(() => {
    console.log(categories)
  }, [dispatch])

  if (!loading) {
    console.log(categories)
  }
  const navigate = useNavigate();
  const insertHandler = () => {
  
    
    const formData = new FormData();
    
    formData.append('categoryImage', categoryImage);
    formData.append('name', name);
    console.log(formData);
    console.log(name,categoryImage);
    dispatch(addCategoryAction(formData))



  }
  const onSubmit = async event => {
    event.preventDefault()

    
   

    
  }


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
                        required onChange={(e) => setName(e.target.value)}
                        ></input>
                </div>

                <div className='row'>
                  <div>
                        <input
                        type="file"
                        id="file"
                        required
                        alt='categoryImage'
                        accept="image/*"
                        onChange={e => setCategoryImage(e.target.files[0])}
                        ></input>
                        <label htmlFor="file">
                          Choose Image
                        </label>
                    </div>
                    <div>
                    <button onClick={ insertHandler} type="submit">Add Category</button>
                    </div>
                </div>
                <p id="num-of-files">No Files Chosen</p>
                {/* <img src='./images/p1.jpg' className='catImage' alt='category img'/> */}
        </div>
      </div>
    </div>
  )
}
