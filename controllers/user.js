const userService = require('../services/userService');
const customerService = require('../services/customerService');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs')


exports.login = async (req, res) => {

  try{
    const { password } = req.body;
    const user = await userService.adminLogin(req.body);
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
          req.session.user = {
            email: user.email
          }
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
    console.log('Error while login user',err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: 'Internal server error'
    })
  }
}


exports.findAll = async (req, res) => {
  
  try{
  const customers = await customerService.findAllCustomers({ attributes: {exclude: ['password']} });
  return res.status(StatusCodes.OK).send(customers)
  }catch(err){
    console.log('Error while findAll customers',err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: 'Internal server error'
    })
  }

}
