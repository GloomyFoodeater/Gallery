const mysql = require("mysql2/promise");
const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASS = 'admin';
const DB_NAME = 'gallery'
let connection;
(async function () {
    connection = await mysql.createConnection({
        host: DB_HOST, user: DB_USER, password: DB_PASS, database: DB_NAME
    });
}()).then();

function getConnection() {
    return connection;
}

module.exports.getConnection = getConnection;