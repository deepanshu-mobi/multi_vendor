const cartController = require('../controllers/cart');
const router = require('express').Router();
const { verifyToken } = require('../middleware/auth.jwt')

router.use(verifyToken)
router.post('/customer/cart', cartController.addToCart);
router.delete('/customer/clear_cart', cartController.clearCart);
router.delete('/customer/delete_cart_product', cartController.removeProductInCart);
router.get('/customer/cart_products', cartController.cartProducts)

module.exports = router;