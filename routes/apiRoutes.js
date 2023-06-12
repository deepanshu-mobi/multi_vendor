const { v1Customer, v1User } = require('./index')
const router = require('express').Router()

router.use('/v1/', v1Customer)
router.use('/v1/',v1User)


module.exports = router