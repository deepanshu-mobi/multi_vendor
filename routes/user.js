const router = require('express').Router();
const userController = require('../controllers/user')

router.post('/user/login', userController.login)