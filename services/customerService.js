const { Customer } = require('../models');
const bcrypt = require('bcryptjs')
const serverConfig = require('../config/server.config')
const jwt = require('jsonwebtoken')
const { nodeMailer } = require('../utils/sendEmail')


const createCustomer = async(body)=>{
    const { name, email, password, phoneNo} = body;
    const hashPassword = bcrypt.hashSync(password, 8)


    const customer = await Customer.create({
        name,
        email,
        phoneNo,
        password: hashPassword,
    })
    const token = jwt.sign({ id: customer.customerId }, serverConfig.SECRET, {expiresIn: 120})// 2 min
    const updateCustomer = await customer.update({token})
    nodeMailer(email, token)
    return updateCustomer
}

module.exports = {
    createCustomer,
}