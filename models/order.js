'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../config/db');
const constant = require('../utils/constant')

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
    orderStatus: {
      type: DataTypes.ENUM(constant.OrderStatus.PENDING, constant.OrderStatus.APPROVED, constant.OrderStatus.CANCELLED, constant.OrderStatus.FAILED),
      defaultValue: constant.OrderStatus.PENDING
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