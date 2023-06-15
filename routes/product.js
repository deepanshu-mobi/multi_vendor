const productController = require('../controllers/product');
const { verifySession } = require('../middleware/verifySession');
const router = require('express').Router()
const multer = require('../utils/multer')
const { validateNewProduct } = require('../validation/productValidation')
const { expressValidator } = require('../middleware/validator')

router.use(verifySession)
router.post('/user/product', multer.single('image'), validateNewProduct, expressValidator, productController.addProduct)

module.exports = router