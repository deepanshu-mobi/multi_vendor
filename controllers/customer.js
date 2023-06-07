const customerService = require('../services/customerService')
const { StatusCodes } = require('http-status-codes')

exports.register = async(req, res) => {
    
    const customer = await customerService.createCustomer(req.body)
    const response = {
        customerId: customer.customerId,
        name: customer.name
    }
    return res.status(StatusCodes.CREATED).send(response)
}