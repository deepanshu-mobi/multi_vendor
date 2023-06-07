"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class productVendorMapping extends Model {}

productVendorMapping.init(
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
module.exports = productVendorMapping;
