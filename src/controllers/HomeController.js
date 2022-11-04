const mysql = require('mysql');
const db = require('../config/db/DBconnection');
const Helper = require('./Helper');

exports.show = (req, res) => {
    db.query('SELECT * FROM food', (err, result) => {
        res.render('index', { result });
    });

}
