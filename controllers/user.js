const userService = require('../services/userService');
const commonService = require('../services/commonService');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs')
const { response } = require('../utils/commonRes')
const jwt = require('jsonwebtoken');
const serverConfig = require('../config/server.config');
const constant = require('../utils/constant');


exports.register = async (req, res) => {

  try{
    const user = await userService.userRegister(req.body);
    const resp = {
      userId: user.userId,
      email: user.email,
      role: user.role
    }
    return response(req, res, resp, StatusCodes.CREATED, `${resp.role} ${constant.Message.CREATED_SUCCESSFULLY}`, true)
  }catch(err){
    console.log('Error while registering user', err);
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
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
            return response(req, res, null, StatusCodes.BAD_REQUEST, constant.Message.EMAIL_IS_NOT_VERIFIED_YET_TRY_AFTER_SOMETIME_LATER, false)
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
          return response(req, res, resp, StatusCodes.OK, constant.Message.SUCCESSFULLY_LOGGEDIN, true)
        }
        return response(req, res, null, StatusCodes.BAD_REQUEST, constant.Message.EMAIL_OR_PASSWORD_MAY_BE_WRONG_PLEASE_TRY_AGAIN, false)
      }
      return response(req, res, null, StatusCodes.BAD_REQUEST, constant.Message.USER_DOES_NOT_EXIST, false)
  }catch(err){
    console.log('Error while login user', err);
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
  }
}


exports.findCustomers = async (req, res) => {
  
  try{

  const customers = await userService.findAllCustomers({ attributes: { exclude: ['password', 'token'] } });
  return response(req, res, customers, StatusCodes.OK, constant.Message.SUCCESSFUL, true)

  }catch(err){
    console.log('Error while findAll customers', err)
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
  }
}


exports.findVendors = async (req, res) => {

  try{
  const vendors = await userService.findAllVendors({attributes: { exclude: ['password', 'token'] }})
  return response(req, res, vendors, StatusCodes.OK, constant.Message.SUCCESSFUL, true)
  }catch(err){
    console.log('Error while finding all vendors', err);
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
  }
}


exports.findAllProductsOfVendor = async (req, res) => {

  try{
  const { id } = req.query;
  if(!id){
    return response(req, res, null, StatusCodes.BAD_REQUEST, 'VendorId is not provided', false)
  }
  const vendors = await userService.findVendorProducts(id);
  if(!vendors.length){
    return response(req, res, null, StatusCodes.BAD_REQUEST, 'Not added any product yet', false)
  }
  return response(req, res, vendors, StatusCodes.OK, constant.Message.SUCCESSFUL, true)
  }catch(err){
    console.log('Error while finding vendor products', err);
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
  }
}


exports.addProductByVendor = async (req, res) => {

  try{ 

  const email = req.email;
  const vendorProduct = await userService.vendorAddingProduct(req.body, email);
  return response(req, res, vendorProduct, StatusCodes.OK, constant.Message.SUCCESSFULLY_PRODUCT_ADDED, true)

  }catch(err){
    console.log('Error while adding product by vendor', err);
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
  }

}


exports.findAllLocaitonsOfCustomer = async (req, res) => {

  try{

  const email = req.email;
  const { id } = req.query;
  if(!id){
    return response(req, res, null, StatusCodes.BAD_REQUEST, 'CustomerId is not provided', false)
  }
  const customerLocations = await commonService.findAllLocationsOfCustomer(email, id);
  if(!customerLocations.message){
    return response(req, res, customerLocations, StatusCodes.OK, constant.Message.SUCCESSFUL, true)
  }
  return response(req, res, null, StatusCodes.OK, customerLocations.message, true)

  }catch(err){
    console.log('Error while finding all locations of customer by admin', err);
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
  }

}
