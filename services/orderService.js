const { Order, Cart, Product } = require('../models');

const createOrder = async (customerId) => {

    const cartProduct = await Cart.findAll({ where: { customerId }, include: {model: Product, attributes: ['productName', 'price']}});

    let totalPrice = 0;
    let totalQuantity = 0;
    let productDetails = []
    cartProduct.forEach(item => {
        totalPrice += item.totalPrice,
        totalQuantity += item.totalQuantity
        productDetails.push({
            productId: item.productId,
            productName: item.Product.productName,
            productPrice: item.Product.price,
            quantity: item.totalQuantity
        })
    })
    const orderDetail = await Order.create({
        customerId,
        totalPrice,
        totalQuantity
    });
    return { orderDetail, productDetails}
};

const updateOrderBySession = async (session) => {

    const address = session.shipping_details.address

    const addressDetails = {
        shippingAddressCity: address.city,
        shippingAddressCountry: address.country,
        shippingAddressLine1: address.line1,
        shippingAddressLine2: address.line2,
        shippingAddressPostalCode: address.postal_code,
        shippingAddressState: address.state
    }

    if(session.payment_status == 'paid'){
        const order = await Order.findOne({ where: { stripeSessionId: session.id }});
        if(order){
            await order.update({orderStatus: 'APPROVED', ...addressDetails})
        }
    }
}

module.exports = {
    createOrder,
    updateOrderBySession,
}