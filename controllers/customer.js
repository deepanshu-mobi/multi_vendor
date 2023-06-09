const customerService = require('../services/customerService')
const { Customer } = require('../models')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken');
const serverConfig = require('../config/server.config')
const bcrypt = require('bcryptjs')

exports.register = async(req, res) => {
    
    const customer = await customerService.createCustomer(req.body);
    const response = {
        customerId: customer.customerId,
        name: customer.name,
        token: customer.token
    }
    return res.status(StatusCodes.OK).send(response)
}


exports.verifyEmail = async(req, res)=> {

    const { token } = req.query;
    const customer = await Customer.findOne({ where: { token }})
    if(customer){
        jwt.verify(customer.token, serverConfig.SECRET, async(err, decoded) =>{
            if(err){
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    message: 'unauthorized'
                })
            }
            customer.isEmailVerified = 1
            await customer.save()
            res.render('templates/emailVerify')
        })
    }
}


exports.login = async (req, res) => {

    const { password } = req.body
    const customer = await customerService.loginCustomer(req.body)
    if(customer){
        const isValidPassword = bcrypt.compare(password, customer.password)
        if(isValidPassword){
            if(customer.isEmailVerified === 0){
                return res.status(StatusCodes.BAD_REQUEST).send({ mesg: 'Email is not verified yet try after sometime later'})
            }
            const response = {
                customerId: customer.customerId,
                name: customer.name,
            }
            return res.status(StatusCodes.OK).send({customer: response, mesg: 'Successfully loggedIn' })
        }
        return res.status(StatusCodes.BAD_REQUEST).send({ mesg: 'Email or Password may be wrong please try again' })
    }
    return res.status(StatusCodes.BAD_REQUEST).send({ mesg: 'User does not exist'})
}