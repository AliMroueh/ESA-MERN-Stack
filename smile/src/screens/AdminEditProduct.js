import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import { productUpdateAction, getProducts } from '../actions/productActions';
import { useLocation, useNavigate } from 'react-router-dom';




export default function AdminEditProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [open, setOpen] = useState(false);

    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [color, setColor] = useState(["red", "blue", "white"]);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [countInStock, setcountInStock] = useState(1)
    const [image, setImage] = useState('')
    const [imageName, setimageName] = useState([]);

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading, error, products } = productUpdate


    const productid = useSelector((state) => state.productid)
    const { loading: loadingOne, error: errorOne, products: productsOne } = productid


    const params = useParams();
    const { id } = params;
    console.log(id)

    useEffect(() => {

        dispatch(getProducts(id))

        setimageName([]);
        document.getElementsByClassName("imgAndcolor").innerHTML = "";

        if (image.length > 0) {
            for (let i = 0; i < image.length; i++) {
                const newArray = [];
                newArray.push(image[i].name)
                setimageName(imageName => [...imageName, ...newArray])
            }
        }

    }, [dispatch, id, image])



    const updateHandler = () => {
        // navigate('/')
        const formData = new FormData()
        for (let i = 0; i < image.length; i++) {
            console.log(image[i])
            formData.append("image", image[i])
        }
        formData.append("id", id);
        formData.append("name", name);
        formData.append("category", category);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("countInStock", countInStock);
        formData.append("description", description);
        color.map(col => formData.append("color", col));

        console.log(formData);
        // console.log({ name, category, brand, price, countInStock, description })

        dispatch(productUpdateAction(id, formData))

    }
    // if (!loadingOne) {
    //      console.log(productsOne)
    //     setName(productsOne.name);
    // }
    return (
        <div className='top'>
            <div className='row adminTop'>
                <h1 className='adminTitle'>Update Product</h1>
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

                            <label onClick={() => setOpen(true)}>
                                Image/Color
                            </label>
                        </div>
                        <div>
                            <button onClick={updateHandler} >Update</button>
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
                                    onChange={e => setImage(e.target.files)}
                                ></input>
                                <label id='img' htmlFor='file'>
                                    Choose Images
                                </label>

                            </div>
                            <div className='imgAndcolor'>
                                {imageName.length > 0 &&

                                    imageName.map((row, index) =>
                                        <div key={index}>
                                            <p>{row}</p>
                                            <div>
                                                <input id='color' type="color" value="red" onChange={(e) => setColor(e.target.value)}></input>
                                                <div>
                                                    <label htmlFor='color'>color</label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>

                            <div>
                                <button type='' onClick={() => setOpen(false)} >Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );


}






















































