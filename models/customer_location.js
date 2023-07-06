"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/db');

class customerLocation extends Model {}
customerLocation.init(
  {
    customerLocationId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    locationName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isPrimary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: "customer_locations",
  }
);
module.exports = customerLocation;
