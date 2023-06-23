const { body } = require('express-validator')
const constant = require('../utils/constant')
const { User } = require('../models')


const userRegisterValidator = [
    body('name')
    .notEmpty()
    .withMessage('Name is required'),
    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .custom(async email => {
        const existingUser = await User.findOne({ where: { email } });
        if(existingUser){
            throw new Error('User exist already with this email')
        }
    }),
    body('password')
    .notEmpty()
    .withMessage('Password is required'),
    body('role')
    .notEmpty()
    .withMessage('Role is required')
    .custom( role => {
        if(role == constant.UserType.SUPER_ADMIN){
            throw new Error('Only admin || vendor registration is allowed')
        }
        else if(role != constant.UserType.ADMIN && role != constant.UserType.VENDOR){
            throw new Error('Not a valid role possible roles are ADMIN || VENDOR')
        }
        return true
    })
]


const loginValidator = [
    body('email')
    .notEmpty()
    .withMessage('Email is required'),
    body('password')
    .notEmpty()
    .withMessage('Password is required')
]

module.exports = {
    userRegisterValidator,
    loginValidator,
}