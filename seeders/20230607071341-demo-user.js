'use strict';

const bcrypt = require('bcryptjs')
const constant = require('../utils/constant')

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
      name: 'super_admin',
      email: 'super_admin@gmail.com',
      password: bcrypt.hashSync('super_admin', 8),
      phoneNo: 8749892048,
      isEmailVerified : 1,
      role: constant.userType.super_admin,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: 'admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('admin', 8),
      phoneNo: 8749892048,
      isEmailVerified : 1,
      role: constant.userType.admin,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: 'vendor',
      email: 'vendor@gmail.com',
      password: bcrypt.hashSync('vendor', 8),
      phoneNo: 8749892048,
      isEmailVerified : 1,
      role: constant.userType.vendor,
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users')
  }
};
