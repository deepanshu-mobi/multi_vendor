'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize  = require('../config/db')
  class Vendor extends Model {}

  Vendor.init({
    vendorId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phoneNo: {
      type: DataTypes.INTEGER
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, 
  {
    sequelize,
    tableName: 'vendor'
  }
  );
module.exports = Vendor;