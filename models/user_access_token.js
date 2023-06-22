"use strict";
const { Model, DataTypes} = require("sequelize");
const sequelize = require('../config/db')

class userAccessToken extends Model {}

userAccessToken.init(
  {
    userAccessTokenId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
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
    modelName: "user_access_tokens",
  }
);

module.exports = userAccessToken;
