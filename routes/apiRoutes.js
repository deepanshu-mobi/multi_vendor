const { v1Customer } = require('./index')
const router = require('express').Router()

router.use('/v1/', v1Customer)


module.exports = router