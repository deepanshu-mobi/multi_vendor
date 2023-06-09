const customerController = require('../controllers/customer')
const router = require('express').Router();
const { validateRegistration } = require('../validation/customerValidation')
const { expressValidator } = require('../middleware/validator')

router.post('/customer/register', validateRegistration, expressValidator, customerController.register);
router.get('/customer/verify/email', customerController.verifyEmail)


module.exports = router