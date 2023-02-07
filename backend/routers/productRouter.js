
import express from "express";
import Product from '../models/productModel.js';
import User from '../models/userModel.js'
import multer from 'multer';
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { isAdmin } from "../utils.js";
import passport from 'passport';

import { validateProductRequest, isRequestValidated } from "../validators/authentication.js";
const router = express.Router();
import expressAsyncHandler from "express-async-handler";

const productRouter = express.Router();

//image upload
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));

    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});
var upload = multer({
    storage: storage,
}).array('image');


// insert an product into data base

productRouter.post("/addproduct", 
// validateProductRequest, isRequestValidated, 
upload, (req, res) => {
    // console.log(req.body)
    // console.log(req.files)

 

    const { color } = req.body;
        for(let i=0;i<color.length;i++){
        if(color[i] == color[i+1]){
            return res.status(401).send({message: "duplicate color"})
            break;
        }
    }

    let imageColor = [];

    if (req.files.length > 0) {
        imageColor = req.files.map((file, i) => {
            return { image: 'http://localhost:5000/public/' + file.filename, color: color[i] }
        })
    }
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        brand: req.body.brand,
        price: req.body.price,
        description: req.body.description,
        countInStock: req.body.countInStock,
        imageColor

    });
    product.save((err, product) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.send({ product })
            // req.session.message = {
            //     type: 'success',
            //     message: 'User added successfuly'
            // };
            // res.redirect('/');
        }
    });
});

// get all product route
// router.get('/',(req, res) => {
//     Product.find().exec((err, products) => {
//         if (err) {
//             res.json({ message: err.message });
//         } else {

//             res.send(products)
//             // res.render('index', {
//             //     title: 'Home page',
//             //     products: products,
//             // })
//         }
//     })
// });

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    // const products = await Product.find({});
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller = req.query.seller || '';
    const order = req.query.order || '';
    const min =
        req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
        req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
        req.query.rating && Number(req.query.rating) !== 0
            ? Number(req.query.rating)
            : 0;
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
        order === 'lowest'
            ? { price: 1 }
            : order === 'highest'
                ? { price: -1 }
                : order === 'toprated'
                    ? { rating: -1 }
                    : { _id: -1 };
    const count = await Product.count({
        ...sellerFilter,
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
    });
    // const products = await Product.find({ ...sellerFilter });
    // const products = await Product.find({ ...sellerFilter }).populate(
    //   'seller',
    //   'seller.name seller.logo'
    // );

    const products = await Product.find({
        ...sellerFilter,
        ...nameFilter,
        ...categoryFilter,
        // }).populate('seller', 'seller.name seller.logo');
        ...priceFilter,
        ...ratingFilter,
    })
        // .populate('seller', 'seller.name seller.logo')
        // .sort(sortOrder);
        // res.send(products);
        .sort(sortOrder)
        // In Mongoose, the skip() method is used to specify the number of documents to skip. When a query is made and the query result is returned, the skip() method will skip the first n documents specified and return the remaining.
        // in short skip is return the remaining product in this example
        // the number in the skip is not return it return after it
        .skip(pageSize * (page - 1))
        // limit is the max number of product in page
        .limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
})
);

productRouter.get(
    '/categories',
    expressAsyncHandler(async (req, res) => {
        // Finds the distinct values for a specified field across a single collection or view and returns the results in an array.
        // distinct : different, separate, independent, special
        const categories = await Product.find().distinct('category');
        res.send(categories);
    })
);

productRouter.get('/addproduct', (req, res) => {
    res.render("add_users", { title: "Add users" });
});


// //edit an product route

productRouter.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    Product.findById(id, (err, products) => {
        if (err) {
            // res.redirect('/');
        } else {
            if (products == null) {
                // res.redirect('/');

            } else {
                res.send(products)

            }
        }
    });
});



// //update product route

productRouter.put('/update/:id', (req, res) => {
    let id = req.params.id;
    const { color } = req.body;

    let imageColor = [];

    if (req.files.length > 0) {
        imageColor = req.files.map((file, i) => {
            return { image: file.filename, color: color[i] }
        })
    }

    // if (req.files) {
    //     imageColor = req.files.filename;
    //     try {
    //         for (i = 0; i < image.length; i++) {
    //             fs.unlinkSync("../uploads/" + req.body.old_image);
    //         }
    //     } catch (error) {
    //         console.log(err);
    //     }

    // } else {
    //     imageColor = req.body.old_image;
    // }



    Product.findByIdAndUpdate(id, {
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        description: req.body.description,
        countInStock: req.body.countInStock,
        imageColor
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            res.send({
                name: req.body.name,
                brand: req.body.brand,
                price: req.body.price,
                description: req.body.description,
                countInStock: req.body.countInStock,
                imageColor
            })

        }
    });


});







// //delete product route

productRouter.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    Product.findByIdAndRemove(id, (err, result) => {
        // if (result.image != '') {
        //     try {
        //         fs.unlinkSync('../uploads/' + result.image);

        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
        if (err) {
            res.json({ message: err.message });
        } else {
            res.send('product is deleted')
            // req.session.message = {
            //     type: 'success',
            //     message: 'product deleted successfully'
            // };
            // res.redirect("/");
        }
    });
});

//   export const addToWishlist = expressAsyncHandler( async(req,res)=>{
    
//     const {productId , _id} = req.body;
//     try{
//         const user = await User.findById(_id);
//         const alreadyAded= user.wishlist.find((id)=>id.toString() === productId);
//         if(alreadyAded){
//             let user = await User.findByIdAndUpdate(_id,
//                 {
//                     $pull: {wishlist:productId}
//                 },
//                 {
//                     new :true
//                 }
//                 );
//             res.json(user);
//         }else{
//             let user = await User.findByIdAndUpdate(
//                 _id,
//                 {
//                     $push: {wishlist:productId}
//                 },
//                 {
//                      new :true
//                 }
//                 );
//             res.json(user);
//         }
//     }catch(error){
//         throw new Error(error);
//     }
//  })
 productRouter.put('/wishlist',expressAsyncHandler( async(req,res)=>{
    
    const {productId , _id} = req.body;
    try{
        const user = await User.findById(_id);
        const alreadyAded= user.wishlist.find((id)=>id.toString() === productId);
        if(alreadyAded){
            let user = await User.findByIdAndUpdate(_id,
                {
                    $pull: {wishlist:productId}
                },
                {
                    new :true
                }
                );
            res.json(user);
        }else{
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $push: {wishlist:productId}
                },
                {
                     new :true
                }
                );
            res.json(user);
        }
    }catch(error){
        throw new Error(error);
    }
 }))

 productRouter.post('/get/Wishlist',expressAsyncHandler(async(req,res)=>{
    const {_id} = req.body;
    console.log(req.body)
    try {
        const findUser = await User.findById(_id).populate("wishlist").select("wishlist");
        res.send(findUser);
    } catch (error) {
        throw new Error(error)
    }
 }));


export default productRouter



















