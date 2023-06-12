const router = require('express').Router();
const userController = require('../controllers/user')
const { expressValidator, isAdmin } = require('../middleware/validator');
const { loginValidator } = require('../validation/userValidation')
const { verifySession } = require('../middleware/verifySession')

router.post('/user/login', loginValidator, expressValidator, userController.login)
router.use(verifySession)
router.get('/customer/customers', isAdmin, userController.findAll)
module.exports = router