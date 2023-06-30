const { Order, Cart, Product, CartProduct, OrderProduct } = require('../models');
const constant = require('../utils/constant')

const createOrder = async (customerId) => {

    const cartProduct = await Cart.findOne({ where: { customerId }, include: {model: CartProduct, include: {model: Product, attributes: ['productName', 'price'] }}});


    let totalPrice = cartProduct.totalPrice;
    let totalQuantity = cartProduct.totalQuantity;
    let productDetails = []
    cartProduct.cart_products.forEach(item => {
        productDetails.push({
            productId: item.productId,
            productName: item.Product.productName,
            productPrice: item.Product.price,
            quantity: item.quantity
        })
    })
    const orderDetail = await Order.create({
        customerId,
        totalPrice,
        totalQuantity
    });

    await createOrderItems(orderDetail.orderId, productDetails)
    return { orderDetail, productDetails }
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

    let orderStatus;
    if(session.payment_status == 'paid'){
        const order = await Order.findOne({ where: { stripeSessionId: session.id }});
        if(order){
            orderStatus = constant.OrderStatus.APPROVED
            await order.update({orderStatus, ...addressDetails})
        }
    }
}

const createOrderItems = async (orderId, productsDetails) =>{

    const updatedProducts = productsDetails.map((item) => {
        item.orderId = orderId
        return item;
    })
    await OrderProduct.bulkCreate(updatedProducts);

}

module.exports = {
    createOrder,
    updateOrderBySession,
}