const mysql = require('mysql');
const db = require('../config/db/DBconnection');
const Helper = require('./Helper');

exports.showDashboard = (req, res, next) => {
    db.query('SELECT COUNT(*) as numUser FROM accounts', (err, numUser) => {
        db.query('SELECT COUNT(*) as numOrder FROM order_unit', (err, numOrder) => {
            db.query('SELECT SUM(total) AS numPayment FROM payment;', (err, numPayment) => {
                res.render('admin/index', { layout: 'other', numUser, numOrder, numPayment });
            });
        });
    });
}


exports.showChart = (req, res, next) => {
    res.render('admin/chart', { layout: 'other' });
}


exports.showOrder = (req, res, next) => {

    db.query('SELECT * FROM payment JOIN (payment_on_order_unit JOIN (order_unit JOIN restaurant_user ON restaurant_user.id = order_unit.restaurant_user_id) ON order_unit.id = payment_on_order_unit.order_unit_id) ON payment.id=payment_on_order_unit.payment_id;', (err, result) => {
        // console.log(result);
        res.render('admin/order', { layout: 'other', result });
    });

}

exports.deleteOrder = (req, res) => {
    db.query('DELETE FROM payment_on_order_unit WHERE order_unit_id = ?', [req.body.id], (err) => {
        if (err) throw err;
        res.redirect('/admin/order');
    });

}




exports.showRevenue = (req, res, next) => {
    db.query('SELECT * FROM payment JOIN (payment_on_order_unit JOIN (order_unit JOIN restaurant_user ON restaurant_user.id = order_unit.restaurant_user_id) ON order_unit.id = payment_on_order_unit.order_unit_id) ON payment.id=payment_on_order_unit.payment_id;', (err, result) => {

        // console.log(result);
        res.render('admin/revenue', { layout: 'other', result });
    });

}

exports.deleteRevenue = (req, res) => {
    // console.log(req.body);

    db.query('DELETE FROM payment_on_order_unit WHERE payment_id = ?', [req.body.id], (err) => {
        db.query('DELETE FROM payemnt WHERE id = ?', [req.body.id], (err) => {

            if (err) throw err;
            res.redirect('/admin/revenue');
        });
    });

}

exports.showUser = (req, res, next) => {

    db.query('SELECT * FROM accounts JOIN restaurant_user ON accounts.restaurant_user_id=restaurant_user.id;', (err, result) => {
        // console.log(result);
        res.render('admin/user', { layout: 'other', result });
    });

}

exports.deleteUser = (req, res) => {
    
    db.query('DELETE FROM accounts WHERE id = ?', [req.body.id], (err) => {

        if (err) throw err;
        res.redirect('/admin/user');
    });

}


// API
exports.listAccount = (req, res) => {
    db.query('SELECT * FROM accounts;', (err, result) => {
        if (result.length > 0) {
            res.json({
                data: result
            })
        }
    });

}

exports.listFood = (req, res) => {

    db.query('SELECT * FROM food JOIN (food_on_order_detail JOIN order_detail ON food_on_order_detail.order_detail_id = order_detail.id) ON food_on_order_detail.food_id = food.id;', (err, result) => {
        if (result.length > 0) {
            res.json({
                data: result
            })
        }
    });

}

exports.listPayment = (req, res) => {

    db.query('SELECT * FROM payment JOIN (payment_on_order_unit JOIN (order_unit JOIN restaurant_user ON restaurant_user.id = order_unit.restaurant_user_id) ON order_unit.id = payment_on_order_unit.order_unit_id) ON payment.id=payment_on_order_unit.payment_id;', (err, result) => {
        if (result.length > 0) {
            res.json({
                data: result
            })
        }
    });

}

exports.listOrder = (req, res) => {

    db.query('SELECT * FROM payment JOIN (payment_on_order_unit JOIN (order_unit JOIN restaurant_user ON restaurant_user.id = order_unit.restaurant_user_id) ON order_unit.id = payment_on_order_unit.order_unit_id) ON payment.id=payment_on_order_unit.payment_id;', (err, result) => {
        if (result.length > 0) {
            res.json({
                data: result
            })
        }
    });

}


/********************************
 * MENU CONTROLLER
 *******************************/
 exports.add = (req, res, next) => {
    const addFood = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price
    }
    let sampleFile = 'null';
    // console.log(req.files.sampleImage);
    let uploadPath;
    // console.log(req.files);
    if (req.files != null) {
        sampleFile = req.files.sampleImage;
        uploadPath = './src/public/upload/' + sampleFile.name;
        sampleFile.mv(uploadPath, (err) => {
            if (err) return res.status(500).send(err);
            let sql = 'INSERT INTO food SET name = ?, price = ?, category = ?, description = ?, image = ?';
            db.query(sql, [addFood.name, addFood.price, addFood.category, addFood.description, sampleFile.name], (err, result) => {
                if (err) throw err;
                if (result) {
                    res.redirect('/admin/menu');
                }
            })
        });
    }
    else {
        let sql = `INSERT INTO food SET name = ?, price = ?, category = ?, description = ?, image = 'null'`;
        db.query(sql, [addFood.name, addFood.price, addFood.category, addFood.description], (err, result) => {
            if (err) throw err;
            if (result) {
                res.redirect('/admin/menu');
            }
        })
    }

}

exports.store = (req, res) => {
    db.query('SELECT * FROM food', (err, result) => {
        res.render('admin/store', { layout: 'other', result });
    });

}

exports.edit = (req, res) => {
    let sql = `SELECT * FROM food WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {

        res.render('admin/edit', { layout: 'other', result });
    });

}
exports.update = (req, res) => {
    let sampleFile;
    let uploadPath;
    if (req.files && Object.keys(req.files).length !== 0) {
        sampleFile = req.files.sampleImage;
        uploadPath = './src/public/upload/' + sampleFile.name;
        sampleFile.mv(uploadPath, (err) => {
            if (err) return res.status(500).send(err);
            let sql = `UPDATE food SET name = ?, description = ?, price = ?, image = ? WHERE id = ?`;
            let data = [
                req.body.name,
                req.body.description,
                req.body.price,
                sampleFile.name,
                req.params.id,
            ];
            db.query(sql, data, (err, result) => {
                res.redirect('/admin/menu');
            });

        });
    }
    else {
        let sql = `UPDATE food SET name = ?, description = ?, price = ? WHERE id = ?`;
        let data = [
            req.body.name,
            req.body.description,
            req.body.price,
            req.params.id,
        ];
        db.query(sql, data, (err, result) => {
            res.redirect('/admin/menu');
        });

    }

}

exports.delete = (req, res) => {
    db.query('DELETE FROM food WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/admin/menu');
    });

}