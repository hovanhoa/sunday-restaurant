const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.show);
router.post('/add-to-cart', productController.addToCart);
module.exports = router;