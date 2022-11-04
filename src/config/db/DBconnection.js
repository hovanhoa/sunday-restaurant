const mysql = require('mysql');

/**
 * Import config.json as a configure file for database conneciton
 * Edit database infomation from config.json
 */

const config = require('../config.json');
const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password || "",
    database: config.database,
    multipleStatements: true,
    port: config.port
});

db.connect((err) => {
    if (err) throw err;
    else console.log('Database is connected');
});
module.exports = db;
