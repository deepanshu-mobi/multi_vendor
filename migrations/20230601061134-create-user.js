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
        type: Sequelize.STRING(50),
        allowNull: false
      },
      phoneNo: {
        type: Sequelize.INTEGER
      },
      isEmailVerified:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      role: {
        type: Sequelize.ENUM(constants.userType.admin, constants.userType.super_admin, constants.userType.vendor),
        defaultValue: constants.userType.vendor
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