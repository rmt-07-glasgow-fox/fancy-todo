'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const dataTodos = [
      {
        title: 'Clean Bedroom',
        description: 'Clean bedroom with fabric and hot water',
        status: true,
        due_date: '2020-01-04'
      },
      {
        title: 'Do 1 Programming Challange',
        description: 'Do 7kyu level in CodeWars',
        status: true,
        due_date: '2020-01-04'
      },
      {
        title: 'Make Website with HTML CSS',
        description: 'Do with The Net Ninja youtube videos',
        status: false,
        due_date: '2020-01-04'
      }
    ];

    dataTodos.forEach(element => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });
    return queryInterface.bulkInsert('Todos', dataTodos, {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
