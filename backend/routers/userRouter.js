import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, refreshToken } from '../utils.js';
import passport from 'passport';

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
            const refresh = refreshToken(user);
            res.send({
                _id : user._id,
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                token : generateToken(user),
                rToken : refresh
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
    // const passValidation =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    // const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if(!req.body.email.match(emailValidation)){
    //     res.status(401).send({message : "Email should be like example@gmail.com"});
    // }else if(!req.body.password.match(passValidation)){
    //     res.status(401).send({message : "Password should be contain one: upper case, lower case, new number, no white space, minimum 8 chars"})
    // }else{
    const user = new User({name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();

    const refresh = refreshToken(createdUser);
            res.send({
                _id : createdUser._id,
                name : createdUser.name,
                email : createdUser.email,
                isAdmin : createdUser.isAdmin,
                token : generateToken(createdUser),
                rToken : refresh
            });
        // }
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

userRouter.delete('/:id',
passport.authenticate('jwt', { session: false }),
isAdmin(),
expressAsyncHandler(async(req,res)=>{

    const id = req.params.id;

    await User.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}))



//get data

userRouter.get('/',
passport.authenticate('jwt', { session: false }),
isAdmin(),
expressAsyncHandler(async( req ,res)=>{
    try{
     const users = await User.find({'isAdmin':false});

     res.status(200).send(users);
    }
    catch(err){
     res.status(500).send(err);
    };
 }));

export default userRouter;