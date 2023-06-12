const customerController = require('../controllers/customer')
const router = require('express').Router();
const { validateRegistration, validateLogin } = require('../validation/customerValidation')
const { expressValidator } = require('../middleware/validator')


router.post('/customer/register', validateRegistration, expressValidator, customerController.register);
router.post('/customer/login', validateLogin, expressValidator, customerController.login);
router.get('/customer/verify/email', customerController.verifyEmail);
router.get('/customer/customers', customerController.findAll)

module.exports = router