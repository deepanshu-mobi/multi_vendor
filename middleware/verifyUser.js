const { User } = require('../models')
const constant = require('../utils/constant')
const { StatusCodes } = require('http-status-codes')
const { response } = require('../utils/commonRes')

const isVendor = async (req, res, next) => {

    const { email } = req.email;
    const user = await User.findOne({ where: { email }});
    if(user.role == constant.userType.vendor && user.role == constant.userType.admin && user.role == constant.userType.super_admin){
        next()
    }
    else{
        return res.status(StatusCodes.BAD_REQUEST).send(response.failed('Invalid access'))
    }
}

module.exports = {
    isVendor
}