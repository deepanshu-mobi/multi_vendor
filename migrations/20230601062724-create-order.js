'use strict';

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
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      totalQuantity: {
        type: Sequelize.INTEGER
      },
      orderStatus: {
        type: Sequelize.ENUM('PENDING', 'APPROVED', 'CANCELLED', 'FAILED'),
        defaultValue: 'PENDING'
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