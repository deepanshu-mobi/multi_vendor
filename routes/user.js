const router = require('express').Router();
const userController = require('../controllers/user')
const { expressValidator, isAdmin, isAdminOrCustomer } = require('../middleware/validator');
const { loginValidator, userRegisterValidator } = require('../validation/userValidation')
const { verifyToken } = require('../middleware/auth.jwt');
const { isVendor } = require('../middleware/verifyUser')

router.post('/user/register', userRegisterValidator, expressValidator, userController.register)
router.post('/user/login', loginValidator, expressValidator, userController.login)
router.use(verifyToken)
router.get('/user/customers', isAdmin, userController.findCustomers)
router.get('/user/vendors', isAdmin, userController.findVendors)
router.get('/user/vendor/products', isAdmin, userController.findAllProductsOfVendor);
router.post('/user/vendor/product', isVendor, userController.addProductByVendor);
router.get('/user/customer_locations', isAdmin, userController.findAllLocaitonsOfCustomer)
module.exports = router