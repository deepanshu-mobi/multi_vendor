'use strict';
const { Model } = require('sequelize');

  class Vendor extends Model {
    static associate(models) {
      // define association here
    }
  }

  Vendor.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNo: DataTypes.INTEGER,
    verified: DataTypes.BOOLEAN
  }, {
    sequelize,
  });
module.exports = Vendor;