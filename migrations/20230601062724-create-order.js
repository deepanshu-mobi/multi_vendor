'use strict';

const constant = require('../utils/constant');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      orderId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stripeSessionId: {
        type: Sequelize.STRING
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      orderStatus: {
        type: Sequelize.ENUM(constant.OrderStatus.PENDING, constant.OrderStatus.APPROVED, constant.OrderStatus.CANCELLED, constant.OrderStatus.FAILED),
        defaultValue: constant.OrderStatus.PENDING
      },
      customerLocationId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('orders');
  }
};