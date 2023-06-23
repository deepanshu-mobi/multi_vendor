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
    .withMessage('Price is required')
    .custom(price => {
        if(price == 0){
            throw new Error('Price can not be 0')
        }
        return true
    }),
    body('image')
    .custom(isValidImage)
]


module.exports = {
    validateNewProduct
}