const { validationResult } = require("express-validator")
const { StatusCodes } = require('http-status-codes')
const { User } = require('../models')
const constant = require('../utils/constant')
const deleteImage = require('../utils/deleteImage')

const expressValidator = (req, res, next) =>{
    
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        if(req.file){
            deleteImage(req.file.path)
        }
        return res.status(StatusCodes.BAD_REQUEST).send({
            error: errors.array()[0].msg
        })
    }
    next()
}

function isValidEmail(value) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    value = String(value).search (filter) != -1
    if(!value) {
        throw new Error('Invalid Email Formate')
    }
    return value
}

function isValidPassword(value)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    value = re.test(value);
    if(!value) {
        throw new Error('Password should be have at least a symbol, upper and lower case letters and a number');
    }
    return value
}

const isAdmin = async (req, res, next) => {
    const { email } = req.user
    const user = await User.findOne({ where: { email }});

    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).send({ mesg: 'Only admin allow to access this endPoint' })
    }else if(user.isEmailVerified === 0){
        return res.status(StatusCodes.BAD_REQUEST).send({ mesg: 'Only verified admin allow to access this endPoint' })
    }
    else if(user.role == constant.userType.vendor){
        return res.status(StatusCodes.BAD_REQUEST).send({ mesg: 'Only admin allow to access this endPoint not vendors' }) 
    }
    next()
}

module.exports = {
    expressValidator,
    isValidPassword,
    isValidEmail,
    isAdmin,
}