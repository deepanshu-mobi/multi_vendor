const userService = require('../services/userService');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs')


exports.login = async (req, res) => {

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
}


