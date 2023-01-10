import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

// express.Router is a function that make our code modular instead of having all routes in server.js, we can define multiple files to have our routers 
const userRouter = express.Router();



userRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
})
);

// userRouter.post('/signin', expressAsyncHandler(async(req, res) => {
//     const user = await User.findOne({email: req.body.email});
//     if(user){
//         // bcrypt.compareSync is to compare password
//         if(bcrypt.compareSync(req.body.password, user.password)){
//             res.send({
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 isAdmin: user.isAdmin,
//                 token: generateToken(user),
//             });
//             return;
//         }
//     }
//     // 401 is unauthaurized
//     res.status(401).send({message: "Invalid email or password"})
// }))

userRouter.post('/signin',
expressAsyncHandler(async(req,res) => {
    const user = await User.findOne({email : req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id : user._id,
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                token : generateToken(user),
            });
            return;
        }
        // res.send({
        //             _id : user._id,
        //             name : user.name,
        //             momo: req.body.email,
        //             email : user.email,
        //             isAdmin : user.isAdmin,
        //             isSeller: user.isSeller,
        //             token : generateToken(user),
        //         });
    }
    res.status(401).send({message : "Invalid email or password"});
})
);

// userRouter.post(
//     '/register',
//     expressAsyncHandler(async(req,res) => {
//     const user = await User.findOne({email : req.body.email});
//     if(!user){
//         const addUser = await User.insertMany(
//             {
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: bcrypt.hashSync(req.body.password,8),
//                 isAdmin: false,
//             }
//         );
//         res.send(addUser);
//         return;
//         }else{
//             res.status(401).send({message: "Email already exists"})
//         }
//     res.status(401).send({message : "Invalid email or password"});
// })
// );

userRouter.post('/register', expressAsyncHandler(async(req,res) => {
    const user = new User({name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();

            res.send({
                _id : createdUser._id,
                name : createdUser.name,
                email : createdUser.email,
                isAdmin : createdUser.isAdmin,
                token : generateToken(createdUser),
            });
        })
)

userRouter.get('/:id',
expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        res.send(user);
    }else{
        res.status(404).send({message : "User Not Found"});
    }
    // res.status(404).send({message : "User Not Found"});
})
);

userRouter.put('/profile',
expressAsyncHandler(async(req,res) => {
    // res.send(req.body.name)
    const user = await User.findById(req.body.userId);
    if(user){
        // res.send({message: "user exists"});

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    }else{
        res.status(401).send({message: "unKnown id"});
    }
}))
export default userRouter;