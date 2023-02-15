import express from "express";
import Product from '../models/productModel.js';
import User from '../models/userModel.js'
import passport from 'passport';
import { validateProductRequest, isRequestValidated } from "../validators/authentication.js";
import expressAsyncHandler from "express-async-handler";
import Stripe from 'stripe';

const visaRouter = express.Router();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

visaRouter.post("/", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({

            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                // const storeItem = Product.findById(item.id, (err, products) => {
                //     if (err) {
                //         res.send({message: err});
                //     } else {
                //         if (products == null) {
                //             // res.redirect('/');
                //         } else {
                //             // res.send(products)
                //             return products;
                //         }
                //     }
                // });
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})


export default visaRouter