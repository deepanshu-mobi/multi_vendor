const customerService = require('../services/customerService');
const { Customer } = require('../models');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const serverConfig = require('../config/server.config');
const bcrypt = require('bcryptjs');
const { response } = require('../utils/commonRes')

exports.register = async (req, res) => {
  try{
  const customer = await customerService.createCustomer(req.body);
  const resp = {
    customerId: customer.customerId,
    name: customer.name,
    accessToken: customer.token,
  };
  return res.status(StatusCodes.OK).send(response.successful('Customer created successfully', resp));
}catch(err){
  console.log('Error while registering customer',err)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response.failed(err))
}

};

exports.verifyEmail = async (req, res) => {

  try{
    const { token } = req.query;
    if(!token){
        return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Token is not provided' })
    }
    let message = '';
      jwt.verify(token, serverConfig.SECRET, async (err, decoded) => {
        if (err) {
          message = err.message
          return res.status(StatusCodes.BAD_REQUEST).send({
            message: err.message,
          });
        } 
        const customerId = decoded.id
        const customer = await Customer.findOne({ where: { customerId } });
        customer.isEmailVerified = 1;
        await customer.save();
        res.render('templates/emailVerify', { message });
      });
    }catch(err){
      console.log('Error while verifying Email',err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response.failed('Internal server error'))
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
        return res.status(StatusCodes.BAD_REQUEST).send(response.failed('Email is not verified yet try after sometime later'));
      }
      const token = jwt.sign({email: customer.email}, serverConfig.SECRET, { expiresIn: 180 })//3min
      const resp = {
        customerId: customer.customerId,
        name: customer.name,
        accessToken: token
      };
      return res.status(StatusCodes.OK).send(response.successful('Successfully loggedIn', resp));
    }
    return res.status(StatusCodes.BAD_REQUEST).send(response.failed('Email or Password may be wrong please try again'));
  }
  return res.status(StatusCodes.BAD_REQUEST).send(response.failed('User does not exist'));
  }catch(err){
    console.log('Error while loggin',err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response.failed('Internal server error'))
  }
};


