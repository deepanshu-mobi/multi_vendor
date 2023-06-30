"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/db')

class cartProducts extends Model {}
cartProducts.init(
  {
    cartProductId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "cart_products",
  }
);
module.exports = cartProducts;
