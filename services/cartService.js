const { Cart, Customer, Product, CartProduct, ProductImage } = require('../models');


const addingProductInCart = async (body, email) => {

    const { productId, quantity } = body;

    const { customerId } = await Customer.findOne({ where: { email } });

    const { price } = await Product.findOne({ where: { productId }}); 

    const customerCart = await Cart.findOne({ where: { customerId }});
    if(customerCart){  
        await CartProduct.create({
            productId,
            cartId: customerCart.cartId,
            quantity: quantity,
            price: quantity * price
        })
        const updatedCart = await customerCart.update({ totalCartItems: customerCart.totalCartItems + 1 });
        return updatedCart;
    }

    const cart = await Cart.create({
        customerId,
        totalCartItems: 1
    });
    await CartProduct.create({
        productId,
        cartId: cart.cartId,
        quantity: quantity,
        price: quantity * price
    })

    return cart;
}

const deleteAllCartItems = async (email) => {

    const { customerId } = await Customer.findOne({ where: { email } });
    const cart = await Cart.destroy({ where: { customerId } });
    return cart;
}

const deleteProductInCart = async (id, email) => {

    const productId = id;
    let cart;
    const { customerId } = await Customer.findOne({ where: { email } });
    const cartProducts = await Cart.findOne({ where: { customerId }, include: { model: CartProduct, where: { productId } }})
    if(productId == cartProducts.cart_products[0].productId){
        const body = {
            totalCartItems: cartProducts.totalCartItems-1
        }
        await Cart.update(body, { where: { cartId: cartProducts.cartId }});
        await CartProduct.destroy({ where: { cartId: cartProducts.cartId, productId }})
        cart = await Cart.findOne({ where: {cartId: cartProducts.cartId }});
    }
    
    return cart;
}

const getAllCartProducts = async (email) => {

    const { customerId } = await Customer.findOne({ where: { email } });
    const cartProducts = await Cart.findOne({ where: { customerId }, attributes: { exclude: ['createdAt', 'updatedAt'] }, include: { model: CartProduct, include: { model: Product,  include: { model: ProductImage, attributes: ['image']},} }});
    return cartProducts;
}

module.exports = {
    addingProductInCart,
    deleteAllCartItems,
    deleteProductInCart,
    getAllCartProducts,
}