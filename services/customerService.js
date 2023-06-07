const { Customer } = require('../models');
const bcrypt = require('bcryptjs')

const createCustomer = async(body)=>{
    const { name, email, password, phoneNo} = body;
    const hashPassword = bcrypt.hashSync(password, 8)
    const customer = await Customer.create({
        name,
        email,
        phoneNo,
        password: hashPassword
    })
    return customer
}

module.exports = {
    createCustomer,
}