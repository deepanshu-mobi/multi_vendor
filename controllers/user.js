const userService = require('../services/userService');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs')



exports.register = async (req, res) => {

  try{
    const user = await userService.userRegister(req.body);
    const response = {
      userId: user.userId,
      email: user.email,
      role: user.role
    }
    return res.status(StatusCodes.CREATED).send(response)
  }catch(err){
    console.log('Error while registering user', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: 'Internal server error'
    })
  }
}

exports.login = async (req, res) => {

  try{
    const { password } = req.body;
    const user = await userService.userLogin(req.body);
    if (user) {
        const isValidPassword = bcrypt.compare(password, user.password);
        if (isValidPassword) {
          if (user.isEmailVerified === 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({ 
                mesg: 'Email is not verified yet try after sometime later' 
            });
          }
          const response = {
            userId: user.userId,
            name: user.name,
          };
          return res.status(StatusCodes.OK).send({ 
            user: response, mesg: 'Successfully loggedIn' 
        });
        }
        return res.status(StatusCodes.BAD_REQUEST).send({ 
            mesg: 'Email or Password may be wrong please try again' 
        });
      }
      return res.status(StatusCodes.BAD_REQUEST).send({ 
        mesg: 'User does not exist' 
    });
  }catch(err){
    console.log('Error while login user', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: 'Internal server error'
    })
  }
}


exports.findCustomers = async (req, res) => {
  
  try{

  const customers = await userService.findAllCustomers({ attributes: { exclude: ['password', 'token'] } });
  return res.json(customers)

  }catch(err){
    console.log('Error while findAll customers',err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: 'Internal server error'
    })
  }
}


exports.findVendors = async (req, res) => {

  try{
  const vendors = await userService.findAllVendors({attributes: { exclude: ['password', 'token'] }})
  return res.status(StatusCodes.OK).send(vendors)
  }catch(err){
    console.log('Error while finding all vendors', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: 'Internal server error'
    })
  }
}


exports.findAllProductsOfVendor = async (req, res) => {

  try{
  const { id } = req.query;
  const vendors = await userService.findVendorProducts(id)
  return res.status(StatusCodes.OK).send(vendors)
  }catch(err){
    console.log('Error while finding vendor products', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: 'Internal server error'
    })
  }
}