<<<<<<< Updated upstream
import express from 'express';
import mongoose from 'mongoose';
import data from '../data.js';
import productModel from '../models/productModel.js';
=======
import express from "express";
import Product from '../models/productModel.js';
import multer from 'multer';
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const router = express.Router();

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
router.post("/addproduct", upload, (req, res) => {
//  console.log(req.body)
//  console.log(req.files)
    const { color } = req.body;

    let imageColor = [];

    if (req.files.length > 0) {
        imageColor = req.files.map((file, i) => {
            return { image: file.filename, color: color[i] }
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

>>>>>>> Stashed changes




const productRouter = express.Router();


productRouter.get('/product' , async(req , res) =>{
    try{
        const product = await productModel.find();
        res.status(200).json(product);
       }catch(err){
        res.status(404).json({message: err});
       };
});

productRouter.post('/product',async(req,res)=>{
    const products = new productModel({
        name:req.body.name,
        category:req.body.category,
        ImageColor:req.body.imageColor,
        price:req.body.price,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
    });
    const savedProducts = await products.save()
    .then( data => {
            res.status(200).json(data);
        })
     .catch(err=>{
        res.status(404).json({message:err})
     });
});



//delete

productRouter.delete('/:id', async(req,res) => {
    const prod = await Product.findById(req.params.id)
    if(prod){
        Product.findByIdAndDelete(req.params.id, function (err, docs) {
            if (!err){
                res.send({success: docs})
            }
            else{
                res.send({notsuccess: err})
            }
         })
    }else{
        res.status(404).send({message: "this product is not exists"})
    }
})





 //update
 productRouter.patch('/:id' ,async(req,res) => {
    try{
        const updateProuduct = await productModel.updateOne({_id : req.params.id},  {
            $set: {
                name:req.body.name,
                category:req.body.category,
                imageColor:req.body.imageColor,
                price:req.body.price,
                countInStock:req.body.countInStock,
                brand:req.body.brand,
                rating:req.body.rating,
            }}
        )
        res.status(200).json(updateProuduct);
        }catch( err){
            res.status(404).json({message:err})
        };
 });


 
  export default productRouter;




