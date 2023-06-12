const customerController = require('../controllers/customer')
const router = require('express').Router();
const { validateRegistration, validateLogin } = require('../validation/customerValidation')
const { expressValidator, isAdmin } = require('../middleware/validator')
const { verifySession } = require('../middleware/verifySession')

router.post('/customer/register', validateRegistration, expressValidator, customerController.register);
router.post('/customer/login', validateLogin, expressValidator, customerController.login);
router.get('/customer/verify/email', customerController.verifyEmail);
router.use(verifySession)
router.get('/customer/customers', isAdmin, customerController.findAll)

module.exports = router