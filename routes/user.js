const router = require('express').Router();
const userController = require('../controllers/user')
const { expressValidator } = require('../middleware/validator');
const { loginValidator } = require('../validation/userValidation')


router.post('/user/login', loginValidator, expressValidator, userController.login)

module.exports = router