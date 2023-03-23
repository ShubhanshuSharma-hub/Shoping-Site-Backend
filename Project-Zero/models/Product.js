const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      trim: true,
    },
    productName: {
      type: String,
      required: [true, "please provide product name"],
      trim: true,
    },
    productDescription: {
      type: JSON,
      required: [true, "please provide product description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "please provide product price"],
    },
    productReview: {
      type: Number,
      required: [true, "please provide product review"],
    },
    productDiscount: {
      type: String,
      required: [true, "please provide product discount"],
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
productSchema.statics.softDelete = async function (filter) {
  const result = await this.updateOne(filter, {
    deleted: true,
    deletedAt: new Date(),
  });
  return result.nModified;
};

// module.exports = mongoose.model("Product", productSchema);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// ***************** //

// const mongoose = require("mongoose");
// const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please provide name"],
//     minLength: 3,
//     maxLength: 50,
//   },
//   productName: {
//     type: String,
//     required: [true, "Please provide product name"],
//     minLength: 3,
//     maxLength: 50,
//   },
//   productDescription: {
//     type: JSON,
//     required: [true, "Please provide product name"],
//     minLength: 3,
//     maxLength: 50,
//   },
//   price: {
//     type: Number,
//     required: [true, "Please provide price"],
//   },
//   productReview: {
//     type: Number,
//   },
//   productDiscount: {
//     type: String,
//     minLength: 1,
//     maxLength: 10,
//   },
// });

// UserSchema.plugin(softDeletePlugin);

// const Product = mongoose.model("Product", UserSchema);
// module.exports = Product;
