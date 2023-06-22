const serverConfig = require('../config/server.config')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { response } = require('../utils/commonRes')

const verifyToken = (req, res, next) => {

    const token = req.headers['access-token'];
    if(!token){
        return res.status(StatusCodes.FORBIDDEN).send(response.failed('Access token is not provided'))
    }

    jwt.verify(token, serverConfig.SECRET, (err, decoded) => {
        if(err){
            return res.status(StatusCodes.UNAUTHORIZED).send(response.failed('Unauthorized'))
        }
        req.email = decoded.email;
        next()
    })
}

module.exports = {
    verifyToken
}