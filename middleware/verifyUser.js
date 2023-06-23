const { User } = require('../models')
const constant = require('../utils/constant')
const { StatusCodes } = require('http-status-codes')
const { response } = require('../utils/commonRes')

const isVendor = async (req, res, next) => {

    const email  = req.email;
    const user = await User.findOne({ where: { email }});
    if(user.role == constant.UserType.VENDOR && user.role == constant.UserType.ADMIN && user.role == constant.UserType.SUPER_ADMIN){
        next()
    }
    else{
        return res.status(StatusCodes.BAD_REQUEST).send(response.failed('Invalid access'))
    }
}

module.exports = {
    isVendor
}