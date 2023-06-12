const userService = require('../services/adminService');
const { StatusCodes } = require('http-status-codes');



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
          return res.status(StatusCodes.OK).send({ 
            customer: response, mesg: 'Successfully loggedIn' 
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


