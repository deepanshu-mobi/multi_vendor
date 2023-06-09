const { Customer } = require('../models');
const bcrypt = require('bcryptjs')
const serverConfig = require('../config/server.config')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../utils/sendEmail')


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
    sendEmail(email, token)
    return updateCustomer
}

const loginCustomer = async (body)=> {

    const { email } = body;
    const user = await Customer.findOne({ where: { email } });
    return user
}
module.exports = {
    createCustomer,
    loginCustomer,
}