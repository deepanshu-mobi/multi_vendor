const productController = require('../controllers/product');
const { verifySession } = require('../middleware/verifySession');
const router = require('express').Router()
const multer = require('../utils/multer')

router.use(verifySession)
router.post('/user/product', multer.single('image'), productController.addProduct)

module.exports = router