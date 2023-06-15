const productService = require('../services/productService');
const { StatusCodes } = require('http-status-codes');


exports.addProduct = async (req, res) => {

    const { productName, description, price } = req.body
    const { email } = req.session.user 
    const body = {
        productName: productName,
        description: description,
        price: price,
        image: req.file.filename
    }
    const product = await productService.addingNewProduct(body, email);
    const response = {
        productId: product.productId,
        productName: product.productName
    }
    return res.status(StatusCodes.CREATED).send(response)
}