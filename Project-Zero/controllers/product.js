const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllProducts = async (req, res, next) => {
  const products = await Product.find({ deleted: false });
  res.status(StatusCodes.OK).json({ products });
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id, deleted: false });
  if (!product) {
    throw new NotFoundError("product not found");
  }
  res.status(StatusCodes.OK).json({ product });
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
  const product = await Product.create({
    name,
    productName,
    productDescription,
    price,
    productReview,
    productDiscount,
  });
  res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndUpdate(
    { _id: id, deleted: false },
    req.body,
    {
      new: true,
    }
  );
  if (!product) {
    throw new NotFoundError("product not found");
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const numberDeletedElements = await Product.softDelete({ _id: id });
  if (numberDeletedElements === 0) {
    throw new NotFoundError("product not found");
  }
  res.status(StatusCodes.OK).json({ message: "Product deleted successfully" });
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
