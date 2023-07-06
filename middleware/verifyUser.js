const { User } = require('../models')
const constant = require('../utils/constant')
const { StatusCodes } = require('http-status-codes')
const { response } = require('../utils/commonRes')

const isVendor = async (req, res, next) => {

    const email  = req.email;
    const user = await User.findOne({ where: { email }});
    if(user.role == constant.UserType.VENDOR || user.role == constant.UserType.ADMIN || user.role == constant.UserType.SUPER_ADMIN){
        next()
    }
    else{
        return response(req, res, null, StatusCodes.BAD_REQUEST, 'Invalid access', false)
    }
}

module.exports = {
    isVendor
}