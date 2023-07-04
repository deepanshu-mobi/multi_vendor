const customerService = require('../services/customerService');
const { Customer } = require('../models');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const serverConfig = require('../config/server.config');
const bcrypt = require('bcryptjs');
const { response } = require('../utils/commonRes')
const constant = require('../utils/constant')

exports.register = async (req, res) => {
  try{
  const customer = await customerService.createCustomer(req.body);
  const resp = {
    customerId: customer.customerId,
    name: customer.name,
    accessToken: customer.token,
  };
  return response(req, res, resp, StatusCodes.CREATED, constant.Message.CREATED_SUCCESSFULLY, true);
}catch(err){
  console.log('Error while registering customer',err)
  return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
}

};

exports.verifyEmail = async (req, res) => {
  
  try{
    const { token } = req.query;
    if(!token){
      return response(req, res, null, StatusCodes.BAD_REQUEST, constant.Message.TOKEN_IS_NOT_PROVIDED, false);
    }
    let message = '';
      jwt.verify(token, serverConfig.SECRET, async (err, decoded) => {
        if (err) {
          message = err.message
          return response(req, res, null, StatusCodes.BAD_REQUEST, { message: err.message }, false);
        } 
        const customerId = decoded.id
        const customer = await Customer.findOne({ where: { customerId } });
        customer.isEmailVerified = 1;
        await customer.save();
        res.render('templates/emailVerify', { message });
      });
    }catch(err){
      console.log('Error while verifying Email',err);
      return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
    }

};

exports.login = async (req, res) => {
  try{
  const { password } = req.body;
  const customer = await customerService.loginCustomer(req.body);
  if (customer) {

    const isValidPassword = await bcrypt.compare(password, customer.password);

    if (isValidPassword) {
      if (customer.isEmailVerified === 0) {
        return response(req, res, null, StatusCodes.BAD_REQUEST, constant.Message.EMAIL_IS_NOT_VERIFIED_YET_TRY_AFTER_SOMETIME_LATER, false);
      }

      const token = jwt.sign({email: customer.email}, serverConfig.SECRET, { expiresIn: 18000 })//3min

      const body = {
        customerId: customer.customerId,
        token: token,
        deviceType: req.headers['user-agent']
      }

      await customerService.customerAccessTokenTable(body)

      const resp = {
        customerId: customer.customerId,
        name: customer.name,
        accessToken: token
      };
      return response(req, res, resp, StatusCodes.OK, constant.Message.SUCCESSFULLY_LOGGEDIN, true);
    }
    return response(req, res, null, StatusCodes.BAD_REQUEST, constant.Message.EMAIL_OR_PASSWORD_MAY_BE_WRONG_PLEASE_TRY_AGAIN, false);
  }

  return response(req, res, null, StatusCodes.BAD_REQUEST, constant.Message.USER_DOES_NOT_EXIST, false);
  }catch(err){
    console.log('Error while loggin',err)
    return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
  }
};


exports.updateCartProductQuantity = async (req, res) => {

  try{
  const email = req.email;
  const cartProduct = await customerService.updateProductQuantity(req.body, email);
  if(!cartProduct){
    return response(req, res, cartProduct, StatusCodes.BAD_REQUEST, 'Given quantity is same as before', false)
  }
  return response(req, res, cartProduct, StatusCodes.OK, constant.Message.SUCCESSFUL, true);
  
}catch(err){
  console.log('Error while updating product quantity', err);
  return response(req, res, null, StatusCodes.INTERNAL_SERVER_ERROR, constant.Message.INTERNAL_SERVER_ERROR, false)
}
}
