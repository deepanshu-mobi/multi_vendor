"use strict";

const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = [];
    for(let i = 0;i<100;i++){
      customers.push({
        name: `customer${i}`,
        email: `customer${i}@gmail.com`,
        password: bcrypt.hashSync(`Customer${i}`,8),
        isEmailVerified: Math.round(Math.random()),
        phoneNo: 9876487489,
        createdAt : new Date(),
        updatedAt : new Date(),
      })
    }
    await queryInterface.bulkInsert('customers', customers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customers', null, {});
  },
};
