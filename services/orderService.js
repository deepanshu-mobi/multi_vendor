const { Order, Cart, Product, CartProduct, OrderProduct } = require('../models');
const constant = require('../utils/constant');
const customerService = require('./customerService')

const createOrder = async (customerId) => {

    const cartProduct = await Cart.findOne({ where: { customerId }, include: {model: CartProduct, include: {model: Product, attributes: ['productName', 'price'] }}});

    let totalPrice = 0;
    let productDetails = []
    cartProduct.cart_products.forEach(item => {
        totalPrice += item.price
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
    });

    await createOrderItems(orderDetail.orderId, productDetails)
    return { orderDetail, productDetails }
};

const updateOrderBySession = async (session, email) => {

    const address = session.shipping_details.address
    const addressDetails = {
        city: address.city,
        country: address.country,
        locationName: address.line1,
        // shippingAddressLine2: address.line2,
        pin: address.postal_code,
        state: address.state
    }
    const customerLocation = await customerService.addNewLocation({...addressDetails}, email)
    let orderStatus;
    if(session.payment_status == 'paid'){
        const order = await Order.findOne({ where: { stripeSessionId: session.id }});
        if(order){
            orderStatus = constant.OrderStatus.APPROVED
            await order.update({orderStatus, customerLocationId: customerLocation.customerLocationId })
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