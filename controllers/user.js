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
    return res.status(StatusCodes.CREATED).send(response.successful(`${resp.role} created successfullu`,resp))
  }catch(err){
    console.log('Error while registering user', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response.failed('Internal server error'))
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
            return res.status(StatusCodes.BAD_REQUEST).send(response.failed('Email is not verified yet try after sometime later'));
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
          return res.status(StatusCodes.OK).send(response.successful('Successfully loggedIn',resp));
        }
        return res.status(StatusCodes.BAD_REQUEST).send(response.failed('Email or Password may be wrong please try again'));
      }
      return res.status(StatusCodes.BAD_REQUEST).send(response.failed('User does not exist'));
  }catch(err){
    console.log('Error while login user', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response.failed('Internal server error'))
  }
}


exports.findCustomers = async (req, res) => {
  
  try{

  const customers = await userService.findAllCustomers({ attributes: { exclude: ['password', 'token'] } });
  return res.json(customers)

  }catch(err){
    console.log('Error while findAll customers',err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response.failed('Internal server error'))
  }
}


exports.findVendors = async (req, res) => {

  try{
  const vendors = await userService.findAllVendors({attributes: { exclude: ['password', 'token'] }})
  return res.status(StatusCodes.OK).send(vendors)
  }catch(err){
    console.log('Error while finding all vendors', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response.failed('Internal server error'))
  }
}


exports.findAllProductsOfVendor = async (req, res) => {

  try{
  const { id } = req.query;
  const vendors = await userService.findVendorProducts(id)
  return res.status(StatusCodes.OK).send(vendors)
  }catch(err){
    console.log('Error while finding vendor products', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response.failed('Internal server error'))
  }
}


exports.addProductByVendor = async (req, res) => {

  try{ 

  const email = req.email;
  const vendorProduct = await userService.vendorAddingProduct(req.body, email);
  return res.status(StatusCodes.CREATED).send(response.successful('Successfully added product', vendorProduct))

  }catch(err){
    console.log('Error while adding product by vendor', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response.failed('Internal server error'))
  }

}