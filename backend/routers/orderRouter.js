import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import passport from 'passport';

const orderRouter = express.Router();

  // find my orders
  orderRouter.get('/mine', 
  passport.authenticate('jwt', { session: false }),
  expressAsyncHandler(async(req, res) => {
    const orders = await Order.find({user : req.user._id});
    res.send(orders)
})
);

orderRouter.get('/',
// isAuth, 
// isAdmin
// isSellerOrAdmin
expressAsyncHandler(async (req,res)=> {
    // populate bring the name of the user (user is id) since it is not exist in the Order.find({})
    // const orders = await Order.find({}).populate('user', 'name');
    // req.query get the result after ? in url
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};

    const orders = await Order.find({ ...sellerFilter }).populate(
      'user',
      'name'
    );
    res.send(orders);
})
);

// create new order
orderRouter.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    // isAuth is a middleware by calling next in it req.user will be filled by user information
    // isAuth,
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
                user: req.user._id,
            });
            // save the order
            const createdOrder = await order.save();
            // order to the frontend
            res.status(201).send({message: 'New Order Created', order: createdOrder})
        }
    })
);

// get the orders for each user to admin
orderRouter.get('/:id',
// isAuth,
 expressAsyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message : 'Order not found'});
    }
}));

// admin delete order
orderRouter.delete('/:id',
//  isAuth, isAdmin,
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
    // isAuth,
    // isAdmin,
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

orderRouter.put('/:id/pay',
//  isAuth, 
 expressAsyncHandler(async (req, res) =>{
    // const order = await Order.findById(req.params.id);
    const order = await Order.findById(req.params.id).populate(
        'user',
        'email name'
      );
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {id: req.body.id, status: req.body.status, update_time: req.body.update_time, email_address: req.body.email_address};
        const updatedOrder = await order.save();
        try{
          mailgun()
        .messages()
        .send(
          {
            from: 'Amazona <amazona@mg.yourdomain.com>',
            to: `${order.user.name} <${order.user.email}>`,
            subject: `New order ${order._id}`,
            html: payOrderEmailTemplate(order),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );
        }catch(err){
          console.log(err)
        }
        
        res.send({message: 'Order Paid', order: updatedOrder});
    }else{
        res.status(404).send({message: 'Order not found'});
    }
}))

//   // find my orders
//   orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req, res) => {
//     const orders = await Order.find({user : req.user._id});
//     res.send(orders)
// })
// );

export default orderRouter;