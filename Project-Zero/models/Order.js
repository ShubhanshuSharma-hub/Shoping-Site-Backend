const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please provide product id"],
      trim: true,
    },
    productName: {
      type: String,
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity"],
      min: [1, "Quantity must be at least 1"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Add soft delete function to the product schema
orderSchema.statics.softDelete = async function (filter) {
  const result = await this.updateOne(filter, {
    deleted: true,
    deletedAt: new Date(),
  });
  return result.nModified;
};

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
