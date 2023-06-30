'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../config/db')

  class Cart extends Model {}

Cart.init({
  cartId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalQuantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalCartItems: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
  }, {
    sequelize,
    tableName: 'carts'
});
module.exports = Cart;