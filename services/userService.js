const { User, Customer } = require('../models')
const bcrypt = require('bcryptjs')

const userRegister = async (body) => {

    const { name, email, password, role, phoneNo } = body;
    const hashPassword = bcrypt.hashSync(password, 8)
    const user = await User.create({
        name,
        email,
        role,
        phoneNo,
        password: hashPassword
    })
    return user
}


const userLogin = async (body) => {

    const { email } = body
    const user = await User.findOne({ where: { email }})
    return user
}

const findAllCustomers = async (value) =>{

    const customers = await Customer.findAll(value);
    return customers;
}

module.exports = {
    userRegister,
    userLogin,
    findAllCustomers,
}