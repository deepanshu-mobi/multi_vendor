const customerService = require('../services/customerService')
const { Customer } = require('../models')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken');
const serverConfig = require('../config/server.config')

exports.register = async(req, res) => {
    
    const customer = await customerService.createCustomer(req.body);
    const response = {
        customerId: customer.customerId,
        name: customer.name
    }
    return res.status(StatusCodes.OK).send(response)
}


exports.verifyEmail = async(req, res)=> {

    const { token } = req.query;
    const user = await Customer.findOne({ where: { token }})
    if(user){
        jwt.verify(user.token, serverConfig.SECRET, async(err, decoded) =>{
            if(err){
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    message: 'unauthorized'
                })
            }
            user.isEmailVerified = 1
            await user.save()
            res.render('templates/emailVerify')
        })
    }
}
