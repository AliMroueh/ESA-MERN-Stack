import express from "express";
import Stripe from "stripe";
import dotenv from 'dotenv';
import Order from "../models/orderModel.js";
dotenv.config();

// const stripe = Stripe(process.env.STRIPE_KEY);
const stripe = Stripe('sk_test_51MYodNIy0tVpjmkpS6q6biXPxTws6IGOi3b15k3Oqzq1apzn6WSGTAAIVWW5rZy0VlFybtxJ0JQlnoInpGZOFyNu00hOHxLUPg');
// const stripe = require('stripe')('sk_test_51Mctj7JimUjJLTpsfIgcr28lZgcsaED8jhZnF7VKbAzSRUXlJx9ntAV8TYXlPSYpiT2SytGZ6dvRfgVuh4tbqVIq00DnuUXvGJ')
const stripeRouter = express.Router();

stripeRouter.post('/create-checkout-session', async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      id: req.body.orderId
    }
  })
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
    customer: customer.id,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/order/${req.body.orderId}`,
    cancel_url: `${process.env.CLIENT_URL}/order/${req.body.orderId}`,
  });

  res.send({ url: session.url })
});

// UPDATE PAYMENT ORDER 
const pay = async (orderID) => {
  const order = await Order.findById(orderID).populate(
    'user',
    'email name'
  );
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // order.paymentResult = {id: req.body.id, status: req.body.status, update_time: req.body.update_time, email_address: req.body.email_address};
    // res.send({message: 'Order Paid', order: updatedOrder});
  }
  try {
    const updatedOrder = await order.save();
    console.log("Update the pay in order: ", updatedOrder)
  } catch (error) {
    console.log(error)
  }


}
// Stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
// endpointSecret = "whsec_7451f2f53e66927b94b5f3f93cef852582a0e2aa3d15f5807719815b98c21f5c";
// whsec_7451f2f53e66927b94b5f3f93cef852582a0e2aa3d15f5807719815b98c21f5c

stripeRouter.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;
  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified")
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }
  // Handle the event
  if (eventType === 'checkout.session.completed') {
    // data.customer is the orderId of the customer which I set up before mode: 'payment',
    stripe.customers.retrieve(data.customer).then((customer) => {
      pay(customer.metadata.id)
      console.log(customer.metadata.id)
      console.log("data: ", data);
    })
      .catch(err => console.log(err.message))
  }


  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});

export default stripeRouter;