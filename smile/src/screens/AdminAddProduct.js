import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import { useNavigate } from 'react-router-dom';
import { getallCategoriesAction } from '../actions/categoryActions';

export default function AdminAddProduct() {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const getallCategories = useSelector((state) => state.getallCategories);

  const { loading: loadingGet, error: errorGet, categories } = getallCategories;

  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);


  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  // const [color, setColor] = useState(['grey', 'red', 'yellow']);
  // const color = []
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [countInStock, setcountInStock] = useState(1);
  const [imageName, setimageName] = useState([]);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, products } = productDetails
  const [color, setColor] = useState([]);

  useEffect(() => {

    dispatch(getallCategoriesAction())
    setimageName([]);
    document.getElementsByClassName("imgAndcolor").innerHTML = "";

    if (image.length > 0) {
      setColor([])
      for (let i = 0; i < image.length; i++) {
        const newArray = [];
        newArray.push(image[i].name)
        setimageName(imageName => [...imageName, ...newArray])
        setColor(color => [...color, '#f00'])
        // color.push('red')
      }
    }

  }, [image, dispatch])


  if (!loading) {
    console.log(categories)
  }

  const insertHandler = () => {

    console.log(color, name, category, brand, price, countInStock, description, image)

    // navigate('/')

    if(name === "" || brand === ""  || price === "" || countInStock ==="" || description === "" || category === ""){
     
    setStart(true)
    }else{
    const formData = new FormData()
    for (let i = 0; i < image.length; i++) {
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
    console.log({ name, category, brand, price, countInStock, description })

    dispatch(listProductDetails(formData))
    if (!loading && error) {
      console.log(error)
    } else {
      //navigate('/products')
      console.log('gooooooooooooooooooooooooood')
    }
    }
  }

  const changeColor = (value, index) => {
    color[index] = value;
    setColor(color)
    console.log(color)
  }


  return (
    <div className='top'>

      {start &&
    <div style={{color:"red",fontWeight:"bold"}}>YOU HAVE TO ADD A NAME</div>}
      <div></div>
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
            {loadingGet ?
              <div>loading...</div>
              :
              <div className='input_style'>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((r, index) =>
                    <option value={r.name}>
                      {r.name}
                    </option>
                  )}
                </select>
              </div>
            }
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
                  onChange={e => setImage(e.target.files)}
                ></input>


                <label id='img' htmlFor='file'>
                  Choose Images
                </label>

              </div>


              <div className='imgAndcolor'>
                {imageName.length > 0 &&

                  imageName.map((row, index) =>
                  // console.log(index)
                  {
                    return (
                      <div key={index}>

                        <p>{row}</p>
                        <p>{color[index]}</p>
                        <input className='color' type="color" value={color[index]} onChange={(e) => changeColor(e.target.value, index)} />

                      </div>)
                    //    <div>
                    //       <label htmlFor='color'>nnnn</label>
                    //     </div>  
                    //  </div>

                  })}
              </div>

              <div>
                <button type='button' onClick={() => setOpen(false)} >Save</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}










// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {  addCategoryAction } from '../actions/categoryActions';
// export default function AdminAddCategory() {
  
//   const [open,setOpen]=useState(false);
//   const [categoryImage, setCategoryImage] = useState();
 
//   const [name, setName] = useState('');
  
//     const dispatch = useDispatch();
//   const addCategory = useSelector((state) => state.addCategory);
//   const { loading, error, categories } = addCategory;
//   useEffect(() => {
//     console.log(categories)
//   }, [dispatch])

// //   useEffect(() => {

// //     if (insertHandler() && input.text="") {
// //         setShow(false);
// //     }

// // }, [category.loading]);

//   if (!loading) {
//     console.log(categories)
//   }
//   const navigate = useNavigate();
//   const insertHandler = () => {
  
//     if(name == "" || categoryImage == ""){
     
//       setOpen(true)
//     }else{
//     const formData = new FormData();
    
//     formData.append('categoryImage', categoryImage);
//     formData.append('name', name);
//     console.log(formData);
//     console.log(name,categoryImage);
  
//     dispatch(addCategoryAction(formData))
//   navigate("/categories")
  
//   }



//   }
//   const onSubmit = async event => {
//     event.preventDefault()

    
   

    
//   }


//   return (
//     <div className='top'>
//       <div className='row adminTop'>
//           <h1 className='adminTitle'>Add Categories</h1>
//       </div>
//       <div className='row'>
//         <div className='avatar'>
//           <img src="images/Product-hunt-amico.svg" alt="categories"/>
//         </div>
//         <div className='addCat'>
//           {open &&
//           <div style={{color:"red",fontWeight:"bold"}}>YOU HAVE TO ADD A NAME OR IMAGE</div>}
//                   <div className='input_style'>
//                         <input
//                         type="text"
//                         id="catName"
//                         placeholder="Enter category name"
//                         required onChange={(e) => setName(e.target.value)}
//                         ></input>
//                 </div>

//                 <div className='row'>
//                   <div>
//                         <input
//                         type="file"
//                         id="file"
//                         required
//                         alt='categoryImage'
//                         accept="image/*"
//                         onChange={e => setCategoryImage(e.target.files[0])}
//                         ></input>
//                         <label htmlFor="file">
//                           Choose Image
//                         </label>
//                     </div>
//                     <div>
//                     <button onClick={ insertHandler} type="submit">Add Category</button>
//                     </div>
//                 </div>
//                 <p id="num-of-files">No Files Chosen</p>
//                 {/* <img src='./images/p1.jpg' className='catImage' alt='category img'/> */}
//         </div>
//       </div>
//     </div>
//   )
// }


