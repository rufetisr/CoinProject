let mysql = require('mysql2');

let config = {
    host: "localhost",
    user: 'root',
    database: 'pennyDb',
    password: 'mysql2003s@',
    multipleStatements: true,
}
let connection = mysql.createConnection(config);

module.exports = connection;