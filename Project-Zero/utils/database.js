const mysql = require("mysql2");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "trialmango",
  multipleStatements: true,
});

mysqlConnection.connect((error) => {
  if (!error) {
    console.log("Connection to SQL has been established successfully.");
  } else {
    console.error("Unable to connect to the database:", error);
  }
});

module.exports = mysqlConnection;
