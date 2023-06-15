const { v1Customer, v1User, v1Product } = require('./index')
const router = require('express').Router()

router.use('/v1/', v1Customer)
router.use('/v1/',v1User)
router.use('/v1/', v1Product)


module.exports = router