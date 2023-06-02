'use strict';
const { Model, DataTypes} = require('sequelize');
const sequelize  = require('../config/db')

class Admin extends Model {}

  Admin.init(
  {
    adminId: {
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
      type: DataTypes.STRING(30),
      unique: true
    },
    phoneNo: {
      type: DataTypes.INTEGER
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'SUPER_ADMIN'),
      defaultValue: 'ADMIN'
    },
  },
  {
    sequelize,
    tableName: 'admin'
  }
  );

  module.exports = Admin

