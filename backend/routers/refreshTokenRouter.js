import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
const refreshTokenRouter = express.Router();

refreshTokenRouter.get('/:id',expressAsyncHandler(async(req,res) => {
    let ref = req.params.id;
    // console.log(ref)
    // res.send(ref)
        // if (!cookies?.jwt) return res.status(401).send({ message: 'Unauthorized bobobob' })

    const refreshToken = req.params.id;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET || 'secret',
        async (err, decoded) => {
            if (err) return res.status(403).send({ message: 'Forbidden' })

            const foundUser = await User.findOne({ email: decoded.email }).exec()

            if (!foundUser) return res.status(401).send({ message: 'Unauthorized ya man' })

            // const accessToken = jwt.sign(
            //     {
            //         "UserInfo": {
            //             "username": foundUser.username,
            //             "roles": foundUser.roles
            //         }
            //     },
            //     process.env.ACCESS_TOKEN_SECRET,
            //     { expiresIn: '15m' }
            // )
            // const accessToken = generateToken(foundUser);

            res.send({ token : generateToken(foundUser) })
        }
    )
}))

export default refreshTokenRouter;