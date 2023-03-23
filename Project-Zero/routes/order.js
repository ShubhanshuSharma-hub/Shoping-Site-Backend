const express = require("express");
const router = express.Router();

const {
  getAllOrderProducts,
  createOrderProducts,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

router.route("/").get(getAllOrderProducts).post(createOrderProducts);
router.route("/:id").delete(deleteOrder).patch(updateOrder);

module.exports = router;
