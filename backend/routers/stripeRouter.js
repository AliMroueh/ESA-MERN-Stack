import express from "express";
import Stripe from "stripe";
import dotenv from 'dotenv';
import Order from "../models/orderModel.js";
dotenv.config();

// const stripe = Stripe(process.env.STRIPE_KEY);
const stripe = Stripe('sk_test_51Mctj7JimUjJLTpsfIgcr28lZgcsaED8jhZnF7VKbAzSRUXlJx9ntAV8TYXlPSYpiT2SytGZ6dvRfgVuh4tbqVIq00DnuUXvGJ');
// const stripe = require('stripe')('sk_test_51Mctj7JimUjJLTpsfIgcr28lZgcsaED8jhZnF7VKbAzSRUXlJx9ntAV8TYXlPSYpiT2SytGZ6dvRfgVuh4tbqVIq00DnuUXvGJ')
const stripeRouter = express.Router();

stripeRouter.post('/create-checkout-session', async (req, res) => {
    let line_items1 = await Order.findById(req.body.orderId)
    let line_items = line_items1.orderItems.map(item => {
        return {
                    price_data: {
                      currency: 'usd',
                      product_data: {
                        name: item.name,
                        images: [item.image]
                      },
                      unit_amount: item.price * 100,
                    },
                    quantity: item.qty,
                  }
    })
    // console.log(line_items)
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/order/${req.body.orderId}`,
    // success_url: `success`,
    // cancel_url: `failed`
  });
//   if(session.url == 'success'){
//     let {data} = axios.put(`/api/order/${req.body.orderId}/pay`);
//     if(data.message == 'Order Paid'){
//         res.send({url: `${process.env.CLIENT_URL}/order/${req.body.orderId}`})
//     }
//   }else{
//     res.send({url: `${process.env.CLIENT_URL}/order/${req.body.orderId}`})
//   }
// console.log(session.payment_status)
// console.log(session.url)
  res.send({url: session.url, isPay: session.payment_status})
// res.send()
});

// app.listen(4242, () => console.log(`Listening on port ${4242}!`));

export default stripeRouter;