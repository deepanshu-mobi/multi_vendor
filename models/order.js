'use strict';
const { Model } = require('sequelize');

  class Order extends Model {
    static associate(models) {
      // define association here
    }
  }

  Order.init({
    customerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    totalQuantity: DataTypes.INTEGER,
    orderStatus: DataTypes.ENUM
  }, {
    sequelize,
  });
module.exports = Order;