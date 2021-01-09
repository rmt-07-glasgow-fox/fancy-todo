'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ToDos', [
      {
        title: 'Get some milks',
        description: 'Get some UHT milks',
        status: false,
        due_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },
      {
        title: 'Buy cat food',
        description: 'Kitchen or RC',
        status: false,
        due_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },
      {
        title: 'Get Groceries',
        description: 'Leeks and some onions',
        status: false,
        due_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ToDos', null, {})
  }
};
