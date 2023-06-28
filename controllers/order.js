const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Customer, Cart, Order } = require('../models')
const constant = require('../utils/constant');
const { response } = require('../utils/commonRes');
const { StatusCodes } = require('http-status-codes');
const orderService = require('../services/orderService')

exports.stripeWebhook = async (req, res) => {

    let event;
    const signature = req.headers['stripe-signature'];
    const endPointSecret = 'whsec_32e93f7afb3f6c965bf589c6e73abb8114378f49efac5d1991fda4e36037e925';

    try{
    event = stripe.webhooks.constructEvent(req.body, signature, endPointSecret)
    }catch(err){
        console.log('Error while calling webhook', err);
        return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
    }

    switch(event.type){
        case 'checkout.session.completed': {
            const session = event.data.object;
            const customer = await stripe.customers.retrieve(session.customer)
            // await Cart.destroy({ where : {customerId: customer.metadata.customerId }})
            await orderService.updateOrderBySession(session)
            console.log('checkout.session.completed', session);
            break;
        }
        case 'checkout.session.expired': {
            const session = event.data.object;
            const order = await Order.findOne({ where: {stripeSessionId: session.id}});
            if(order && order.orderStatus == 'PENDING'){
                await order.update({orderStatus: 'FAILED'})
            }
            console.log('checkout.session.expired', session)
            break;
        }
        default: {
            console.log(`unhandle event type ${event.type}`)
        }
    }
    return response(req, res, null, StatusCodes.OK, constant.Message.SUCCESSFUL, true)
}


exports.createCheckoutSession = async (req, res) => {

    const email = req.email;

    const { customerId } = await Customer.findOne({ where: { email }})
    const customer = await stripe.customers.create({
        email: email,
        metadata: { customerId }
    })

    const currency = 'inr'
    const { orderDetail, productDetails } = await orderService.createOrder(customerId)
    if(productDetails.length <=0){
        return response(req, res, null, StatusCodes.BAD_REQUEST, 'Cart is empty', false)
    }
    const stripeLineItems = productDetails.map((item) => {
        return {
          price_data: {
            currency: currency,
            product_data: {
              name: item.productName,
              metadata: {
                id: item.productId,
                price: item.productPrice,
              },
            },
            unit_amount: item.productPrice * 100,
          },
          quantity: item.quantity,
        };
      });
    const session = await stripe.checkout.sessions.create({

        payment_method_types: ['card'],
        mode: 'payment',
        currency: currency,
        shipping_address_collection: {
            allowed_countries: ['IN']
        },
        line_items: stripeLineItems,
        expand: ['line_items'],
        customer: customer.id,
        success_url: 'https://checkout.stripe.com/test/success',
        cancel_url: 'https://checkout.stripe.com/test/cancelled'
    });
    await orderDetail.update({stripeSessionId: session.id})
    return response(req, res, session.url, StatusCodes.OK, 'successfully created checkout session', true)
}