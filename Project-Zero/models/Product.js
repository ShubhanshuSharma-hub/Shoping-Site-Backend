const sequelize = require("../db/dbSQLConnect");
const { DataTypes, Model, INTEGER } = require("sequelize");

class Product extends Model {}

module.exports = () => {
  const Products = sequelize.define("Products", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a name",
        },
      },
      set(value) {
        this.setDataValue("name", value.trim());
      },
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a product name",
        },
      },
      set(value) {
        this.setDataValue("productName", value.trim());
      },
    },
    productDescription: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a product description",
        },
      },
      set(value) {
        this.setDataValue("productDescription", value.trim());
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a product price",
        },
      },
    },
    productReview: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a product review",
        },
      },
    },
    productDiscount: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a product discount",
        },
      },
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Products;
};

// <<---********************--->> //

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const productSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "please provide name"],
//       trim: true,
//     },
//     productName: {
//       type: String,
//       required: [true, "please provide product name"],
//       trim: true,
//     },
//     productDescription: {
//       type: JSON,
//       required: [true, "please provide product description"],
//       trim: true,
//     },
//     price: {
//       type: Number,
//       required: [true, "please provide product price"],
//     },
//     productReview: {
//       type: Number,
//       required: [true, "please provide product review"],
//     },
//     productDiscount: {
//       type: String,
//       required: [true, "please provide product discount"],
//     },
//     deleted: {
//       type: Boolean,
//       default: false,
//     },
//     deletedAt: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// // Add soft delete function to the product schema
// productSchema.statics.softDelete = async function (filter) {
//   const result = await this.updateOne(filter, {
//     deleted: true,
//     deletedAt: new Date(),
//   });
//   return result.nModified;
// };

// // module.exports = mongoose.model("Product", productSchema);

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;
