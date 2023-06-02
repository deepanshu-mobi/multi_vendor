'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../config/db')

class Product_vendor_ids extends Model {}

Product_vendor_ids.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, 
  {
    sequelize,
    modelName: 'Product_vendor_ids',
  });
module.exports = Product_vendor_ids;