'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      email: 'user01.mail@gmail.com',
      password: 'user01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'user02.mail@gmail.com',
      password: 'user02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'user03.mail@gmail.com',
      password: 'user03',
      createdAt: new Date(),
      updatedAt: new Date()
    },], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
