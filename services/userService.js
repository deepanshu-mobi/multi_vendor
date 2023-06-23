const { User, Customer, ProductVendorMapping, Product, UserAccessToken } = require('../models')
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
        if(user.role == constant.UserType.VENDOR){
            vendors.push(user)
        }
    })
    return vendors;
}

const findVendorProducts = async (vendorId) => {

    const users = await ProductVendorMapping.findAll({ where: { vendorId } ,attributes: ['vendorId'], include: { model: Product } });
    return users;
}


const userAccessTokenTable = async (body) => {

    let { userId, token, deviceType } = body;
    const mixId = userId + (Math.floor(Math.random()*1000)+1);
    
    if (deviceType.includes("Mobile")) {
        deviceType = "Mobile";
      } else if (deviceType.includes("Tablet")) {
        deviceType = "Tablet";
      } else {
        deviceType = "Desktop";
      }
    const tokenBody = await UserAccessToken.create({
        userId,
        token,
        deviceType,
        deviceId: mixId
    })
    return tokenBody;
}


const vendorAddingProduct = async (body, email) => {

    const { productId } = body;

    const user = await User.findOne({ where: { email } });
    const vendorProduct = await ProductVendorMapping.create({
        productId,    
        vendorId: user.userId
    })
    return vendorProduct;
}


module.exports = {
    userRegister,
    userLogin,
    findAllCustomers,
    findAllVendors,
    findVendorProducts,
    userAccessTokenTable,
    vendorAddingProduct,
}