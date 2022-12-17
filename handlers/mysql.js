var mysql   = require('mysql2'),
    config  = require("../config");

var sqlConnection = function sqlConnection(sql, values, next) {

    if (arguments.length === 2) {
        next = values;
        values = null;
    }

    var connection = mysql.createPool(config.db);

    connection.query(sql, values, function(err) {

        connection.end(); 

        if (err) {
            throw err;
        }

        next.apply(this, arguments);
    });
}
module.exports = sqlConnection;