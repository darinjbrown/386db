let mysql = require('mysql');

let connection = mysql.createConnection({
    debug: true,

	host: 'localhost',
	port: 3306,
	user: 'cs386_dbrown',
	password:'br5496',
	database: 'cs386_dbrown'
});

module.exports = connection;
