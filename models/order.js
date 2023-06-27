'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../config/db')

  class Order extends Model {}

  Order.init({
    orderId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stripeSessionId: {
      type: DataTypes.INTEGER
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalQuantity: {
      type: DataTypes.INTEGER
    },
    orderStatus: {
      type: DataTypes.ENUM('PENDING', 'APPROVED', 'CANCELLED', 'FAILED'),
      defaultValue: 'PENDING'
    },
  }, 
  {
    sequelize,
    tableName: 'orders'
  });
module.exports = Order;