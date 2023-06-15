"use strict";

const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/db')

class productImages extends Model {}

productImages.init(
  {
    productImageId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize,
    modelName: "product_images",
  }
);

module.exports = productImages;
