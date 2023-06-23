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
      type: DataTypes.ENUM(constants.UserType.ADMIN, constants.UserType.SUPER_ADMIN, constants.UserType.VENDOR),
      defaultValue: constants.UserType.VENDOR
    },
  },
  {
    sequelize,
    tableName: 'users'
  }
  );

  module.exports = User

