const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const HomeController = require('../controllers/HomeController');
const MenuController = require('../controllers/MenuController');




router.get('/', HomeController.show);
router.post('/item-details', MenuController.showItemDetail);
router.post('/add-to-cart', ProductController.addToCart);









module.exports = router;