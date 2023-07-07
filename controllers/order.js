const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Customer, Cart, Order } = require('../models')
const constant = require('../utils/constant');
const { response } = require('../utils/commonRes');
const { StatusCodes } = require('http-status-codes');
const orderService = require('../services/orderService')

exports.stripeWebhook = async (req, res) => {

    let event;
    const signature = req.headers['stripe-signature'];
    const endPointSecret = process.env.END_POINT_SECRET;

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
            const customerId = customer.metadata.customerId
            await Cart.destroy({ where : { customerId }})
            await orderService.updateOrderBySession(session, customerId)
            console.log('checkout.session.completed', session);
            break;
        }
        case 'checkout.session.expired': {
            const session = event.data.object;
            const order = await Order.findOne({ where: {stripeSessionId: session.id}});
            if(order && order.orderStatus == constant.OrderStatus.PENDING){
                await order.update({orderStatus: constant.OrderStatus.FAILED})
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

    const customers = await Customer.findOne({ where: { email }});

    if(!customers){
        return response(req, res, null, StatusCodes.BAD_REQUEST, 'CustomerId does not exist', false)
    }

    const customerId = customers.customerId;
    const customer = await stripe.customers.create({
        email: email,
        metadata: { customerId }
    })

    const currency = 'inr'  
    const { orderDetail, productDetails } = await orderService.createOrder(customerId);
    if(productDetails.length <= 0){
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
        success_url: 'https://mpbupdate.mobikasa.net',
        cancel_url: 'https://checkout.stripe.com/test/cancelled'
    });
    await orderDetail.update({ stripeSessionId: session.id })
    return response(req, res, session.url, StatusCodes.OK, 'successfully created checkout session', true)
}


//------------------------------ for future payment ------------------------
// exports.stripeWebhook = async (req, res) => {

//     let event;
//     const signature = req.headers['stripe-signature'];
//     const endPointSecret = process.env.END_POINT_SECRET;

//     try{
//     event = stripe.webhooks.constructEvent(req.body, signature, endPointSecret)
//     }catch(err){
//         console.log('Error while calling webhook', err);
//         return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
//     }

//     switch(event.type){

//         case 'setup_intent.succeeded': {//first
//             const session = event.data.object;
//             const payment_method_id = session.payment_method;
//             const customer_id = session.customer;

//             await stripe.paymentIntents.create({
//                 customer: customer_id,
//                 payment_method: payment_method_id,
//                 amount: 5000,
//                 currency: 'inr',
//                 metadata: {
//                     product_name: 'Example Product',
//                     sku: '12345',
//                 },
//                 confirm: true
//             })
//             console.log('setupI_intent.succeeded--------',session)
//             break;
//         }
//         case 'payment_intent.requires_action': { //confirm: true third
//             const session = event.data.object;
//             const confirmUrl = session.next_action.use_stripe_sdk.stripe_js;
//             console.log('Confirm_url for payment', confirmUrl);
//             break;
//         }
//         case 'payment_intent.succeeded': {// confirm: true
//             const session = event.data.object;
//             // await Cart.destroy({ where : {customerId: customer.metadata.customerId }}) we can clear the cart here
//             console.log('here you can update the OrderStatus for payment');
//             break;
//         }
//         case 'charge.succeeded': { //confirm: true
//             const session = event.data.object;
//             const receiptUrl = session.receipt_url
//             console.log('reciept_url for payment deducted', receiptUrl);
//             break;
//         }
//         // case 'checkout.session.completed': {//second
//         //     const session = event.data.object;
//         //     const customer = await stripe.customers.retrieve(session.customer)
//         //     // await Cart.destroy({ where : {customerId: customer.metadata.customerId }})
//         //     // await orderService.updateOrderBySession(session)
//         //     console.log('checkout.session.completed---', session);
//         //     break;
//         // }
//         // case 'payment_intent.created': { // confirm: false
//         //     const session = event.data.object;
//         //     const customer = await stripe.customers.retrieve(session.customer);
//         //     const paymentIntentId = session.id; // Replace with your actual PaymentIntent ID

//         //     // Attach a payment method to the PaymentIntent
//         //     const paymentMethodId = "pm_123456789"; // Replace with the actual payment method ID
//         //     await stripe.paymentIntents.attach(paymentIntentId, {
//         //     payment_method: paymentMethodId
//         //     });
//         //     // Confirm the PaymentIntent
//         //     const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
//         //     console.log(confirmedPaymentIntent);
//         //     console.log('payment_intent.created', session);
//         //     break;
//         // }
//         default: {
//             console.log(`unhandle event type ${event.type}`)
//         }
//     }
//     return response(req, res, null, StatusCodes.OK, constant.Message.SUCCESSFUL, true)
// }


// exports.createCheckoutSession = async (req, res) => {

//     const email = req.email;

//     const { customerId } = await Customer.findOne({ where: { email }})
//     const customer = await stripe.customers.create({
//         email: email,
//         metadata: { customerId }
//     })

//     const session = await stripe.checkout.sessions.create({

//         payment_method_types: ['card'],
//         mode: 'setup',
//         customer: customer.id,
//         success_url: 'https://localhost:7777/success?sesssionId={CHECKOUT_SESSION_ID}',
//         cancel_url: 'https://localhost:7777/cancelled'
//     });
//     return response(req, res, session.url, StatusCodes.OK, 'successfully created checkout session', true)
// }

