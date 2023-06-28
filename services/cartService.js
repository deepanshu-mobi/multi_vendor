const { Cart, Customer, Product } = require('../models');


const addingProductInCart = async (body, email) => {

    const { productId, quantity } = body;

    const { customerId } = await Customer.findOne({ where: { email } });
    const { price } = await Product.findOne({ where: { productId }});
    const cartDetails = await Cart.findAll({ where: { customerId }});

    const cart = await Cart.create({
        productId,
        customerId,
        totalPrice: price * quantity,
        totalQuantity: quantity,
    });
    const cartD = {
        cartItems: cartDetails.length + 1,
        ...cart.dataValues,
    }
    return cartD;
}

const deleteAllCartItems = async (email) => {

    const { customerId } = await Customer.findOne({ where: { email } });
    const cart = await Cart.destroy({ where: { customerId } });
    return cart;
}

const deleteProductInCart = async (id, email) => {

    const productId = id;
    const { customerId } = await Customer.findOne({ where: { email } });
    const cart = await Cart.destroy({ where: { customerId, productId } });
    return cart;
}

module.exports = {
    addingProductInCart,
    deleteAllCartItems,
    deleteProductInCart,
}