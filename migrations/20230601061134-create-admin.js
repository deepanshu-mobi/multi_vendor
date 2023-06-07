'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admins', {
      adminId: {
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
        type: Sequelize.ENUM('ADMIN', 'SUPER_ADMIN','VENDOR'),
        defaultValue: 'ADMIN'
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
    await queryInterface.dropTable('admins');
  }
};