import jwt from 'jsonwebtoken';
import pkg from 'passport-jwt';
import User from './models/userModel.js';
const { Strategy:JwtStrategy, ExtractJwt } = pkg;

export const generateToken = user => {
    // first parameter is the user object
    // second parameter is json web token secret a key that encrypt data and generate the token
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
        expiresIn: '25d',
    }
    );
}

export const refreshToken = user => {
    return jwt.sign(
   { 
       _id: user._id,
       name: user.name,
       email: user.email,
       isAdmin: user.isAdmin, 
   },
   process.env.REFRESH_TOKEN_SECRET || 'secret',
   { 
       expiresIn: '30d'
   }
)}

// isAuth is a middleware to authenicate user
// export const isAuth = (req, res, next) => {
//     const authorization = req.headers.authorization;
//     console.log(`authorization ${authorization}`)
//     if(authorization){
//         const token = authorization.slice(7, authorization.length); // Bearer XXXXXX. when we make slice from 7 to end it means to take the token after Bearer
//         // jwt is to decrypt the token
//         jwt.verify(
//             token,
//             process.env.JWT_SECRET || 'somethingsecret',
//             // callback function.  decode is contain the data inside token 
//             (err, decode) => {
//                 if(err) {
//                     res.status(401).send({message: 'Invalid Token'});
//                 } else {
//                     // decode is the information of the user when sign in up
//                     req.user = decode;
//                     next();
//                 }
//             }
//         );
//     }else{
//         res.status(401).send({message: 'No Token'});
//     }
// }

// export const isAdmin = (req, res, next) => {
//     if(req.user && req.user.isAdmin){
//         next();
//     }else{
//         res.status(401).send({message: 'Invalid Admin Token'});
//     }
// };



export const applyPassportStrategy = passport => {
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET || 'somethingsecret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // jwt_payload is the data that we create when create the token
    User.findOne({_id: jwt_payload._id}, function(err, user) {
        if (err) {
            console.log(err)
            return done(err, false);
            // return done.send(status)
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));}

export const isAdmin =() => (req,res,next) => {
    if(req.user.isAdmin){
        next()
    }else{
        return res.status(401).json({message: "no access"})
    }
}