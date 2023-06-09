const customerController = require('../controllers/customer')
const router = require('express').Router();

router.post('/customer/register', customerController.register);
router.get('/customer/verify/email', customerController.verifyEmail)


module.exports = router