'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
      name: 'Romi Zaki Ferdiyanto',
      username: 'romizaki',
      email: 'rzferdiyanto@gmail.com',
      password: '12345678',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        name: 'Jose Mourinho',
        username: 'josemou',
        email: 'greedymons@gmail.com',
        password: '12345678',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
        }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
