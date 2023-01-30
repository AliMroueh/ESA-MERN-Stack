
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useLocation,useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {  updateCategoryAction,getcategoriesAction } from '../actions/categoryActions';
export default function AdminUpdateCategory() {
  
  
  const [categoryImage, setCategoryImage] = useState();
  
  
  const [name, setName] = useState('');
  
    const dispatch = useDispatch();
  const updateCategory = useSelector((state) => state.updateCategory);
  const { loading, error, categories } = updateCategory;


  const params = useParams();
    const {id} = params;

  
    

    const updateHandler = () => {

        
       
        const formData = new FormData();
        formData.append('categoryImage', categoryImage);
        formData.append('name', name);
        console.log(formData);
        console.log(name,categoryImage);
        dispatch(updateCategoryAction(id,formData));
         
    }
    if (!loading) {
      console.log(categories)
  }else{
    console.log(error)
  }

   

  return (
    <div className='top'>
      <div className='row adminTop'>
          <h1 className='adminTitle'>Update Categories</h1>
      </div>
      <div className='row'>
        <div className='avatar'>
          <img src="images/Product-hunt-amico.svg" alt="categories"/>
        </div>
        <div className='updateCat'>
                  <div className='input_style'>
                        <input
                        type="text"
                        id="catName"
                        placeholder="Enter category name"
                        value={name}
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
                          Update Image
                        </label>
                    </div>
                    <div>
                    <button onClick={updateHandler} type="submit">Update Category</button>
                    </div>
                </div>
                <p id="num-of-files">No Files Chosen</p>
                {/* <img src='./images/p1.jpg' className='catImage' alt='category img'/> */}
        </div>
      </div>
    </div>
  )
}
