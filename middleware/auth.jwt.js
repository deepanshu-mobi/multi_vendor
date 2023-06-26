const serverConfig = require('../config/server.config')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { response } = require('../utils/commonRes')

const verifyToken = (req, res, next) => {

    const token = req.headers['access-token'];
    if(!token){
        return response(req, res, null, StatusCodes.FORBIDDEN, 'Access token is not provided', false)
    }

    jwt.verify(token, serverConfig.SECRET, (err, decoded) => {
        if(err){
            return response(req, res, null, StatusCodes.UNAUTHORIZED, 'Unauthorized', false)
        }
        req.email = decoded.email;
        next()
    })
}

module.exports = {
    verifyToken
}