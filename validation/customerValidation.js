const { body } = require('express-validator')
const { isValidEmail, isValidPassword } = require('../middleware/validator')
const { Customer } = require('../models')

const validateRegistration = [
    body('name')
    .notEmpty()
    .withMessage('Name is required'),
    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .custom(isValidEmail)
    .custom( async value => {
        const existingUser = await Customer.findOne({ where: {email: value}})
        if(existingUser){
            throw new Error('Email is already exist')
        }
    }),
    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .custom(isValidPassword),
]


module.exports = {
    validateRegistration,
}