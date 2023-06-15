'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../config/db')

  class Product extends Model {}

  Product.init({
    productId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'products'
  });

module.exports = Product;
