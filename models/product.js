'use strict';
const { Model } = require('sequelize');

  class Product extends Model {
    static associate(models) {
      // define association here
    }
  }

  Product.init({
    productName: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
  });
  
module.exports = Product;
