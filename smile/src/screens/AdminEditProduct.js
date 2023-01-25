import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import { productUpdateAction, getProducts } from '../actions/productActions';
import { useLocation, useNavigate } from 'react-router-dom';




export default function Edit() {


    const [name, setName] = useState('yasso')
    const [brand, setBrand] = useState('german/lebanese')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('new tasa')
    const [countInStock, setcountInStock] = useState(1)
    // const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading, error, products } = productUpdate


    const productid = useSelector((state) => state.productid)
    const { loading: loadingAll, error: errorAll, products: productsAll } = productid

    // const productid = useSelector((state) => state.productid)

    const navigate = useNavigate();

    const params = useParams();
    const { id } = params;
    console.log(id)



    // constracture

    // const { loading: loadingDel, success, error: errorDel } = productid;

    useEffect(() => {

        dispatch(getProducts(id))
        console.log(productsAll)

    }, [dispatch, id])

    if (!loading) {
        console.log(products)
    }

    const updateHandler = () => {
        dispatch(productUpdateAction(id, { name, brand, price, description, countInStock }))
    }


    //get info 



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
                                <button onSubmit={() => updateHandler()} >Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );


}























































