// const { check, validationResult } = require('express-validator');
import { check, validationResult } from 'express-validator';

const validateProductRequest = [
    check('name')
        .notEmpty()
        .withMessage('name is required'),
    check('brand')
        .notEmpty()
        .withMessage('brand is required'),
    check('category')
        .notEmpty()
        .withMessage('category is required'),
    check('price')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long'),
    check('description')
        .isLength({ min: 10 })
        .withMessage('description must be at least 6 character long'),
    check('countInStock')
        .isLength({ min: 1 })
        .withMessage('countInStock must be at least 6 character long')
];


const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}


export { validateProductRequest, isRequestValidated }