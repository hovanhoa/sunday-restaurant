const express = require('express');
const CartController = require('../controllers/CartController');
const checkoutController = require('../controllers/checkoutController');
const mysql = require('mysql');
const db = require('../config/db/DBconnection');
const router = express.Router();

router.get('/', CartController.showCart);
router.post('/', CartController.updateCart);

router.get('/delete/:id', CartController.deleteItem);
module.exports = router;