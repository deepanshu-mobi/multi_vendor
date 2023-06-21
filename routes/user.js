const router = require('express').Router();
const userController = require('../controllers/user')
const { expressValidator, isAdmin } = require('../middleware/validator');
const { loginValidator, userRegisterValidator } = require('../validation/userValidation')
const { verifySession } = require('../middleware/verifySession')

router.post('/user/register', userRegisterValidator, expressValidator, userController.register)
router.post('/user/login', loginValidator, expressValidator, userController.login)
router.use(verifySession)
router.get('/user/customers', isAdmin, userController.findCustomers)
router.get('/user/vendors', isAdmin, userController.findVendors)
router.get('/user/vendor/products', isAdmin, userController.findAllProductsOfVendor)
module.exports = router