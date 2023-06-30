const { Cart, Customer, Product, CartProduct } = require('../models');
const cartProducts = require('../models/cartproducts');


const addingProductInCart = async (body, email) => {

    const { productId, quantity } = body;

    const { customerId } = await Customer.findOne({ where: { email } });

    const { price } = await Product.findOne({ where: { productId }}); 

    const customerCart = await Cart.findOne({ where: { customerId }});
    if(customerCart){  
        const cartProduct = await CartProduct.create({
            productId,
            cartId: customerCart.cartId,
            quantity: quantity,
            price: quantity * price
        })
        const updatedCart = await customerCart.update({totalCartItems: customerCart.totalCartItems + 1, totalPrice: customerCart.totalPrice + cartProduct.price, totalQuantity: customerCart.totalQuantity + cartProduct.quantity});
        return updatedCart;
    }

    const cart = await Cart.create({
        customerId,
        totalCartItems: 1
    });
    const cartProduct = await CartProduct.create({
        productId,
        cartId: cart.cartId,
        quantity: quantity,
        price: quantity * price
    })

    const updatedCart = await cart.update({totalPrice: cartProduct.price, totalQuantity: cartProduct.quantity})

    return updatedCart;
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
    const item = cartProducts.cart_products[0]
    if(productId == cartProducts.cart_products[0].productId){
        const body = {
            totalPrice: cartProducts.totalPrice - item.price, 
            totalQuantity: cartProducts.totalQuantity - item.quantity, 
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
    const cartProducts = await Cart.findOne({ where: { customerId }, attributes: { exclude: ['createdAt', 'updatedAt'] }, include: { model: CartProduct }});
    return cartProducts;
}

module.exports = {
    addingProductInCart,
    deleteAllCartItems,
    deleteProductInCart,
    getAllCartProducts,
}