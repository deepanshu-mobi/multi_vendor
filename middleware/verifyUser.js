const { User } = require('../models')
const constant = require('../utils/constant')
const { StatusCodes } = require('http-status-codes')

const isVendor = async (req, res, next) => {

    const { email } = req.session.user;
    const user = await User.findOne({ where: { email }});
    if(user.role == constant.userType.vendor && user.role == constant.userType.admin && user.role == constant.userType.super_admin){
        next()
    }
    else{
        return res.status(StatusCodes.BAD_REQUEST).send({
            mesg: 'Invalid access'
        })
    }
}

module.exports = {
    isVendor
}