const mysql = require('mysql');
const db = require('../config/db/DBconnection');
const Cart = require('../models/Cart');
const Helper = require('./Helper');

var myCart;
exports.addToCart = (req, res) => {
    db.query('SELECT * FROM food WHERE id = ?', [req.body.id], (err, result) => {
        if (req.session.cart) {
            const oldCart = req.session.cart;
            myCart = Helper.Assign(oldCart);
            myCart.save(result[0]);
            req.session.cart = myCart;
        }
        else {
            myCart = new Cart();
            myCart.save(result[0]);
            req.session.cart = myCart;
        }
        res.json({
            status: 200,
            totalQuantity: myCart.totalQuantity
        });
    });

}