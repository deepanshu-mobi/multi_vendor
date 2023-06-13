const { body } = require('express-validator')
const constant = require('../utils/constant')

const userRegisterValidator = [
    body('name')
    .notEmpty()
    .withMessage('Name is required'),
    body('email')
    .notEmpty()
    .withMessage('Email is required'),
    body('password')
    .notEmpty()
    .withMessage('Password is required'),
    body('role')
    .notEmpty()
    .withMessage('Role is required')
    .custom( role => {
        if(role == constant.userType.super_admin){
            throw new Error('Only admin || vendor registration is allowed')
        }
        if(role != constant.userType.admin || role != constant.userType.vendor){
            throw new Error('Not a valid role possible roles are admin || vendor')
        }
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