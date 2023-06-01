'use strict';
const { Model } = require('sequelize');
  class Cart extends Model {
    static associate(models) {
      // define association here
    }
  }

Cart.init({
    customerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    totalQuantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
});
module.exports = Cart;