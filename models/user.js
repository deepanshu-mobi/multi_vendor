'use strict';
const { Model, DataTypes } = require('sequelize');
const constants = require('../utils/constant')
const sequelize  = require('../config/db')

class User extends Model {}

  User.init(
  {
    userId: {
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
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNo: {
      type: DataTypes.BIGINT
    },
    isEmailVerified: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    token: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM(constants.userType.admin, constants.userType.super_admin, constants.userType.vendor),
      defaultValue: constants.userType.vendor
    },
  },
  {
    sequelize,
    tableName: 'users'
  }
  );

  module.exports = User

