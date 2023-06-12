const { User, Customer } = require('../models')

const adminLogin = async (body) => {

    const { email } = body
    const user = await User.findOne({ where: { email }})
    return user
}

const findAllCustomers = async (value) =>{

    const customers = await Customer.findAll(value);
    return customers;
}

module.exports = {
    adminLogin,
    findAllCustomers,
}