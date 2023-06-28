const orderController = require('../controllers/order');
const router = require('express').Router();
const { verifyToken } = require('../middleware/auth.jwt')

router.use(verifyToken)
router.post('/checkout', orderController.createCheckoutSession)

module.exports = router;