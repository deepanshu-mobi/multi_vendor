const customerController = require('../controllers/customer')
const router = require('express').Router();

router.post('/customer/register', customerController.register);


module.exports = router