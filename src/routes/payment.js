const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const router = express.Router();

router.get('/', checkoutController.showPayment);
// router.post('/payment', checkoutController.Checkout);



module.exports = router;