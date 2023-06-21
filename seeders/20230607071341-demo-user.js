'use strict';

const bcrypt = require('bcryptjs')
const constant = require('../utils/constant')

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = []
    for(let i = 0;i<300;i++){
      users.push({
        name: `User${i}`,
        email: `user${i}@gmail.com`,
        password: bcrypt.hashSync('User@1', 8),
        phoneNo: 8749892048,
        isEmailVerified : 1,
        role: Math.random() < 0.5 ? constant.userType.vendor : constant.userType.admin,
        createdAt : new Date(),
        updatedAt : new Date()
      })
    }
    await queryInterface.bulkInsert('users', users, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users')
  }
};

// return queryInterface.bulkInsert('users', [
//   {
  // name: 'super_admin',
  // email: 'super_admin@gmail.com',
  // password: bcrypt.hashSync('super_admin', 8),
  // phoneNo: 8749892048,
  // isEmailVerified : 1,
  // role: constant.userType.super_admin,
  // createdAt : new Date(),
  // updatedAt : new Date()
// },
// {
//   name: 'admin',
//   email: 'admin@gmail.com',
//   password: bcrypt.hashSync('admin', 8),
//   phoneNo: 8749892048,
//   isEmailVerified : 1,
//   role: constant.userType.admin,
//   createdAt : new Date(),
//   updatedAt : new Date()
// },
// {
//   name: 'vendor',
//   email: 'vendor@gmail.com',
//   password: bcrypt.hashSync('vendor', 8),
//   phoneNo: 8749892048,
//   isEmailVerified : 1,
//   role: constant.userType.vendor,
//   createdAt : new Date(),
//   updatedAt : new Date()
// }
// ])
