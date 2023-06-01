'use strict';
const { Model } = require('sequelize');

  class Customer extends Model {
    static associate(models) {
      // define association here
    }
  }

  Customer.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNo: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Customer',
  });

  module.exports = Customer

