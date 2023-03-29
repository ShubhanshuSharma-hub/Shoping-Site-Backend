create database MySQL_Windows;
USE MySQL_Windows;

const db = require("./dbConnect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUserTable = `
CREATE TABLE User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const User = {
  create: async (userData) => {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = `INSERT INTO User (name, email, password) VALUES (?, ?, ?);`;
    const values = [name, email, hashedPassword];
    const result = await new Promise((resolve, reject) => {
      db.query(insertQuery, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return result.insertId;
  },

  findByEmail: async (email) => {
    const selectQuery = `SELECT * FROM User WHERE email = ?;`;
    const values = [email];
    const result = await new Promise((resolve, reject) => {
      db.query(selectQuery, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return result[0];
  },

  findById: async (id) => {
    const selectQuery = `SELECT * FROM User WHERE id = ?;`;
    const values = [id];
    const result = await new Promise((resolve, reject) => {
      db.query(selectQuery, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return result[0];
  },

  generateToken: async (user) => {
    const { id, name, email } = user;
    const token = await jwt.sign(
      { userId: id, name, email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    return token;
  },

  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
};

module.exports = {
  User,
  createUserTable,
};
