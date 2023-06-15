const { body } = require('express-validator');
const { isValidImage } = require('../middleware/verifyImage')
  
const validateNewProduct = [
    body('productName')
    .notEmpty()
    .withMessage('Product name is required'),
    body('description')
    .notEmpty()
    .withMessage('Description is required'),
    body('price')
    .notEmpty()
    .withMessage('Price is required'),
    body('image')
    .custom(isValidImage)
]


module.exports = {
    validateNewProduct
}