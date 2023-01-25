
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axios from 'axios';

export default function AdminAddProduct() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [open, setOpen] = useState(false);


  const [image, setImage] = useState();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState(["red","blue","white"]);
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [countInStock, setcountInStock] = useState(1);
 
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, products } = productDetails

  useEffect(() => {
    console.log(products)

  }, [loading])

  const insertHandler = () => {
    console.log(name,category,brand,price,countInStock,description,image)

    // navigate('/')
    const formData = new FormData()
    for(let i=0;i<image.length;i++){
      console.log(image[i])
      formData.append("image", image[i])
    }
    formData.append("name", name);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("countInStock", countInStock);
    formData.append("description", description);
    color.map(col => formData.append("color", col));
    
    console.log(formData);
    console.log({name,category,brand,price,countInStock,description})

    dispatch(listProductDetails(formData))

  }


  // const imageHandler = () => {
  // }


  // const submit = async event => {
  //   event.preventDefault()

  //   const formData = new FormData()
  //   formData.append("image", file)
  //   formData.append("description", description)

  //   const result = await axios.post('/api/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  //   console.log(result.data)
  // }

  return (
    <div className='top'>
      <div className='row adminTop'>
        <h1 className='adminTitle'>Add Product</h1>
      </div>
      <div className='row'>
        <div className='avatar'>
          <img src="images/product-quality-animate.svg" alt="categories" />
        </div>
        <div className='addCat'>
          <div className='input_style'>
            <input
              type="text"
              id="catName"
              placeholder="Enter product name"
              required onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className='input_style'>
            <input type={'text'} required placeholder='brand' onChange={(e) => setBrand(e.target.value)} />
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
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <div className='input_style'>
            <input
              type="number"
              id="countInStock"
              placeholder="Enter Count In Stock"
              required
              onChange={(e) => setcountInStock(e.target.value)}
            ></input>
          </div>
          <div className='input_style'>
            <input
              type="text"
              id="description"
              placeholder="Enter the description"
              required
              onChange={(e) => setDescription(e.target.value)}
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

              <button onClick={insertHandler}>Add Product</button>
            </div>
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
                  // filename={file}
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
                  onChange={e => setImage(e.target.files)}
                ></input>

                {/* <input
                  filename={file}
                  onChange={e => setFile(e.target.files[0])}
                  type="file"
                  accept="image/*"
                ></input> */}

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
                <button type='submit' >Save</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
