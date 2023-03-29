const express = require("express");
const { StatusCodes } = require("http-status-codes");
const mysqlConnection = require("../utils/database");

const Router = express.Router();

// <<********Version 2 SQL*********>> //
const getAllProducts = async (req, res, next) => {
  mysqlConnection.query("SELECT * FROM products", (err, results, fields) => {
    res.status(StatusCodes.OK).json({ products: results });
  });
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, results, fields) => {
      res.status(StatusCodes.OK).json({ products: results });
    }
  );
};

const createProduct = async (req, res) => {
  const {
    name,
    productName,
    productDescription,
    price,
    productReview,
    productDiscount,
  } = req.body;
  const sql =
    "INSERT INTO products (name, productName, productDescription, price, productReview, productDiscount) VALUES (?, ?, ?, ?, ?, ?)";
  mysqlConnection.query(
    sql,
    [
      name,
      productName,
      productDescription,
      price,
      productReview,
      productDiscount,
    ],
    (err, results, fields) => {
      const createdProduct = {
        id: results.insertId,
        name,
        productName,
        productDescription,
        price,
        productReview,
        productDiscount,
      };
      res.status(StatusCodes.CREATED).json({ product: createdProduct });
    }
  );
};

const updateProduct = async (req, res) => {
  const id = req.params.id; // get the id parameter from the URL
  const {
    name,
    productName,
    productDescription,
    price,
    productReview,
    productDiscount,
  } = req.body;
  const sql =
    "UPDATE products SET name=?, productName=?, productDescription=?, price=?, productReview=?, productDiscount=? WHERE id=?";
  mysqlConnection.query(
    sql,
    [
      name,
      productName,
      productDescription,
      price,
      productReview,
      productDiscount,
      id, // use the id parameter in the query
    ],
    (err, results, fields) => {
      const updatedProduct = {
        id: results.insertId,
        name,
        productName,
        productDescription,
        price,
        productReview,
        productDiscount,
      };
      res.status(StatusCodes.OK).json({ product: updatedProduct });
    }
  );
};

const deleteProduct = async (req, res) => {
  mysqlConnection.query(
    "DELETE FROM products WHERE ID= ? ",
    [req.params.id],
    (err, results, fields) => {
      res
        .status(StatusCodes.OK)
        .json({ message: "Product deleted successfully" });
    }
  );
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

// <<********MongoDB*********>> //

// const Product = require("../models/Product");
// const { StatusCodes } = require("http-status-codes");
// const { NotFoundError } = require("../errors");

// const getAllProducts = async (req, res, next) => {
//   const products = await Product.findAll();
//   res.status(StatusCodes.OK).json({ products });
// };

// const getProduct = async (req, res) => {
//   const { id } = req.params;
//   const product = await Product.findOne({ _id: id, deleted: false });
//   if (!product) {
//     throw new NotFoundError("product not found");
//   }
//   res.status(StatusCodes.OK).json({ product });
// };

// const createProduct = async (req, res) => {
//   const {
//     name,
//     productName,
//     productDescription,
//     price,
//     productReview,
//     productDiscount,
//   } = req.body;
//   const product = await Product.create({
//     name,
//     productName,
//     productDescription,
//     price,
//     productReview,
//     productDiscount,
//   });
//   res.status(StatusCodes.CREATED).json({ product });
// };

// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const product = await Product.findOneAndUpdate(
//     { _id: id, deleted: false },
//     req.body,
//     {
//       new: true,
//     }
//   );
//   if (!product) {
//     throw new NotFoundError("product not found");
//   }
//   res.status(StatusCodes.OK).json({ product });
// };

// const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   const numberDeletedElements = await Product.softDelete({ _id: id });
//   if (numberDeletedElements === 0) {
//     throw new NotFoundError("product not found");
//   }
//   res.status(StatusCodes.OK).json({ message: "Product deleted successfully" });
// };

// module.exports = {
//   getAllProducts,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// };
