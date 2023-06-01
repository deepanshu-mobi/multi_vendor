'use strict';
const { Model } = require('sequelize');

  class Admin extends Model {
    static associate(models) {
      // define association here
    }
  }

  Admin.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNo: DataTypes.INTEGER,
    role: DataTypes.ENUM
  }, {
    sequelize
  });

  module.exports = Admin

