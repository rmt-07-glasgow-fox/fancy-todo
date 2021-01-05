'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
      name: 'Romi Zaki Ferdiyanto',
      username: 'romizaki',
      email: 'rzferdiyanto@gmail.com',
      password: '$2a$10$Hczp/OTlgs/J8oZZ7sQe1e52ty9J0VBR2tij2dzSYzVJSrrKD7ds.',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        name: 'Jose Mourinho',
        username: 'josemou',
        email: 'greedymons@gmail.com',
        password: '$2a$10$Hczp/OTlgs/J8oZZ7sQe1e52ty9J0VBR2tij2dzSYzVJSrrKD7ds.',
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
