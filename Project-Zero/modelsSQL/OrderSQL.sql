  create database MySQL_Windows;
  USE MySQL_Windows;

  const { db } = require("./dbConnect");

  const orderSchema = `
  CREATE TABLE Order (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    productName VARCHAR(255),
    quantity INT NOT NULL,
    deleted BOOLEAN DEFAULT 0,
    deletedAt DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Product(id)
  );
  `;

  const softDelete = async (filter) => {
    const sql = `UPDATE Order SET deleted = 1, deletedAt = NOW() WHERE ${filter};`;
    const result = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return result.affectedRows;
  };

  module.exports = {
    orderSchema,
    softDelete,
  };

