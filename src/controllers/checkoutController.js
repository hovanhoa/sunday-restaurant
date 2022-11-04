const mysql = require('mysql');
const db = require('../config/db/DBconnection');

exports.Checkout = (req, res, next) => {
    // console.log(req.body);
    var name = req.body.payment_name;
    var address = req.body.payment_address;

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    var create_date = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    var restaurant_user_id = 2;
    if(req.session.user) {
        let sql = 'SELECT * FROM accounts, restaurant_user WHERE email = ? AND accounts.restaurant_user_id = restaurant_user.id';
        db.query(sql, req.session.user.email, (err, result) => {
            if(err) console.log(err);
            restaurant_user_id = parseInt(result[0]["restaurant_user_id"]);
            req.session.cart = null;
            let sql2 = 'INSERT INTO order_unit (state, create_date, delivery_address, restaurant_user_id) VALUE ("P",?, ? ,?)'
            db.query(sql2, [create_date, address, restaurant_user_id], (err, result) => {
                
                if (err) throw err;
                let sql3 = 'SELECT * FROM order_unit WHERE create_date = ?;';
                db.query(sql3, [create_date], (err, result) => {
                    if(err) console.log(err);
                    console.log(result[0]["id"]);
                });
                if (result) {
                    res.redirect('/payment');
                }
            })
        });
    }
    let sql2 = 'INSERT INTO order_unit (state, create_date, delivery_address, restaurant_user_id) VALUE ("P",?, ? ,?)'
    db.query(sql2, [create_date, address, restaurant_user_id], (err, result) => {
        
        if (err) throw err;
        let sql3 = 'SELECT * FROM order_unit WHERE create_date = ?;';
        db.query(sql3, [create_date], (err, result) => {
            if(err) console.log(err);
            let sql4 = 'INSERT INTO order_detail (quantity, order_unit_id) VALUE (?, ?);';
            for(let i = 0; i < req.session.cart.items.length;i ++){
                db.query(sql4, [req.session.cart.items[i]["qty"], result[0]["id"]]);
            }
            let sql5 = 'SELECT * FROM order_detail WHERE create_date = ?;';
            let sql6 = 'INSERT INTO food_on_order_detail (quantity, order_unit_id) VALUE (?, ?);';

            // console.log(req.session.cart.items.length);
        });
        if (result) {
            res.redirect('/payment');
        }
    })


    
    


};

exports.showPayment = (req, res, next) => {
    // const cart = req.session.cart;
    // console.log(cart);
    res.render('payment');
};

exports.showCheck = (req, res, next) => {
    const cart = req.session.cart;
    console.log(cart);
    res.render('checkout', { cart });
};

