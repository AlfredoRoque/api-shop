const mysql = require('mysql');

const mysqlConection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_shop'
});

module.exports = mysqlConection;