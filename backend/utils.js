import jwt from 'jsonwebtoken';

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
        expiresIn: '30d',
    }
    );
}


// isAuth is a middleware to authenicate user
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    console.log(`authorization ${authorization}`)
    if(authorization){
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX. when we make slice from 7 to end it means to take the token after Bearer
        // jwt is to decrypt the token
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingsecret',
            // callback function.  decode is contain the data inside token 
            (err, decode) => {
                if(err) {
                    res.status(401).send({message: 'Invalid Token'});
                } else {
                    // decode is the information of the user when sign in up
                    req.user = decode;
                    next();
                }
            }
        );
    }else{
        res.status(401).send({message: 'No Token'});
    }
}