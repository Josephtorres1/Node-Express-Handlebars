const mysql = require("mysql");
var connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "burger_db",
  });
}

connection.connect(function (err) {
  if (err) {
    console.error("There was an error connecting: " + err.stack);
    return;
  }
  console.log("Connected as ID " + connection.threadId);
});
module.exports = connection;
