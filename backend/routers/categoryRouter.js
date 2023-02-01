import Category from "../models/categoryModel.js";

import shortid from'shortid';


import express from 'express';

const categoryRouter = express.Router();

import path from "path";
import multer from 'multer';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });




categoryRouter.post(
  "/create",upload.single("categoryImage"), (req, res) => {
      const categoryObj = {
          name: req.body.name
          
      };
      
      if (req.file) {
        categoryObj.categoryImage = 'http://localhost:5000/public/' + req.file.filename;
      }
      const cat = new Category(categoryObj);
      cat.save((error, category) => {
          if (error) return res.status(400).json({ error });
          if (category) {
              return res.status(201).json({ category });
          }
      });
  });


  categoryRouter.put('/category/update/:id'
  ,upload.single("categoryImage"),async(req,res) => {
      
      const category = await Category.findById(req.params.id);
      if(category){
          
          category.name = req.body.name || category.name;
          

    //       let id = req.params.id;
    // let new_image = '';

    // if (req.file) {
    //     new_image = 'http://localhost:5000/public/' + req.file.filename;
    //     try {
    //         fs.unlinkSync("uploads/" + req.body.old_image);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // } else {
    //     new_image = req.body.old_image;
    // }

          if (req.file) {
            category.categoryImage = 'http://localhost:5000/public/' + req.file.filename;
          }
         
          const updatedCategory = await category.save();
          res.send({
              _id: updatedCategory._id,
              name: updatedCategory.name,
              categoryImage: updatedCategory.categoryImage,
              
          });
      }else{
          res.status(401).send({message: "unKnown id"});
      }
  })


  categoryRouter.get('/get', (req, res) => {
  Category.find().exec((err, categories) => {
      if (err) {
          res.json({ message: err.message });
      } else {

          res.send(categories)
          
      }
  })
});



 categoryRouter.delete('/category/delete/:id', function (req, res, next) {
  Category.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.status(201).json({ message:"Categories removed"})
    } else {
      console.log(err)
    }
  })});


export default categoryRouter;


