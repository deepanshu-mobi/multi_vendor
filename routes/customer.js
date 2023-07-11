const customerController = require('../controllers/customer')
const router = require('express').Router();
const { validateRegistration, validateLogin } = require('../validation/customerValidation')
const { expressValidator } = require('../middleware/validator')
const { verifyToken } = require('../middleware/auth.jwt')

router.post('/customer/register', validateRegistration, expressValidator, customerController.register);
router.post('/customer/login', validateLogin, expressValidator, customerController.login);
router.get('/customer/verify/email', customerController.verifyEmail);

router.put('/customer/cart/product', verifyToken, customerController.updateCartProductQuantity);
router.post('/customer/location', verifyToken, customerController.addNewCustomerLocation);
router.get('/customer/locations', verifyToken, customerController.findAllLocaitons);
router.put('/customer/location_update', verifyToken, customerController.updateCustomerLocation);
router.delete('/customer/location_delete', verifyToken, customerController.deleteLocation)

module.exports = router