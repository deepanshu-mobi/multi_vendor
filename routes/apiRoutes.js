const { v1Customer, v1User, v1Product, v1Cart, v1Order } = require('./index')
const router = require('express').Router()

router.use('/v1/', v1Customer);
router.use('/v1/', v1User);
router.use('/v1/', v1Product);
router.use('/v1/', v1Cart);
router.use('/v1/', v1Order);


module.exports = router