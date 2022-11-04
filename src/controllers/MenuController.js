const mysql = require('mysql');
const db = require('../config/db/DBconnection');

exports.showItemDetail = (req, res, next) => {
    db.query('SELECT * FROM food WHERE id = ?', [req.body.id], (err, result) => {
        if (err) throw err;
        const id = req.body.id;
        res.json({ data: result });
        // if (result) {
        //     res.json({
        //         data: result
        //     });
        // }
    });
}