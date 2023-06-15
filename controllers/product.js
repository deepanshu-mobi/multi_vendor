const productService = require('../services/productService');
const { StatusCodes } = require('http-status-codes');


exports.addProduct = async (req, res) => {

    try{
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
}catch(err){
    console.log('Error while creating new product',err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        mesg: 'Internal server error'
    })
}
}