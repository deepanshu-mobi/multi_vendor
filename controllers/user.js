const userService = require('../services/userService');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs')
const { response } = require('../utils/commonRes')
const jwt = require('jsonwebtoken');
const serverConfig = require('../config/server.config')


exports.register = async (req, res) => {

  try{
    const user = await userService.userRegister(req.body);
    const resp = {
      userId: user.userId,
      email: user.email,
      role: user.role
    }
    return response(req, res, resp, StatusCodes.CREATED, `${resp.role} created successfully`, true)
  }catch(err){
    console.log('Error while registering user', err);
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error', false)
  }
}

exports.login = async (req, res) => {

  try{
    const { password } = req.body;
    const user = await userService.userLogin(req.body);
    if (user) {

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {

          if (user.isEmailVerified === 0) {
            return response(req, res, null, StatusCodes.BAD_REQUEST, 'Email is not verified yet try after sometime later', false)
          }
          const token = jwt.sign({email: user.email}, serverConfig.SECRET, { expiresIn: 3600 })//3min

          const body = {
            userId: user.userId,
            token: token,
            deviceType: req.headers['user-agent']
          }
          await userService.userAccessTokenTable(body);

          const resp= {
            userId: user.userId,
            name: user.name,
            accessToken: token
          };
          return response(req, res, resp, StatusCodes.OK, 'Successfully loggedIn', true)
        }
        return response(req, res, null, StatusCodes.BAD_REQUEST, 'Email or Password may be wrong please try again', false)
      }
      return response(req, res, null, StatusCodes.BAD_REQUEST, 'User does not exist', false)
  }catch(err){
    console.log('Error while login user', err);
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error', false)
  }
}


exports.findCustomers = async (req, res) => {
  
  try{

  const customers = await userService.findAllCustomers({ attributes: { exclude: ['password', 'token'] } });
  return response(req, res, customers, StatusCodes.OK, 'Successful', true)

  }catch(err){
    console.log('Error while findAll customers',err)
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error', false)
  }
}


exports.findVendors = async (req, res) => {

  try{
  const vendors = await userService.findAllVendors({attributes: { exclude: ['password', 'token'] }})
  return response(req, res, vendors, StatusCodes.OK, 'Successful', true)
  }catch(err){
    console.log('Error while finding all vendors', err);
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error', false)
  }
}


exports.findAllProductsOfVendor = async (req, res) => {

  try{
  const { id } = req.query;
  const vendors = await userService.findVendorProducts(id)
  return response(req, res, vendors, StatusCodes.OK, 'Successful', true)
  }catch(err){
    console.log('Error while finding vendor products', err);
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error', false)
  }
}


exports.addProductByVendor = async (req, res) => {

  try{ 

  const email = req.email;
  const vendorProduct = await userService.vendorAddingProduct(req.body, email);
  return response(req, res, vendorProduct, StatusCodes.OK, 'Successfully added product', true)

  }catch(err){
    console.log('Error while adding product by vendor', err);
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error', false)
  }

}