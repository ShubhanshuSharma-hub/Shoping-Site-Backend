const mysql = require("mysql2");

const mysqlConnection = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "trialmango",
  })
  .promise();

mysqlConnection
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");
    connection.release();
  })
  .catch((err) => console.error("Error connecting to MySQL database:", err));

module.exports = mysqlConnection;
