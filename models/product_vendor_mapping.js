"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class product_vendor_mapping extends Model {}

product_vendor_mapping.init(
  {
    productVendorId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "product_vendor_mappings",
  }
);
module.exports = product_vendor_mapping;
