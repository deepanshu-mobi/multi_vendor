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
      type: DataTypes.STRING
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
    shippingAddressCity: {
      type: DataTypes.STRING
    },
    shippingAddressCountry: {
      type: DataTypes.STRING
    },
    shippingAddressLine1: {
      type: DataTypes.STRING
    },
    shippingAddressLine2: {
      type: DataTypes.STRING
    },
    shippingAddressPostalCode: {
      type: DataTypes.STRING
    },
    shippingAddressState: {
      type: DataTypes.STRING
    }
  }, 
  {
    sequelize,
    tableName: 'orders'
  });
module.exports = Order;