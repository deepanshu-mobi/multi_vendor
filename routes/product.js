const productController = require('../controllers/product');
const router = require('express').Router()
const multer = require('../utils/multer')
const { validateNewProduct } = require('../validation/productValidation')
const { expressValidator, isSuperAdmin } = require('../middleware/validator')
const { verifyToken } = require('../middleware/auth.jwt')

router.use(verifyToken)
router.post('/user/product', isSuperAdmin, multer.array('image'), validateNewProduct, expressValidator, productController.addProduct)

module.exports = router