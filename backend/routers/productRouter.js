
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
    console.log(req.body)
    console.log(req.files)
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

// get all product route
router.get('/', (req, res) => {
    Product.find().exec((err, products) => {
        if (err) {
            res.json({ message: err.message });
        } else {

            res.send(products)
            // res.render('index', {
            //     title: 'Home page',
            //     products: products,
            // })
        }
    })
});

router.get('/addproduct', (req, res) => {
    res.render("add_users", { title: "Add users" });
});


// //edit an product route

router.get('/edit/:id', (req, res) => {
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

router.put('/update/:id', upload, (req, res) => {
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

router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    Product.findByIdAndRemove(id, (err, result) => {
        if (result.image != '') {
            try {
                fs.unlinkSync('../uploads/' + result.image);

            } catch (err) {
                console.log(err);
            }
        }
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









export default router



















