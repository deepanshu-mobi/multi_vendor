const cartService = require('../services/cartService');
const constant = require('../utils/constant');
const { response } = require('../utils/commonRes');
const { StatusCodes } = require('http-status-codes')

exports.addToCart = async (req, res) => {

    try{
    const email = req.email
    const cart = await cartService.addingProductInCart(req.body, email);
    return response(req, res, cart, StatusCodes.CREATED, constant.Message.CREATED_SUCCESSFULLY, true);
    }catch(err){
        console.log('Error while creating cart', err);
        return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false);
    }
}


exports.clearCart = async (req, res) => {

    try{
    const email = req.email
    const cartDetail = await cartService.deleteAllCartItems(email);

    if(cartDetail == 0){
        return response(req, res, null, StatusCodes.BAD_REQUEST, 'Cart is empty', false)    
    }
    return response(req, res, null, StatusCodes.OK, constant.Message.DELETED_SUCCESSFULLY, true)

    }catch(err){
        console.log('Error while clearing cart', err);
        return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
    }
}

exports.removeProductInCart = async (req, res) => {
    
    try{
    const email = req.email;
    const { id } = req.query;
    if(!id) {
        return response(req, res, null, StatusCodes.BAD_REQUEST, 'ProductId is not provided', false)
    }
    const cartDetail = await cartService.deleteProductInCart(id, email);
    if(cartDetail === 0){
        return response(req, res, null, StatusCodes.BAD_REQUEST, 'Product is not found', false)
    }
    return response(req, res, cartDetail, StatusCodes.OK, constant.Message.DELETED_SUCCESSFULLY, true);
    }catch(err){
        console.log('Error while deleting product in cart', err);
        return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
    }
}

exports.cartProducts = async (req, res) => {

    try{
    const email = req.email;
    const cartProducts = await cartService.getAllCartProducts(email);
    if(!cartProducts.cart_products.length){
        return response(req, res, null, StatusCodes.BAD_REQUEST, 'Cart is empty', false)
    }
    return response(req, res, cartProducts, StatusCodes.OK, constant.Message.SUCCESSFUL, true)
    }catch(err){
        console.log('Error while fetching cart products', err);
        return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
    }
}