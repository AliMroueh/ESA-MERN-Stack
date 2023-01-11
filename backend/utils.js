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
