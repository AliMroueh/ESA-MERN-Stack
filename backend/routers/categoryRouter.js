import Category from "../models/categoryModel.js";

import shortid from'shortid';

import { body, validationResult} from 'express-validator';
import express from 'express';

const categoryRouter = express.Router();

import path from "path";
import multer from 'multer';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { isAdmin } from '../utils.js';
import passport from 'passport';

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






categoryRouter.post("/create", 
  upload.single("categoryImage"),passport.authenticate('jwt', { session: false }),
  isAdmin(), 
  [
    // Validate the name field
    body('name', 'Please Enter A Name').trim().notEmpty(),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create the category object
    const categoryObj = {
      name: req.body.name,
    };

    // Add the categoryImage field if a file was uploaded
    if (req.file) {
      categoryObj.categoryImage = 'http://localhost:5000/public/' + req.file.filename;
    }

    // Save the category to the database
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) {
        return res.status(201).json({ category });
      }
    });
  }
);







  categoryRouter.put('/category/update/:id', upload.single("categoryImage"),passport.authenticate('jwt', { session: false }),
  isAdmin(), async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        category.name = req.body.name || category.name;

        if (req.file) {
            // Extract the filename from the categoryImage URL
            const oldImagePath = path.join(path.dirname(__dirname), "uploads/") + category.categoryImage.split('/').pop();
            fs.unlinkSync(oldImagePath); // Delete the old image
            category.categoryImage = 'http://localhost:5000/public/' + req.file.filename;
        }

        const updatedCategory = await category.save();

        res.send({
            _id: updatedCategory._id,
            name: updatedCategory.name,
            categoryImage: updatedCategory.categoryImage,
        });
    } else {
        res.status(401).send({ message: "Unknown id" });
    }
});


  
  
  

  
  
  
  
  


  categoryRouter.get('/get', (req, res) => {
  Category.find().exec((err, categories) => {
      if (err) {
          res.json({ message: err.message });
      } else {

          res.send(categories)
          
      }
  })
});



 categoryRouter.delete('/category/delete/:id',passport.authenticate('jwt', { session: false }),
 isAdmin(),  function (req, res, next) {
  Category.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.status(201).json({ message:"Categories removed"})
    } else {
      console.log(err)
    }
  })});


export default categoryRouter;


