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
      type: DataTypes.STRING(30)
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    isEmailVerified:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phoneNo: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    tableName: 'customers'
  });

  module.exports = Customer

