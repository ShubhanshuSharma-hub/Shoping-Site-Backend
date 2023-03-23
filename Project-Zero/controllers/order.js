const Order = require("../models/Order");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllOrderProducts = async (req, res, next) => {
  const order = await Order.find({ deleted: false });
  res.status(StatusCodes.OK).json({ order });
};

const createOrderProducts = async (req, res, next) => {
  const { product, quantity } = req.body;

  // fetch the product name from the Product Collection
  const selectProduct = await Product.findById(product);
  if (!selectProduct) {
    throw new NotFoundError("product not found");
  }

  const order = await Order.create({
    product,
    productName: selectProduct.productName,
    quantity,
  });
  res.status(StatusCodes.CREATED).json({ order });
};

const updateOrder = async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOneAndUpdate(
    { _id: id, deleted: false },
    req.body,
    { new: true }
  );
  if (!order) {
    throw new NotFoundError("product not found");
  }
  res.status(StatusCodes.OK).json({ order });
};


const deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  const numberDeletedElements = await Order.softDelete({ _id: id });
  if (numberDeletedElements === 0) {
    throw new NotFoundError("product not found");
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "Product deleted from orders successfully" });
};

module.exports = {
  getAllOrderProducts,
  createOrderProducts,
  updateOrder,
  deleteOrder,
};
