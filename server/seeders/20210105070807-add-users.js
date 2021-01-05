'use strict';
const encryptPassword = require('../helpers/encryptAndDecrypt').encryptPassword
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'mity23@gmail.com',
        password: encryptPassword("bakmandi"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
