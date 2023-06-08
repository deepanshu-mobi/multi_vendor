'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../config/db')

  class Customer extends Model {}

  Customer.init({
    customerId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isEmailVerified:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    token: {
      type: DataTypes.STRING
    },
    phoneNo: {
      type: DataTypes.BIGINT
    },
  }, {
    sequelize,
    tableName: 'customers'
  });

  module.exports = Customer

