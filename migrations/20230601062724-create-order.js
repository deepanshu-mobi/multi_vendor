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
      totalQuantity: {
        type: Sequelize.INTEGER
      },
      orderStatus: {
        type: Sequelize.ENUM(constant.OrderStatus.PENDING, constant.OrderStatus.APPROVED, constant.OrderStatus.CANCELLED, constant.OrderStatus.FAILED),
        defaultValue: constant.OrderStatus.PENDING
      },
      shippingAddressCity: {
        type: Sequelize.STRING
      },
      shippingAddressCountry: {
        type: Sequelize.STRING
      },
      shippingAddressLine1: {
        type: Sequelize.STRING
      },
      shippingAddressLine2: {
        type: Sequelize.STRING
      },
      shippingAddressPostalCode: {
        type: Sequelize.STRING
      },
      shippingAddressState: {
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
    await queryInterface.dropTable('orders');
  }
};