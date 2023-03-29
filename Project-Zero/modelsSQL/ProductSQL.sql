create database MySQL_Windows;
USE MySQL_Windows;

const db = require("./dbConnect");

const productSchema = `
CREATE TABLE Product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  productName VARCHAR(255) NOT NULL,
  productDescription TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  productReview DECIMAL(2,1) NOT NULL,
  productDiscount VARCHAR(10) NOT NULL,
  deleted BOOLEAN DEFAULT 0,
  deletedAt DATETIME DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const softDelete = async (filter) => {
  const sql = `UPDATE Product SET deleted = 1, deletedAt = NOW() WHERE ${filter};`;
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
  productSchema,
  softDelete,
};
