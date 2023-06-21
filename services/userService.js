const { User, Customer, ProductVendorMapping, Product } = require('../models')
const bcrypt = require('bcryptjs')
const constant = require('../utils/constant')

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

const findAllVendors = async (value) => {
    const users = await User.findAll(value);
    const vendors = [];
    users.forEach((user) => {
        if(user.role == constant.userType.vendor){
            vendors.push(user)
        }
    })
    return vendors;
}

const findVendorProducts = async (vendorId) => {

    const users = await ProductVendorMapping.findAll({ where: { vendorId } ,attributes: ['vendorId'], include: { model: Product } });
    return users;
}

module.exports = {
    userRegister,
    userLogin,
    findAllCustomers,
    findAllVendors,
    findVendorProducts,
}