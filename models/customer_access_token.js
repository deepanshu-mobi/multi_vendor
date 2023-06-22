"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/db')


class customerAccessToken extends Model {}
customerAccessToken.init(
  {
    customerAccessTokenId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deviceId: {
      type: DataTypes.INTEGER
    },
    deviceType: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize,
    modelName: "customer_access_tokens",
  }
);
module.exports = customerAccessToken;
