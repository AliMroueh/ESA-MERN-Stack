import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';


const orderRouter = expressAsyncHandler.Router();

  // find my orders
  orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req, res) => {
    const orders = await Order.find({user : req.user._id});
    res.send(orders)
})
);

// create new order
orderRouter.post(
    '/',
    // isAuth is a middleware by calling next in it req.user will be filled by user information
    isAuth,
    expressAsyncHandler(async(req, res) => {
        if(req.body.orderItems.length === 0){
            res.status(400).send({message: 'Cart is empty' });
        }else{
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                itemsPrice: req.body.itemsPrice,
                paymentMethod: req.body.paymentMethod,
                shippingPrice: req.body.shippingPrice,
                totalPrice: req.body.totalPrice,
                user: req.body._id,
            });
            // save the order
            const createdOrder = await order.save();
            // order to the frontend
            res.status(201).send({message: 'New Order Created', order: createdOrder})
        }
    })
);

// get the orders for each user to admin
orderRouter.get('/:id',isAuth, expressAsyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message : 'Order not found'});
    }
}));

// admin delete order
orderRouter.delete('/:id', isAuth, isAdmin,
 expressAsyncHandler(async(req,res) => {
     const order = await Order.findById(req.params.id);
     if(order){
         deleteOrder = await order.remove();
         res.send({message: 'Order Deleted ', order: deleteOrder});
     }else{
        res.status(404).send({ message: 'Order Not Found' })
     }
 }))

 orderRouter.put(
    '/:id/deliver',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req,res)=> {
        const order = await Order.findById(req.params.id);
        if(order){
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        
        const updatedOrder = order.save();
        res.send({message: 'Order Delivered', order: updatedOrder});
    }else{
        res.status(404).send({message: 'Order Not Found'});
    }
    })
)

export default orderRouter;