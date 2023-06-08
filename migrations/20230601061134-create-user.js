'use strict';

const constants = require('../utils/constant')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(30),
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNo: {
        type: Sequelize.BIGINT
      },
      isEmailVerified:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      role: {
        type: Sequelize.ENUM(constants.userType.admin, constants.userType.super_admin, constants.userType.vendor),
        defaultValue: constants.userType.vendor
      },
      token: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};