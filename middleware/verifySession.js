const { StatusCodes } = require('http-status-codes')

const verifySession = (req, res, next) =>{


    if(!req.session || !req.session?.user?.email){
        return res.status(StatusCodes.BAD_REQUEST).send({error: 'Session does not exist'})
    }
    req.user = req.session.user
    next()
}

module.exports = {
    verifySession,
}