import express from 'express';
import mongoose from 'mongoose';
import data from '../data.js';
import productModel from '../models/productModel.js';




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




