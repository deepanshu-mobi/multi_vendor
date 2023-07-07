const productService = require('../services/productService');
const { StatusCodes } = require('http-status-codes');
const { response } = require('../utils/commonRes');
const constant = require('../utils/constant')

exports.addProduct = async (req, res) => {

    try{
    const { productName, description, price } = req.body

    const body = {
        productName: productName,
        description: description,
        price: price,
        image: req.files
    }
    const product = await productService.addingNewProduct(body);
    const resp = {
        productId: product.productId,
        productName: product.productName
    }
    return response(req, res, resp, StatusCodes.CREATED, constant.Message.CREATED_SUCCESSFULLY, true)
}catch(err){
    console.log('Error while creating new product', err);
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
}
}