"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/db')

class orderProducts extends Model {}
orderProducts.init(
  {
    orderedProductsId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productName: {
      type: DataTypes.STRING
    },
    productPrice: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: "order_products",
  }
);
module.exports = orderProducts;
