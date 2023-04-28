const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const mysqlConnection = require("../utils/database");

const Router = express.Router();

// <<********Version 2 SQL*********>> //
const getAllProducts = async (req, res, next) => {
  const [result] = await mysqlConnection.query(
    "SELECT * FROM products WHERE is_deleted = 0"
  );
  res.status(StatusCodes.OK).json({ products: result });
};

const getProduct = async (req, res) => {
  const idproduct = req.params.id;
  const [result] = await mysqlConnection.query(
    "SELECT * FROM products WHERE idproduct = ? AND is_deleted = 0",
    [idproduct]
  );
  if (result.length === 0) {
    throw new BadRequestError(
      "Product no longer exist or unknow product requested"
    );
  }
  res.status(StatusCodes.OK).json({ products: result });
};

const createProduct = async (req, res, next) => {
  const {
    name,
    productName,
    productDescription,
    price,
    productReview,
    productDiscount,
  } = req.body;

  // Check if product already exists
  const [existingProduct] = await mysqlConnection.query(
    "SELECT * FROM products WHERE name = ? AND productName = ?",
    [name, productName]
  );

  if (existingProduct.length > 0) {
    throw new BadRequestError("Product already exists");
  }

  const discountedPrice = price - (price * productDiscount) / 100;

  const sql =
    "INSERT INTO products (name, productName, productDescription, price, discountedPrice, productReview, productDiscount, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  const [result] = await mysqlConnection.query(sql, [
    name,
    productName,
    productDescription,
    price,
    discountedPrice,
    productReview,
    productDiscount,
    0,
  ]);

  const createdProduct = {
    idproduct: result.insertId,
    name,
    productName,
    productDescription,
    price,
    discountedPrice,
    productReview,
    productDiscount,
  };

  res.status(StatusCodes.CREATED).json({ product: createdProduct });
};

const updateProduct = async (req, res) => {
  const idproduct = req.params.id;
  const {
    name,
    productName,
    productDescription,
    price,
    productReview,
    productDiscount,
  } = req.body;

  const discountedPrice = price - (price * productDiscount) / 100;

  // check if the product exists in the database
  const checkSql = "SELECT * FROM products WHERE idproduct = ?";
  const [checkResult] = await mysqlConnection.query(checkSql, [idproduct]);
  if (checkResult.length === 0) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `Product with id ${idproduct} not found.` });
    return;
  }

  const updateSql =
    "UPDATE products SET name=?, productName=?, productDescription=?, price=?, discountedPrice=?, productReview=?, productDiscount=? WHERE idproduct=?";

  await mysqlConnection.query(updateSql, [
    name,
    productName,
    productDescription,
    price,
    discountedPrice,
    productReview,
    productDiscount,
    idproduct,
  ]);

  const updatedProduct = {
    idproduct,
    name,
    productName,
    productDescription,
    price,
    discountedPrice,
    productReview,
    productDiscount,
  };

  res.status(StatusCodes.OK).json({ product: updatedProduct });
};

const deleteProduct = async (req, res) => {
  const idproduct = req.params.id;
  await mysqlConnection.query(
    "UPDATE products SET is_deleted = 1 WHERE idproduct= ?",
    [idproduct]
  );
  res.status(StatusCodes.OK).json({ message: "Product deleted successfully" });
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

// <<********Version 1 SQL*********>> //

// Router.get("/", (req, res) => {
//   mysqlConnection.query("SELECT * FROM products", (err, results, fields) => {
//     if (!err) {
//       res.send(results);
//     } else {
//       console.log(err);
//     }
//   });
// });

// Router.post("/", (req, res) => {
//   let qb = req.body;
//   const sql =
//     "INSERT INTO products (name, productName, productDescription, price, productReview, productDiscount) VALUES (?, ?, ?, ?, ?, ?)";
//   mysqlConnection.query(
//     sql,
//     [
//       qb.name,
//       qb.productName,
//       qb.productDescription,
//       qb.price,
//       qb.productReview,
//       qb.productDiscount,
//     ],
//     (err, results, fields) => {
//       if (!err) {
//         res.send("Product added successfully!");
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

// Router.patch("/:id", (req, res) => {
//   const id = req.params.id; // get the id parameter from the URL
//   const qb = req.body;
//   const sql =
//     "UPDATE products SET name=?, productName=?, productDescription=?, price=?, productReview=?, productDiscount=? WHERE id=?";
//   mysqlConnection.query(
//     sql,
//     [
//       qb.name,
//       qb.productName,
//       qb.productDescription,
//       qb.price,
//       qb.productReview,
//       qb.productDiscount,
//       id, // use the id parameter in the query
//     ],
//     (err, results, fields) => {
//       if (!err) {
//         res.send(
//           "The data for the selected product has been successfully updated."
//         );
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

// Router.delete("/:id", (req, res) => {
//   mysqlConnection.query(
//     "DELETE FROM products WHERE ID= ? ",
//     [req.params.id],
//     (err, results, fields) => {
//       if (!err) {
//         res.send("The selected product has been successfully deleted.");
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

// module.exports = Router;
