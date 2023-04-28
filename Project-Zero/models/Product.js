const sequelize = require("../db/dbSQLConnect");
const { DataTypes, Model } = require("sequelize");

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
      type: DataTypes.STRING,
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
